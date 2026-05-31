# ML & Data Strategy
## Cricket Intelligence AI Platform (CIAP)

### 1. Data Sources
- **Cricsheet.org:** Ball-by-ball historical data (JSON/YAML format).
- **Sportradar / CricAPI:** Live match telemetries and API feeds.
- **Web Scraping (Fallback):** For enriching player profiles if API gaps exist.

### 2. Historical Data Strategy
- Download all historical IPL data from 2008.
- Normalize schemas into a unified tabular format.
- Store raw files in AWS S3 (Data Lake).
- Load processed tabular data into ClickHouse for rapid aggregation.

### 3. Live Data Strategy
- Poll live API every 1-2 seconds (or use WebSockets if provided).
- Push events to Kafka `live-match` topic.
- In-memory processing via Redis to maintain current match state (runs, wickets, overs, current batters, bowler).

### 4. Feature Engineering
Crucial for accurate predictions. Features include:
- **Team Momentum:** Win ratio in the last 5 matches.
- **Venue Toss Bias:** Percentage of matches won by chasing teams at the current venue.
- **Matchup Stats:** Batter X vs Bowler Y historical strike rate and dismissals.
- **Run Rate Required (RRR):** Dynamic feature updated ball-by-ball.
- **Wicket Resource Remaining:** Using DLS-inspired resource tables.

### 5. Model Selection & Model Comparison
- **Logistic Regression:** Used as a baseline for interpretability.
- **Random Forest:** Good for handling non-linear relationships (e.g., pitch conditions).
- **XGBoost:** Primary model. Handles sparse data well, highly performant, supports missing values. Superior accuracy in preliminary sports analytics testing.
- **LightGBM:** Secondary model for live predictions due to faster inference speed compared to XGBoost.

### 6. Training Pipeline
- Data extracted from ClickHouse -> Python Pandas/Polars -> Scikit-Learn pipeline for scaling/encoding -> XGBoost training -> MLflow for experiment tracking -> Model Registry.

### 7. Validation Strategy
- Time-series cross-validation (Train on 2008-2022, Validate on 2023, Test on 2024). Standard k-fold is avoided to prevent data leakage from future matches.

### 8. Evaluation Metrics
- **Log Loss (Cross-Entropy):** Primary metric for probability calibration.
- **Brier Score:** Measures the accuracy of probabilistic predictions.
- **Accuracy:** Secondary metric (Win/Loss binary).
- **Latency:** Inference time must be under 50ms.

### 9. Explainability Strategy (XAI)
- **SHAP (SHapley Additive exPlanations):** Used to extract the top 3 features contributing to a specific prediction.
- **Heuristic Translation:** A rule-based engine translates SHAP values into natural language (e.g., SHAP value +0.15 for `venue_win_rate` translates to "Favorable venue record").

### 10. Retraining & Monitoring Strategy
- **Monitoring:** Track prediction distributions in real-time via Datadog.
- **Drift Detection:** Monitor if the model's accuracy drops below 65% over a 10-match window (indicating meta-game shifts, e.g., the introduction of the Impact Player rule).
- **Retraining:** Automated nightly retraining pipeline using the latest match data to update team form factors.
