# Data Architecture Document
## Cricket Intelligence AI Platform (CIAP)

### 1. Data Collection Layer
- **Batch Collectors:** Python scripts running as Cron jobs to download historical datasets weekly.
- **Streaming Collectors:** Node.js WebSockets connected to external providers (Sportradar).
- **Scrapers:** Serverless functions (AWS Lambda) for ad-hoc player news and metadata.

### 2. Data Processing Layer
- **ETL Pipelines:** Managed via Apache Airflow.
- **Cleaning:** Handling missing values, standardizing player names (e.g., "V Kohli" vs "Virat Kohli"), mapping venue names.
- **Stream Processing:** Apache Flink or Kafka Streams for rolling aggregations (e.g., updating "Runs in last 5 overs" every ball).

### 3. Feature Store
- Utilizes Feast or a custom Redis implementation to serve pre-computed features to the Prediction Layer in milliseconds (e.g., serving pre-calculated Team Strength matrices during live inference).

### 4. Data Storage Layer
- **Data Lake:** AWS S3 (Parquet files for cost-effective mass storage).
- **Relational DB (PostgreSQL):**
  - `Users`, `Subscriptions`, `Teams`, `Players`, `Tournaments`.
- **Analytical DB (ClickHouse):**
  - `Ball_by_Ball`, `Match_Summaries`.
- **In-Memory (Redis):**
  - `Live_Match_State`, `Active_Predictions`.

### 5. Database Schema Design (High Level)
**PostgreSQL - Core Tables:**
- `Team` (ID, Name, ShortName, LogoURL)
- `Player` (ID, Name, Role, BattingStyle, BowlingStyle)
- `Match` (ID, TournamentID, Date, Venue, Team1_ID, Team2_ID, Status)

**ClickHouse - Analytics Table:**
- `BallEvent` (MatchID, Inning, Over, Ball, BatterID, BowlerID, RunsOffBat, Extras, WicketType, IsBoundary) -> Partitioned by Year, Ordered by MatchID/Inning/Over/Ball.

### 6. Analytics Layer & Reporting Layer
- Internal dashboards powered by Apache Superset or Metabase connected to ClickHouse for business intelligence and data quality monitoring.

### 7. Prediction Layer
- Reads from the Feature Store and Kafka Streams to evaluate XGBoost models, writing outputs back to Redis for the UI to consume.

### 8. Data Quality Rules & Data Validation
- **Validation Checks:** Run scored on a ball must be between 0 and 6 (excluding overthrows/extras anomalies, flagged for review).
- **Integrity:** Total innings runs must equal the sum of ball-by-ball runs + extras.

### 9. Data Governance
- Strict schema enforcement using Pydantic models in the Python ingestion layer. All PII (user accounts) isolated in PostgreSQL with strict IAM access policies.
