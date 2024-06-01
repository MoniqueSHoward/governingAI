from db_connect import get_db
from sqlalchemy.orm import Session
from db_model.chat_messages import ChatMessage



def createMessage(chat_message, db: Session = next(get_db())):
    for message in chat_message:
        db.add(ChatMessage(**message))
        db.commit()
