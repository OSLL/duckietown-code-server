# duckietown-code-server
____
## Configure docker container
1. You need to have [Docker Compose](https://docs.linuxserver.io/general/docker-compose).
2. Run `docker-compose up -d` from within the same folder where the `docker-compose.yml` file is located.
3. **Code-server** will be available on http://127.0.0.1:8443.
4. Flask-API will be available on http://0.0.0.0:5000.
5. Enter password: `password` for VSCODE.
6. Run `docker-compose down` to stop container.