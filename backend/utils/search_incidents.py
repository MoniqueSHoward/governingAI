import pandas as pd

def searchForIncidents(vendorName):
    df = pd.read_csv("tempfiles\\ai_incident_db.csv")
    event_list = []
    events = df[df['Alleged Developer of AI System'].str.contains(vendorName, case=False, na=False)][["Title", "Description", "Alleged Harmed or Nearly Harmed Parties"]].set_index("Title").to_dict()
    for key in events["Description"]:
        event_list.append([key, events["Description"][key], events['Alleged Harmed or Nearly Harmed Parties'][key]])
    return event_list