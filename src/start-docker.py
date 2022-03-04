import docker

if __name__ == "__main__":
    client = docker.from_env()
    print("Get containers list...")
    print(client.containers.list())
