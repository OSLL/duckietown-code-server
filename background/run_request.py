import requests

URL = "http://localhost:5001"
hostname = "autobot10"
directory = "/src/template-ros-core"
log = "/src/template-ros-core/logs.txt"


if __name__ == "__main__":
    requests.get(f"{URL}"
                 f"/run?hostname={hostname}&dir={directory}&log={log}")
