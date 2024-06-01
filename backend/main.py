from fastapi import FastAPI
from db_connect import engine
from utils.add_privacy import addPrivacyPolicy
from fastapi.middleware.cors import CORSMiddleware
from db_model import user, privacy_gp, user_privacy_gp, vendor_score

user.Base.metadata.create_all(bind=engine)
privacy_gp.Base.metadata.create_all(bind=engine)
user_privacy_gp.Base.metadata.create_all(bind=engine)
vendor_score.Base.metadata.create_all(bind=engine)


addPrivacyPolicy()


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

