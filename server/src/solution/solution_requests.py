import requests
import os

URL: str = os.getenv('AUTOLAB_SITE_BACKEND_URL')


def request_build(hostname: str, url: str, branch: str):
    return requests.get(f"{URL}"
                    f"/sol/build?hostname={hostname}&url={url}&branch={branch}")


def request_run(hostname: str, url: str, branch: str):
    return requests.get(f"{URL}"
                    f"/sol/run?hostname={hostname}&url={url}&branch={branch}")


def request_stop(hostname: str, category: int = 0):
    return requests.get(f"{URL}"
                    f"/sol/stop?hostname={hostname}&category={category}")
