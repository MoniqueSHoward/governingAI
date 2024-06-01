from fastapi import APIRouter, status, Depends, HTTPException, Request
from db_model.user_privacy_gp import UserPrivacyGP
from db_model.privacy_gp import Privacy
from sqlalchemy.orm import Session
from pydantic import BaseModel
from db_connect import get_db


router = APIRouter(
    prefix = '/guiding-principle/v1',
    tags=['Guiding principle']
)

@router.get("/privacy", status_code=status.HTTP_200_OK)
async def getPrivacyPolicy(request: Request, db: Session = Depends(get_db)):
    return db.query(Privacy).all()

@router.get("/my-privacy-principles", status_code=status.HTTP_200_OK)
async def getMyPrivacyPolicy(userid:int, db: Session = Depends(get_db)):
    myPolicy = db.query(UserPrivacyGP).filter(UserPrivacyGP.userid == userid).first()
    if not myPolicy:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="You do not created any policy yet")
    return myPolicy


class MyPolicy(BaseModel):
    userid: str
    point1:bool
    point2:bool
    point3:bool
    point4:bool
    point5:bool
    point6:bool


@router.post("/my-privacy-principles", status_code=status.HTTP_200_OK)
async def createMyPrivacyPolicy(policy:MyPolicy, db: Session = Depends(get_db)):
    myPolicy = db.query(UserPrivacyGP).filter(UserPrivacyGP.userid == int(policy.userid)).first()
    if myPolicy:
        raise HTTPException(status_code=status.HTTP_302_FOUND, detail="Already found.")
    myPolicy = UserPrivacyGP(**policy.dict())
    db.add(myPolicy)
    db.commit()
    db.refresh(myPolicy)
    return myPolicy


@router.patch("/my-privacy-principles", status_code=status.HTTP_200_OK)
async def updateMyPrivacyPolicy(request:Request, db: Session = Depends(get_db)):
    body = await request.json()
    userid = int(body['userid'])
    myPolicy = db.query(UserPrivacyGP).filter(UserPrivacyGP.userid == userid).first()
    if not myPolicy:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="You do not created any policy yet.")
    body.pop("userid")
    db.query(UserPrivacyGP).filter(UserPrivacyGP.userid == userid).update(body)
    db.commit()
    return db.query(UserPrivacyGP).filter(UserPrivacyGP.userid == userid).first()

