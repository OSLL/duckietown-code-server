import requests

URL = "http://localhost:5001"
hostname = "autobot06"


if __name__ == "__main__":
    requests.get(f"{URL}/stop?hostname={hostname}")
