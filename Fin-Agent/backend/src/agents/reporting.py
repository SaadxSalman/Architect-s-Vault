def generate_final_report(ticker, sentiment, prediction, context):
    report = f"""
    # Financial Analysis Report: {ticker}
    **Date:** {datetime.now().strftime('%Y-%m-%d')}
    
    ## 1. Market Sentiment
    {sentiment}
    
    ## 2. Technical Prediction
    Based on our modeling agent, the projected price for the next period is: **${prediction}**
    
    ## 3. Contextual Insights (RAG)
    {context}
    
    ---
    *Disclaimer: This report is AI-generated and does not constitute financial advice.*
    """
    return report