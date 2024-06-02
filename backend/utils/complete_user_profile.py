from db_model.inuse_aisolution import InuseAISolution
from db_model.user import User as UserDBModel
from sqlalchemy.orm import Session
from db_connect import get_db



FUNCTION_COMPLETEPROFILE = {
    "type": "function",
    "function": {
        "name": "completeProfile",
        "description": "to complete the changes made in profile.",
        "parameters": {
            "type": "object",
            "properties": {
                "userid": {
                    "type": "integer",
                    "description": "Unique id of user.",
                },
                "company": {
                    "type": "string",
                    "description": "name of the user's company",
                },
                "summaryOfCompany": {
                    "type": "string",
                    "description": "what their company do",
                },
                "address": {
                    "type": "string",
                    "description": "address of company",
                },
                "city": {
                    "type": "string",
                    "description": "city where company located",
                },
                "zipcode": {
                    "type": "string",
                    "description": "zipcode where company located",
                },
                "phone": {
                    "type": "string",
                    "description": "phone of company",
                },
                "industry": {
                    "type": "string",
                    "description": "company belongs to which industry like healthcare, insurance, ",
                },
                "ai_policy": {
                    "type": "string",
                    "description": "Do their company has any ai policy? True/False",
                },
                "ai_parameters": {
                    "type": "string",
                    "description": "what are their ai parameters? strick, strickest, easy ... ",
                },
                "using_ai": {
                    "type": "array",
                    "description": "list of currently in use ai solution with purpose of use.",
                    "items": {
                        "type": "string",
                        "description": "tool name and purpose.",
                    }
                }
            },
            "required": ["userid","company","summaryOfCompany", "address", "city", "zipcode", "phone","industry" ,"ai_policy", "ai_parameters", "using_ai" ]
        }
    }
}

def completeProfile(userid = "",company = "",summaryOfCompany = "", address = "", city = "", zipcode = "", phone = "" ,industry  = "", ai_policy = "", ai_parameters = "", using_ai = []):
    data = {}
    if company:
        data['company'] = company
    if summaryOfCompany:
        data['summaryOfCompany'] = summaryOfCompany
    if address:
        data['address'] = address
    if city:
        data['city'] = city
    if zipcode:
        data['zipcode'] = zipcode
    if phone:
        data["phone"] = phone
    if industry:
        data["industry"] = industry
    if ai_policy:
        data["ai_policy"] = ai_policy
    if ai_parameters:
        data["ai_parameters"] = ai_parameters
    
    try:
        db: Session = next(get_db())
        if data:
            db.query(UserDBModel).filter(UserDBModel.userid == userid).update(data)
            db.commit()
        if using_ai:
            for name_purpose in using_ai:
                db.add(InuseAISolution(userid = userid, name_purpose = name_purpose))
                db.commit()
        return "User's information is updated now check and update on Profile tab."
    except Exception as e:
        print(e)
        return "Unable to update user's information"