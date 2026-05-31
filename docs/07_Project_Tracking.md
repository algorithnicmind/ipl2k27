# Project Tracking Document
## Cricket Intelligence AI Platform (CIAP)

### 1. Milestone Tracking

| Milestone | Description | Target Date | Status | Owner |
| :--- | :--- | :--- | :--- | :--- |
| M1 | Infrastructure Setup | TBD | Not Started | DevOps Lead |
| M2 | Historical Data Pipeline | TBD | Not Started | Data Engineering |
| M3 | V1 ML Prediction Model | TBD | Not Started | AI/ML Team |
| M4 | Web App Core UI | TBD | Not Started | Frontend Team |
| M5 | Live Ingestion & Sockets | TBD | Not Started | Backend Team |
| M6 | AI Chatbot Integration | TBD | Not Started | AI Engineering |
| M7 | Public Beta Launch | TBD | Not Started | Product Team |

### 2. Sprint Tracking
*(Template for Agile Sprints, typically 2-week cycles)*
- **Sprint 1 (Current):** System Architecture setup, Repo initialization, Database schemas.
- **Sprint 2:** API Gateway, User Auth, Basic UI layout.
- **Sprint 3:** ETL jobs, Data ingestion layer.
- **Sprint 4:** ML Model V1 Training and API wrapping.

### 3. Feature Tracking

| Feature | Phase | Priority | Dev Status | QA Status |
| :--- | :--- | :--- | :--- | :--- |
| Pre-Match Prediction | 2 | P0 | Backlog | N/A |
| Live Probabilities | 3 | P0 | Backlog | N/A |
| XAI Explanations | 6 | P0 | Backlog | N/A |
| Player Profiles | 4 | P1 | Backlog | N/A |
| Tournament Predictor | 5 | P1 | Backlog | N/A |
| AI Chat Interface | 7 | P0 | Backlog | N/A |

### 4. Risk Tracking

| Risk ID | Description | Impact | Probability | Mitigation Strategy |
| :--- | :--- | :--- | :--- | :--- |
| R-01 | LLM Hallucinations in Chat | High | Medium | Implement strict RAG guardrails and confidence thresholds. |
| R-02 | Live Data Latency > 2s | High | Low | Use Redis caching and WebSocket multiplexing. |
| R-03 | API Cost Overruns | Medium | High | Cache common LLM queries, use smaller models for simple intents. |

### 5. Bug Tracking
*(Linked to Jira / GitHub Issues)*
- *No active bugs (Project Initialization Phase).*

### 6. Technical Debt Tracking
- Monitor hardcoded team names/colors (must move to DB in Phase 2).
- Monitor script-based data ingestion (must move to Apache Airflow in Phase 3).

### 7. Deployment Tracking

| Version | Environment | Deploy Date | Release Notes | Status |
| :--- | :--- | :--- | :--- | :--- |
| v0.1.0 | Dev | TBD | Initial scaffolding | Pending |
