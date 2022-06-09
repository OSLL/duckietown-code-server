
if [[ $1 = "--build" ]]
then
    echo "Building web-ide-frontend web-ide-backend web-ide-nginx..."
    docker-compose stop
    docker-compose rm -f
    docker-compose build
    docker-compose up -d

elif [[ $1 = "--buildFront" ]]
then
    echo "Building web-ide-frontend..."
    docker-compose stop frontend 
    docker-compose rm -f frontend 
    docker rmi duckietown-code-server_nginx duckietown-code-server_frontend lscr.io/linuxserver/code-server
    docker-compose build frontend
    docker-compose up -d frontend
elif [[ $1 = "--buildBackend" ]]
then
    echo "Building web-ide-backend web-ide-nginx..."
    docker-compose stop backend nginx
    docker-compose rm -f backend nginx
    docker-compose build backend nginx
    docker-compose up -d backend nginx 
else
    docker-compose up -d
fi