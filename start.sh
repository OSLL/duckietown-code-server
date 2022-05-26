function buildExtension() {
    cd frontend/config/extensions/helloworld/
    npm i
    npm run vscode:prepublish
    cd ../../../
}




if [[ $1 = "--build" ]]
then
    echo $1
    docker stop web-ide-frontend web-ide-backend web-ide-nginx
    docker rm web-ide-frontend web-ide-backend web-ide-nginx

    docker system prune -f -a
    docker images -a

    buildExtension
    docker-compose up --build
 elif [[ $1 = "--buildFront" ]]
then
    echo $1
    docker stop web-ide-frontend web-ide-nginx
    docker rm web-ide-frontend web-ide-nginx

    docker rmi duckietown-code-server_nginx duckietown-code-server_frontend lscr.io/linuxserver/code-server
    docker images -a

    buildExtension
    docker-compose up --build
else
    echo $1
    docker-compose up
fi