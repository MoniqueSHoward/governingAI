from fastapi import APIRouter, status, Depends, HTTPException
from utils.scrape_users_website import scrape_company_info
from utils.search_incidents import searchForIncidents
from db_model.user_privacy_gp import UserPrivacyGP
from constants import SCORE_PROMPT, privacy_policy
from db_model.vendor_score import UserVendorScore
from sqlalchemy.orm import Session
from pydantic import BaseModel
from db_connect import get_db
import random
import openai
import json



router = APIRouter(
    prefix = '/vendor-intake/v1',
    tags=['Intake']
)



class Vendor(BaseModel):
    userid: str
    vendor_name: str
    website: str


@router.get('/vendor')
async def getVendorScore(userid: int, db: Session = Depends(get_db)):
    all_data = []
    privacy = transparency = fairness = 0
    for data in db.query(UserVendorScore).filter(UserVendorScore.userid == userid).all():
        obj_dict = {column.name: getattr(data, column.name) for column in UserVendorScore.__table__.columns}
        privacy += obj_dict["privacy_score"]
        fairness += obj_dict["fairness_score"]
        transparency += obj_dict["transparency_score"]
        all_data.append(data)
    n = len(all_data)
    return {
        "Privacy": privacy/n,
        "Transparency": transparency/n,
        "Fairness": fairness/n,
        "data": all_data
    }

@router.post('/vendor')
async def createVendorScore(vendorData: Vendor, db: Session = Depends(get_db)):
    user_guide_line = db.query(UserPrivacyGP).filter(UserPrivacyGP.userid == int(vendorData.userid)).first()

    if not user_guide_line:
        raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE, detail="Your have not created your policy yet.")


    # scrape web site
    website_data = scrape_company_info(vendorData.website)
    if website_data == "Error while scraping":
        raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE, detail=f"Your provided webside {vendorData.website} is not accessible.")
    
    # user guiding policy
    obj_dict = {column.name: getattr(user_guide_line, column.name) for column in UserPrivacyGP.__table__.columns}
    user_preference = []
    for i in range(len(obj_dict)-1):
        if obj_dict[f"point{i+1}"]:
            policy = privacy_policy[i].copy()
            policy.update({"userpreference": "Must have"})
            user_preference.append(policy)
    
    # marked incidents
    marked_incident = searchForIncidents(vendorData.vendor_name)

    # Call to gpt-4o
    prompt = SCORE_PROMPT.replace('{vendor}',vendorData.vendor_name).replace("{user_preference}",  str(user_preference)).replace("{website_data}", website_data).replace("{marked_incident}", str(marked_incident))
    response = openai.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "You are a policy analysis assistant."},
            {"role": "user", "content": prompt}
        ],
        temperature=0,
        max_tokens=500,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
    )
    message:str = response.dict()['choices'][0]["message"]["content"]
    data = json.loads(message[message.find("{"):message.rfind("}")+1])

    data["transparency_score"] = float(random.randint(70, 100))
    data["transparency_summary"] = "transparency_summary is not a part of MVP, we will later include it."
    data["fairness_score"] = float(random.randint(70, 100))
    data["fairness_summary"] = "fairness_summary is not a part of MVP, we will later include it."

    if db.query(UserVendorScore).filter(UserVendorScore.userid == int(vendorData.userid))\
        .filter(UserVendorScore.vendor_name == vendorData.vendor_name)\
        .filter(UserVendorScore.website == vendorData.website).first():
        db.query(UserVendorScore).filter(UserVendorScore.userid == int(vendorData.userid))\
        .filter(UserVendorScore.vendor_name == vendorData.vendor_name)\
        .filter(UserVendorScore.website == vendorData.website).update(data)
        db.commit()
    else:
        data['userid'] = int(vendorData.userid)
        data['vendor_name'] = vendorData.vendor_name
        data['website'] = vendorData.website
        score = UserVendorScore(**data)
        db.add(score)
        db.commit()
    return db.query(UserVendorScore).filter(UserVendorScore.userid == int(vendorData.userid))\
        .filter(UserVendorScore.vendor_name == vendorData.vendor_name)\
        .filter(UserVendorScore.website == vendorData.website).first()






    
    