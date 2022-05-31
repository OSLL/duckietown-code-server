
if [[ $1 = "--build" ]]
then
    echo "docker stop web-ide-frontend web-ide-backend web-ide-nginx"
    docker stop web-ide-frontend web-ide-backend web-ide-nginx
    docker rm web-ide-frontend web-ide-backend web-ide-nginx

    docker system prune -f -a
    docker images -a

    docker-compose up --build
 elif [[ $1 = "--buildFront" ]]
then
    echo "docker stop web-ide-frontend"
    docker stop web-ide-frontend 
    docker rm web-ide-frontend 

    docker rmi duckietown-code-server_nginx duckietown-code-server_frontend lscr.io/linuxserver/code-server
    docker images -a

    docker-compose up --build
else
    docker-compose up
fi