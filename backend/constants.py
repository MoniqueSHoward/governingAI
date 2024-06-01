from dotenv import load_dotenv
import os

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

privacy_policy = [
    {
        "title":"Consent",
        "description":"Our data should not be used without our knowledge and permission."
    },
    {
        "title":"Control over the Use of Data",
        "description":"We want to have some degree of influence over how and why our information is used."
    },
    {
        "title":"Ability to Restrict Processing",
        "description":"We want the ability to restricted our data from use in connection with certain AI practices or models."
    },
    {
        "title":"Right to Rectification",
        "description":"We want the option of amending or modifying our data when necessary."
    },
    {
        "title":"Right to Erasure",
        "description":"Our date should be removed within a reasonable amount of time after a request is made."
    },
    {
        "title":"Data Protection Laws",
        "description":"The vendor following and maintains policies and procedures that adhere data protection laws and regulations for my industry."
    },
]