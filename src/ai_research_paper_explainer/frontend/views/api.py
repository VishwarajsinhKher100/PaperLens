import os
import requests

API_BASE_URL = os.getenv("API_BASE_URL", "http://127.0.0.1:8000")


def login_user(email, password):
    try:
        response = requests.post(
            f"{API_BASE_URL}/api/login",
            data={"username": email, "password": password},
        )
        return response
    except Exception as e:
        return None


def register_user(email, password):
    try:
        response = requests.post(
            f"{API_BASE_URL}/api/register",
            json={"email": email, "password": password},
        )
        return response
    except Exception as e:
        return None


def fetch_history(token):
    if not token:
        return []
    headers = {"Authorization": f"Bearer {token}"}
    try:
        res = requests.get(f"{API_BASE_URL}/api/history", headers=headers)
        if res.status_code == 200:
            return res.json().get("history", [])
    except Exception as e:
        pass
    return []


def generate_explanation(payload):
    try:
        res = requests.post(f"{API_BASE_URL}/explain-paper", json=payload)
        return res
    except Exception as e:
        return None


def save_explanation(token, save_payload):
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
    }
    try:
        res = requests.post(
            f"{API_BASE_URL}/api/save-explanation",
            json=save_payload,
            headers=headers,
        )
        return res
    except Exception as e:
        return None
