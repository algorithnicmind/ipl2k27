# Application Flow & User Journeys
## Cricket Intelligence AI Platform (CIAP)

### 1. Complete User Journey
The user journey in CIAP is designed to be frictionless, moving seamlessly between visual dashboards and conversational AI.
1. **Onboarding:** User lands on the homepage, views live matches and top-level predictions.
2. **Exploration:** User navigates to a specific Match Center.
3. **Deep Dive:** User reviews XAI reasons, team strengths, and player matchups.
4. **Interaction:** User opens the AI Assistant sidebar to ask contextual questions.
5. **Conversion:** User registers/logs in to save favorite teams or access premium fantasy insights.

### 2. Authentication Flow
```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant AuthProvider
    participant Backend
    participant DB

    User->>Frontend: Clicks "Login"
    Frontend->>AuthProvider: Redirect to OAuth
    AuthProvider-->>User: Prompts for Credentials
    User->>AuthProvider: Enters Credentials
    AuthProvider-->>Frontend: Returns Auth Code / JWT
    Frontend->>Backend: Validate Token
    Backend->>DB: Fetch/Create User Profile
    DB-->>Backend: User Data
    Backend-->>Frontend: Session Created
    Frontend-->>User: Displays Authenticated Dashboard
```

### 3. Prediction Flow & Live Match Flow
```mermaid
flowchart TD
    classDef sys fill:#1E293B,stroke:#334155,stroke-width:2px,color:#F8FAFC,rx:8px;
    classDef process fill:#4F46E5,stroke:#3730A3,stroke-width:2px,color:#fff,rx:8px;
    
    A[Live Match Data API]:::sys --> B[Ingestion Microservice]:::process
    B --> C[Kafka Event Bus]:::sys
    C --> D[Live State Cache Redis]:::sys
    C --> E[ML Inference Engine]:::process
    E --> F[Calculate Win Probability]:::process
    E --> G[XAI Engine Generates Reasons]:::process
    F --> H[GraphQL Subscriptions]:::sys
    G --> H
    H --> I[Frontend UI Update]:::process
```

### 4. Chatbot Flow (Conversational AI)
```mermaid
sequenceDiagram
    participant User
    participant ChatUI
    participant NLP_Service
    participant RAG_Engine
    participant DB
    participant LLM

    User->>ChatUI: "Why is RCB favored?"
    ChatUI->>NLP_Service: Send Query
    NLP_Service->>RAG_Engine: Identify Intent (Match Context)
    RAG_Engine->>DB: Fetch Live Score, Prediction, XAI Reasons
    DB-->>RAG_Engine: Context Data
    RAG_Engine->>LLM: Formulate Prompt with Context
    LLM-->>NLP_Service: Generate Natural Response (Stream)
    NLP_Service-->>ChatUI: Stream Text
    ChatUI-->>User: "RCB is favored because their batting rating is 92..."
```

### 5. Tournament Prediction Flow
- Runs nightly after match completions.
- **Input:** Current points table, remaining schedule, team strength ratings.
- **Process:** Monte Carlo simulations (10,000+ iterations) to determine probability distributions for Top 4 qualification and Championship win.
- **Output:** Cached JSON stored in Redis and served to the "Tournament Predictor" dashboard.

### 6. Analysis Flow (Team/Player Intelligence)
- User selects a Player (e.g., Virat Kohli).
- Frontend queries GraphQL API for `playerStats(id)`.
- Backend aggregates historical data from ClickHouse.
- Backend calculates "Recent Form" using a weighted moving average of the last 5 matches.
- UI renders charts (Run distributions, Strike Rate trends).

### 7. Error Handling Flow
- **API Failure:** UI displays graceful fallback (e.g., "Live odds temporarily unavailable").
- **LLM Timeout/Failure:** Chatbot responds with a standard safety message ("I'm analyzing complex data right now, please try again in a moment.")
- **Data Desync:** Client-side polling validates local state against server state hash every 30 seconds; forces a hard refresh if out of sync.

### 8. Navigation Flow
```mermaid
graph TD
    classDef page fill:#0F172A,stroke:#1E293B,stroke-width:2px,color:#38BDF8,rx:5px;
    
    Home[Homepage / Live Matches]:::page --> Match[Match Center]:::page
    Home --> Tournament[Tournament Predictor]:::page
    Home --> Teams[Teams Hub]:::page
    
    Match --> Matchup[Head-to-Head]:::page
    Match --> Venue[Venue Insights]:::page
    Match --> Chat[AI Match Assistant]:::page
    
    Teams --> TeamProfile[Team Profile]:::page
    TeamProfile --> PlayerProfile[Player Profile]:::page
```
