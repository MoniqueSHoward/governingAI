from constants import OPENAI_API_KEY, QA_ASSISTANT_ID, PROFILE_ASSISTANT_ID
from openai import OpenAI
import openai
import json
import os

openai.api_key = OPENAI_API_KEY
os.environ['OPENAI_API_KEY'] = OPENAI_API_KEY

class Assistant:
    
    def __init__(self, instruction_profile_assistant, instruction_QA_assistant, function_definitions, tools):
        self.client = OpenAI()
        self.tools = tools

        self.profile_assistant = self.client.beta.assistants.retrieve(PROFILE_ASSISTANT_ID) if PROFILE_ASSISTANT_ID else self.client.beta.assistants.create(
            name="GAIA Profile Agent",
            instructions= instruction_profile_assistant,
            model="gpt-4o",
            tools=function_definitions
        )
        if QA_ASSISTANT_ID:
            self.QA_assistant = self.client.beta.assistants.retrieve(QA_ASSISTANT_ID)
        else:
            vector_store = self.client.beta.vector_stores.create(name="Guiding Principles Guide")
            file_paths = ["AI_RMF_Playbook.pdf", "HLS_White_Paper_Final_v3.pdf"]
            file_streams = [open("tempfiles\\"+path, "rb") for path in file_paths]
            file_batch = self.client.beta.vector_stores.file_batches.upload_and_poll(
                vector_store_id=vector_store.id, files=file_streams
            )
            assistant = self.client.beta.assistants.create(
                name="GAIA QA Agent",
                instructions= instruction_QA_assistant,
                model="gpt-4o",
                tools=[{"type": "file_search"}, function_definitions[0]]
            )
            self.QA_assistant = self.client.beta.assistants.update(
                assistant_id=assistant.id,
                tool_resources={"file_search": {"vector_store_ids": [vector_store.id]}},
            )
        print("self.profile_assistant.id", self.profile_assistant.id)
        print("self.QA_assistant.id", self.QA_assistant.id)
        self.threads = {}
    
    def createThread(self, isProfile, username = '', website = '' , releventlink = [], userId = 0):
        thread = self.client.beta.threads.create()
        if isProfile:
            self.client.beta.threads.messages.create(
                thread_id=thread.id, 
                **{
                    "role": "user",
                    "content": f"Do remember my `username` is {username} , userid is {userId} , `website's link` is {website} and other relevent links for about-us and contact-us are {str(releventlink)[1:-1]}.",
                },
        )
        else:
            self.client.beta.threads.messages.create(
                thread_id=thread.id, 
                **{
                    "role": "user",
                    "content": f"Do remember my `username` is {username} and `website's link` is {website}.",
                },
        )
        return thread.id
    
    def loadThread(self, roomId, userid):
        self.threads[userid] = self.client.beta.threads.retrieve(roomId)
    
    def removeThread(self, userid):
        self.threads.pop(userid)
    
    def createMessage(self, userid, prompt = ""):
        return self.client.beta.threads.messages.create(
            thread_id=self.threads[userid].id,
            role="user",
            content=prompt
        )
    
    def runn(self, userid, isProfile = True):
        run = self.client.beta.threads.runs.create(
          thread_id=self.threads[userid].id,
          assistant_id=self.profile_assistant.id if isProfile else self.QA_assistant.id,
        )
        return run
    
    def checkstatus(self, run, userid, isProfile):
        while run.status != 'completed':       
            run = self.client.beta.threads.runs.retrieve(
              thread_id=self.threads[userid].id,
              run_id=run.id
            )
            print(run.status)
            if run.status == 'failed':
                return False
            if isProfile and run.status == 'requires_action':
                run = self.client.beta.threads.runs.submit_tool_outputs(
                    thread_id=self.threads[userid].id,
                    run_id=run.id,
                    tool_outputs=self.performAction(run),
                )
            if (not isProfile) and run.status == 'requires_action':
                tool_call = run.required_action.submit_tool_outputs.tool_calls[0]
                functionName = tool_call.function.name
                arguments = json.loads(tool_call.function.arguments)
                if functionName != "scrape_company_info":
                    return False
                run = self.client.beta.threads.runs.submit_tool_outputs(
                    thread_id=self.threads[userid].id,
                    run_id=run.id,
                    tool_outputs=[{ "tool_call_id": tool_call.id, "output": self.tools[functionName](**arguments)}],
                )
        return True
    
    def performAction(self, run):
            tool_output = []
            for tool_call in run.required_action.submit_tool_outputs.tool_calls:
                functionName = tool_call.function.name
                print(functionName)
                arguments = json.loads(tool_call.function.arguments)
                print(arguments)      
                output = self.tools[functionName](**arguments)
                tool_output.append({ "tool_call_id": tool_call.id, "output": output})
            return tool_output
    
            
    def runAssistant(self, userid, prompt, isProfile = True):
        self.createMessage(userid, prompt)
        run = self.runn(userid, isProfile)
        if not self.checkstatus(run, userid, isProfile):
            return "Sorry some problem occur at server side."
        messages = self.client.beta.threads.messages.list(
            thread_id=self.threads[userid].id
        )
        return messages.data[0].content[0].text.value

