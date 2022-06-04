docker stop web-ide-frontend web-ide-backend web-ide-nginx
docker rm web-ide-frontend web-ide-backend web-ide-nginx

docker system prune -f -a
docker images -a