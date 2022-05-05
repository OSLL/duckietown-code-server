## Duckietown Code Server

Так как frontend (VS Code) разворачивается на боте, а backend на отдельной машине, каждый компонент запускается отдельно в соответствии с Readme:

- Frontend: 
  ```
  cd frontend/
  docker-compose up --build -d
  docker logs web-ide-frontend
  ```
  Paste link from docker logs into browser
  
- Backend: 
```
  cd backend/
  docker-compose up --build -d
```
