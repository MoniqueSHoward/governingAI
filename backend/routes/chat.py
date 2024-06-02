from fastapi import APIRouter, Depends, WebSocket, WebSocketDisconnect, WebSocketException,status, HTTPException
from utils.scrape_users_website import FUNCTION_SCRAPE_COMPANY_INFO, scrape_company_info
from utils.complete_user_profile import FUNCTION_COMPLETEPROFILE, completeProfile
from constants import PROFILE_ASSISTANT_INSTRUCTION, QA_AGENT_INSTRUCTION
from services.assistant_chat_service import Assistant
from db_model.chat_messages import ChatMessage
from utils.create_message import createMessage
from db_model.chat_room import ChatRoom
from sqlalchemy.orm import Session
from pydantic import BaseModel
from db_connect import get_db

router = APIRouter(
    prefix = '/chat/v1',
    tags=['chat']
)

tools = {
    "scrape_company_info": scrape_company_info,
    'completeProfile': completeProfile
}

function_definition = [
    FUNCTION_SCRAPE_COMPANY_INFO,
    FUNCTION_COMPLETEPROFILE
]

ASSISTANT = Assistant(PROFILE_ASSISTANT_INSTRUCTION, QA_AGENT_INSTRUCTION, function_definition, tools)


class MessageAPIInput(BaseModel):
    userid: str
    isProfile: str

@router.get('/message', status_code= status.HTTP_200_OK)
async def getMessage(message:MessageAPIInput, db:Session = Depends(get_db)):

    room = db.query(ChatRoom).filter(ChatRoom.userid == int(message.userid)).filter(ChatRoom.profile_or_qa == bool(int(message.isProfile))).first()
    if not room:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="No room found"
        )
    return [dict(
        messageId = message_entity.messageId,
        message = message_entity.message,
        isuser = message_entity.isuser
    ) for message_entity in db.query(ChatMessage).filter(ChatMessage.roomId == room.roomId).all()]




# isProfile is 1 for profile_bot and 0 for qa_bot
@router.websocket("/message")
async def websocket_endpoint(userid: int, isProfile: int, websocket: WebSocket, db:Session = Depends(get_db)):
    try:
        await websocket.accept()
        room = db.query(ChatRoom).filter(ChatRoom.userid == userid).filter(ChatRoom.profile_or_qa == isProfile).first()
        if not room:
            raise WebSocketException(code = 0 , reason="no room for chat")
            # websocket.close(reason="no room for chat")
        roomId = room.roomId
        ASSISTANT.loadThread(roomId=roomId, userid=userid)
        try:
            while True:
                usermessage = await websocket.receive_text()
                system_response = ASSISTANT.runAssistant(userid, usermessage, bool(isProfile))
                await websocket.send_text(system_response)
                messages = [
                    {
                        "userid":userid,
                        "roomId": roomId,
                        "message":usermessage, 
                        "isuser":True
                    },
                    {
                        "userid":userid,
                        "roomId": roomId,
                        "message":system_response, 
                        "isuser":False
                    }
                ]
                createMessage(chat_message = messages)
        except WebSocketDisconnect:
            ASSISTANT.removeThread(userid)
    except Exception as e:
        print(e)




