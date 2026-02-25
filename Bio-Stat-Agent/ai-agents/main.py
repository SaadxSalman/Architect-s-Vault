from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import uvicorn

# Import the agents we defined in previous steps
from agents import run_research_query
from hypothesis_agent import formulate_hypothesis
from modeling_agent import perform_analysis
from reporting_agent import generate_report

app = FastAPI(title="Bio-Stat-Agent Orchestrator")

class ResearchRequest(BaseModel):
    query: str

@app.post("/process-research")
async def process_research(request: ResearchRequest):
    try:
        # 1. Data Retrieval Stage
        print(f"🔍 Retrieving data for: {request.query}")
        data_summary = run_research_query(request.query)
        
        # 2. Hypothesis Formulation Stage
        print("🧠 Formulating hypotheses...")
        hypothesis = formulate_hypothesis(request.query)
        
        # 3. Modeling & Analysis Stage
        # In a real scenario, 'data_path' would be the CSV/Parquet 
        # file saved by the Data Agent.
        print("📈 Running statistical models...")
        analysis_results = perform_analysis(hypothesis, data_path="./temp_data.csv")
        
        # 4. Final Reporting Stage
        print("📄 Synthesizing final report...")
        final_report_md = generate_report(hypothesis, analysis_results, data_summary)
        
        return {
            "status": "success",
            "hypothesis": hypothesis,
            "analysis_results": analysis_results,
            "report": final_report_md
        }
        
    except Exception as e:
        raise HTTPException(status_status=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)