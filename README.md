# governingAI

### 4 Tables added
1. users
2. privacy
3. userprivacygp
4. vendor_score
5. chat_room (two for every user)
6. chat_messages
7. isUserTools 



### endpoints

1.  http://127.0.0.1:8000/auth/v1/getStarted
2.  http://127.0.0.1:8000/auth/v1/me
3.  http://127.0.0.1:8000/chat/v1/message
4.  ws://127.0.0.1:8000/chat/v1/message?userid=1&isProfile=1


for more information look at http://127.0.0.1:8000/docs

### How to run Backend
uvicorn main:app
