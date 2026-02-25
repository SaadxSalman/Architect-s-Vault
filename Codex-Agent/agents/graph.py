from langgraph.graph import StateGraph, END
from typing import TypedDict, List
from .qa import QAEngineer

qa = QAEngineer()

def qa_node(state):
    return qa.verify_code(state)

# Conditional logic: Should we continue or go back?
def should_continue(state):
    if state["status"] == "verified":
        return END
    return "engineer" # Loop back to fix errors

class AgentState(TypedDict):
    task: str
    code_snippets: List[str]
    status: str

def project_manager(state: AgentState):
    print("--- PLANNING PHASE ---")
    return {"status": "planned"}

# Define the Graph
workflow = StateGraph(AgentState)
workflow.add_node("manager", project_manager)
workflow.set_entry_point("manager")
workflow.add_edge("manager", END)

# Define the Conditional Edge
workflow.add_conditional_edges(
    "qa",
    should_continue
)

app = workflow.compile()