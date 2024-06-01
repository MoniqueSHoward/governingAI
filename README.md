# governingAI

### Download requirement.txt
### Create .env file with OPENAI_API_KEY


### 7 Tables added
1. users
2. privacy
3. userprivacygp
4. vendor_score
5. chat_room (two for every user)
6. chat_messages
7. isUserTools 

### endpoints

1.  http://127.0.0.1:8000/auth/v1/getStarted -> post
2.  http://127.0.0.1:8000/auth/v1/me -> get
3.  http://127.0.0.1:8000/chat/v1/message -> get
4.  ws://127.0.0.1:8000/chat/v1/message?userid=1&isProfile=1
5.  http://127.0.0.1:8000/guiding-principle/v1/privacy -> get
6.  http://127.0.0.1:8000/guiding-principle/v1/my-privacy-principles?userid=1 -> get
7.  http://127.0.0.1:8000/guiding-principle/v1/my-privacy-principles -> post
8.  http://127.0.0.1:8000/guiding-principle/v1/my-privacy-principles -> patch



for more information look at http://127.0.0.1:8000/docs

### How to run Backend
uvicorn main:app
