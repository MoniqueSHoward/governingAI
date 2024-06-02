from db_model import user, privacy_gp, user_privacy_gp, vendor_score, chat_messages, chat_room, inuse_aisolution
from routes import guiding_principle as GuidingPrincipleRoute
from routes import vendor_intake as VendorIntakeRoute
from fastapi.middleware.cors import CORSMiddleware
from utils.add_privacy import addPrivacyPolicy
from routes import user as UserRoute
from routes import chat as ChatRoute
from db_connect import engine
from fastapi import FastAPI


user.Base.metadata.create_all(bind=engine)
privacy_gp.Base.metadata.create_all(bind=engine)
user_privacy_gp.Base.metadata.create_all(bind=engine)
vendor_score.Base.metadata.create_all(bind=engine)
chat_room.Base.metadata.create_all(bind=engine)
chat_messages.Base.metadata.create_all(bind=engine)
inuse_aisolution.Base.metadata.create_all(bind=engine)

addPrivacyPolicy()


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(UserRoute.router)
app.include_router(ChatRoute.router)
app.include_router(GuidingPrincipleRoute.router)
app.include_router(VendorIntakeRoute.router)