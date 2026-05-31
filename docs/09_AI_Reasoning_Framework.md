# AI Reasoning Framework
## Cricket Intelligence AI Platform (CIAP)

### 1. LLM Architecture
The conversational AI is built on a Retrieval-Augmented Generation (RAG) architecture. It uses a primary large language model (e.g., GPT-4o) coordinated via LangChain, interfacing with a vector database for context retrieval and internal APIs for live data.

### 2. Intent Detection
Before hitting the heavy LLM, a fast classifier determines the user's intent:
- *Factual/Live:* "What is the score?" -> Routes to REST API, bypasses LLM.
- *Predictive:* "Who will win?" -> Routes to ML Service + XAI Engine.
- *Analytical:* "Compare MI and CSK" -> Routes to RAG Engine.

### 3. Query Understanding & Context Retrieval
- User query is embedded using `text-embedding-3-small`.
- Vector DB (Pinecone) retrieves relevant text chunks (e.g., historical reports, player biographies).
- System dynamically injects JSON data (live score, ML prediction, SHAP values) into the context window.

### 4. Prediction Integration & Reasoning Engine
The core reasoning prompt integrates the ML output:
```text
System: You are CIAP, an expert AI cricket analyst. 
Context provided: 
- Live Score: {live_score}
- ML Prediction: {ml_prediction}
- Top Factors: {xai_factors}
- User Query: {query}
Task: Answer the user logically. Do not contradict the ML Prediction. Use the Top Factors to explain the reasoning.
```

### 5. Response Generation
The LLM generates a human-readable response. It is instructed to be concise, analytical, and objective. Formatting utilizes markdown for readability (bullet points, bold text).

### 6. Explainable AI Layer Integration
The AI Reasoning Framework is strictly bound to the ML XAI outputs. If the ML predicts RCB will lose because of "High Required Run Rate", the LLM is forbidden from hallucinating alternative reasons like "poor pitch conditions" unless supported by data.

### 7. Confidence Scoring
The system calculates a combined confidence score:
`ML Probability Calibration * Context Relevance Score`
If confidence is below 50%, the AI prepends a disclaimer: *"Based on current volatile data, it's a tight contest, but..."*

### 8. Hallucination Prevention & Safety Controls
- **Grounding:** LLM temperature set to 0.1 for analytical queries.
- **Guardrails:** Output is parsed to ensure it does not invent statistics. If a stat isn't in the provided context, the LLM must state: "I don't have that exact statistic right now."
- **Toxicity Filter:** Prevents generating abusive content toward players, umpires, or teams.
