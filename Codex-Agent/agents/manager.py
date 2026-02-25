from langchain.prompts import ChatPromptTemplate

class ProjectManager:
    def __init__(self):
        self.system_instructions = """
        You are the Project Manager for Codex-Agent. Your goal is to coordinate a team of AI developers.
        
        INPUTS YOU RECEIVE:
        1. User Prompt: (e.g., "Build a dashboard")
        2. Vision Metadata: (e.g., {"layout": "flex-col", "components": ["navbar"]})
        
        YOUR RESPONSIBILITIES:
        - Decompose the request into a list of specific files to be created.
        - Ensure the tech stack is strictly: Next.js (Frontend), Tailwind CSS, and Rust/Node.js (Backend).
        - Format your output as a JSON instruction set for the Code Engineer.
        
        OUTPUT FORMAT:
        {
            "project_name": "string",
            "file_manifest": [
                {"path": "apps/web/src/components/Name.tsx", "description": "logic here"},
                {"path": "core/src/module.rs", "description": "logic here"}
            ],
            "priority": "high"
        }
        """

    def plan_project(self, state):
        prompt = ChatPromptTemplate.from_messages([
            ("system", self.system_instructions),
            ("human", "User Request: {task}\nVision Analysis: {ui_context}")
        ])
        
        # Logic to call LLM (Gemma or GPT-4)
        # response = model.invoke(prompt.format_messages(
        #    task=state['task'], 
        #    ui_context=state.get('ui_context', 'No image provided')
        # ))
        
        print("--- MANAGER: STRATEGIC PLAN CREATED ---")
        return {"plan": "manifest_json_here", "status": "planned"}