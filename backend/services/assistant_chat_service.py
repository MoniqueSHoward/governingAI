import os
import json
import openai
from pprint import pprint
from openai import OpenAI
from constants import OPENAI_API_KEY

openai.api_key = OPENAI_API_KEY
os.environ['OPENAI_API_KEY'] = OPENAI_API_KEY

class Assistant:
    
    def __init__(self, instruction_profile_assistant, instruction_QA_assistant, function_definitions, tools):
        self.client = OpenAI()
        self.tools = tools
        # self.assistant = self.client.beta.assistants.retrieve(ASSISTANT_ID)
        # self.assistant.instructions = instruction
        self.profile_assistant = self.client.beta.assistants.create(
            name="GAIA Profile Agent",
            instructions= instruction_profile_assistant,
            model="gpt-4o",
            tools=function_definitions
        )

        self.QA_assistant = self.client.beta.assistants.create(
            name="GAIA QA Agent",
            instructions= instruction_QA_assistant,
            model="gpt-4o",
            tools=function_definitions
        )
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
    
    def checkstatus(self, run, userid):
        while run.status != 'completed':       
            run = self.client.beta.threads.runs.retrieve(
              thread_id=self.threads[userid].id,
              run_id=run.id
            )
            print(run.status)
            if run.status == 'failed':
                return False
            if run.status == 'requires_action':
                # tool_call = run.required_action.submit_tool_outputs.tool_calls[0]
                run = self.client.beta.threads.runs.submit_tool_outputs(
                    thread_id=self.threads[userid].id,
                    run_id=run.id,
                    tool_outputs=self.performAction(run),
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
        if not self.checkstatus(run, userid):
            return "Sorry some problem occur at server side."
        messages = self.client.beta.threads.messages.list(
            thread_id=self.threads[userid].id
        )
        return messages.data[0].content[0].text.value

