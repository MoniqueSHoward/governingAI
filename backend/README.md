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
2.  http://127.0.0.1:8000/auth/v1/updateUser -> patch
3.  http://127.0.0.1:8000/auth/v1/me -> get
4.  http://127.0.0.1:8000/chat/v1/message -> get
5.  ws://127.0.0.1:8000/chat/v1/message?userid=1&isProfile=1 -> websocket   (isProfile=1 means profile_agent and isProfile=0 means QA_agent)
6.  http://127.0.0.1:8000/guiding-principle/v1/privacy -> get
7.  http://127.0.0.1:8000/guiding-principle/v1/my-privacy-principles?userid=1 -> get
8.  http://127.0.0.1:8000/guiding-principle/v1/my-privacy-principles -> post
9.  http://127.0.0.1:8000/guiding-principle/v1/my-privacy-principles -> patch
10. http://127.0.0.1:8000/vendor-intake/v1/vendor -> post
11. http://127.0.0.1:8000/vendor-intake/v1/vendor -> get

### database scraped for ai incidents

for more information look at http://127.0.0.1:8000/docs

### How to run Backend
uvicorn main:app
