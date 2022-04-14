import requests

URL = "localhost:5001"
hostname = "autobot07"
directory = "src/template-ros-core/"
log = "src/logs.txt"

if __name__ == "__main__":
    requests.get(f"{URL}"
                 f"/run?hostname={hostname}&dir={directory}&log={log}")
