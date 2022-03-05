import os

token = "token from github"
username = "user name"
host = "github.com"
path = "repository/path"
clone = f"git clone https://{token}@{host}/{path}"
os.system(clone)