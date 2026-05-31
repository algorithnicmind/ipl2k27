"""
Tests for the CIAP ML Service health endpoint.
"""
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_health_check():
    """Verify that the health check endpoint returns a healthy status."""
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["service"] == "ciap-ml-service"


def test_root_endpoint():
    """Verify that the root endpoint returns service metadata."""
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert "endpoints" in data
    assert "predict_match" in data["endpoints"]
