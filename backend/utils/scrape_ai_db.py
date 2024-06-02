from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pandas as pd
import time

driver = webdriver.Chrome()

url = 'https://incidentdatabase.ai/apps/incidents/'

driver.get(url)

all_data = pd.DataFrame()

n = table_element = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, '#content > div > div > div > div.overflow-x-auto > div.max-w-full > div > div > span > strong > span:nth-child(2)'))
        ).get_attribute("innerHTML")
print(n)
for i in range(int(n)):
    try:
        # Wait for the table to load
        table_element = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.TAG_NAME, 'table'))
        )

        table_html = table_element.get_attribute('outerHTML')

        df = pd.read_html(table_html)[0]

        all_data = pd.concat([all_data, df], ignore_index=True)

        next_button = driver.find_element(By.CSS_SELECTOR, "#content > div > div > div > div.overflow-x-auto > div.max-w-full > div > div > nav > ul > li:nth-child(6) > button")  

        driver.execute_script("arguments[0].scrollIntoView();", next_button)

        driver.execute_script("arguments[0].click();", next_button)

        time.sleep(2)

    except Exception as e:
        print(f"An error occurred: {e}")
        break


all_data = all_data.drop_duplicates()
all_data.to_csv('..\\tempfiles\\ai_incident_db.csv', index=False)
driver.quit()