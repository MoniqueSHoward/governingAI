from fastapi import APIRouter, status, Depends, HTTPException, Request
from utils.scrape_users_website import get_relevent_link
from db_model.inuse_aisolution import InuseAISolution
from db_model.user import User as UserDBModel
from db_model.chat_room import ChatRoom
from sqlalchemy.orm import Session
from pydantic import BaseModel
from db_connect import get_db
from .chat import ASSISTANT



class UserModel(BaseModel):
    username: str
    website:str

class UserModelLogin(BaseModel):
    username: str|None
    website:str|None
    userid:str|None




router = APIRouter(
    prefix = '/auth/v1',
    tags=['Authentication']
)


@router.get('/me')
def getUser(userData:UserModelLogin , db: Session = Depends(get_db)):
    if userData.userid:
        user = db.query(UserDBModel)\
            .filter(UserDBModel.userid == userData.userid).first()
    else:
        user = db.query(UserDBModel)\
            .filter(UserDBModel.username == userData.username)\
            .filter(UserDBModel.website == userData.website).first()
    if not user:
        return HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="not found"
        )
    
    return dict(
        userinfo = user,
        inuse_ai = db.query(InuseAISolution).filter(InuseAISolution.userid == user.userid).all()
    )



@router.post("/getStarted", status_code=status.HTTP_201_CREATED)
async def getStarted(userData:UserModel, db: Session = Depends(get_db)):
    user = db.query(UserDBModel)\
        .filter(UserDBModel.website == userData.website).filter(UserDBModel.username == userData.username).first()
    if user:
        return user
    
    if not (links:= get_relevent_link(userData.website, ["about","contact"])):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f"Unable to access your website {userData.website}.")
    
    print(links)
    # Create User
    newUser = UserDBModel(**userData.dict())
    db.add(newUser)
    db.commit()
    db.refresh(newUser)

    # Create thread for user profile agent.
    thread_id_profile = ASSISTANT.createThread(True, newUser.username, newUser.website, links, newUser.userid)
    thread_id_QA = ASSISTANT.createThread(False, website=newUser.website, username=newUser.username)

    # Create profile creation room 
    newroom = ChatRoom(roomId = thread_id_profile, userid = newUser.userid, profile_or_qa = True)
    db.add(newroom)
    db.commit()
    newroom = ChatRoom(roomId = thread_id_QA, userid = newUser.userid, profile_or_qa = False)
    db.add(newroom)
    db.commit()

    return {
        "userid": newUser.userid,
        "username": newUser.username,
        "website": newUser.website,
    }


@router.patch("/updateUser", status_code=status.HTTP_200_OK)
async def updateMyPrivacyPolicy(request:Request, db: Session = Depends(get_db)):
    body = await request.json()
    userid = int(body['userid'])
    user = db.query(UserDBModel).filter(UserDBModel.userid == userid).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No user there.")
    body.pop("userid")
    db.query(UserDBModel).filter(UserDBModel.userid == userid).update(body)
    db.commit()
    return db.query(UserDBModel).filter(UserDBModel.userid == userid).first()




