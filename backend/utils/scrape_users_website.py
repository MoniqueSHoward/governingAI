from bs4 import BeautifulSoup
import requests


def get_relevent_link(url, relevent_pages):
    try:
        response = requests.get(url)
        response.raise_for_status()
        soup = BeautifulSoup(response.content, 'html.parser')
        links = soup.find_all('a')
        relevent_links = set()
        for link in links:
            href = link.get('href')
            if not href: continue
            if href.endswith("/"):
                href = href[:-1]
            link_last = href.split('/')[-1]
            if link_last and any([key in link_last.lower() for key in relevent_pages]):
                if href.startswith('/'):
                    href = url + href
                relevent_links.add(href)
        return list(relevent_links)
    except requests.RequestException as e:
        return False


FUNCTION_SCRAPE_COMPANY_INFO = {
    "type": "function",
    "function": {
        "name": "scrape_company_info",
        "description": "Get html content of provided link",
        "parameters": {
            "type": "object",
            "properties": {
                "url": {
                    "type": "string",
                    "description": "working url of user's website.",
                },
            },
            "required": ["url"]
        }
    }
}

def scrape_company_info(url:str = ""):
    try:
        response = requests.get(url)
        response.raise_for_status()
        soup = BeautifulSoup(response.content, 'html.parser')
        for irrelevent_tags in ["script", 'style', 'link','img', "iframe", "input", ]:
            for tag in soup.find_all(irrelevent_tags):
                tag.decompose()
        for attribute in ['class', 'style', 'onclick', "href", 'target', 'rel']:
            for tag in soup.find_all(attrs={attribute: True}):
                del tag[attribute]
        return str(soup.find("body")).strip()
    except requests.RequestException as e:
        return "Error while scraping"
        




if __name__ == "__main__":
    website_url = 'https://www.jubileelife.com/'
    links = get_relevent_link(website_url)
    print(links)
    # scrape_company_info(links)
