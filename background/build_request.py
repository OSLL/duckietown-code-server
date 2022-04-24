import requests

URL = "http://localhost:5001"
hostname = "autobot10"


if __name__ == "__main__":
    requests.get(f"{URL}/build?hostname={hostname}")
