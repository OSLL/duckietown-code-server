## Duckietown Code Server

Так как frontend (VS Code) разворачивается на боте, а backend на отдельной машине, каждый компонент запускается отдельно в соответствии с Readme:

- Frontend: 
 [Развернуть docker-container](https://github.com/OSLL/duckietown-code-server/blob/dev/frontend/README.md) [Развернуть docker-container](https://github.com/OSLL/duckietown-code-server/blob/dev/frontend/README.md)
  
- Backend: 
```
  cd backend/
  docker-compose up --build -d
```

Инструкция по подключению Web IDE в dashboard.
1. Для начала запускаем контейнер с Duckietown Dashboard. Если нужно, скачиваем Docker Desktop, а терминале вводим команду 
```

docker pull afdaniele/compose
```
![изображение](https://user-images.githubusercontent.com/55065701/170989932-5ac03b20-6225-4016-a9ea-f54fe20a68ca.png)
2. В Docker Desktop запускаем контейнер. При запуске делаем в настройках доступным его 8443 порт извне. Также необходимо указать порт для интерфейса localhost. Сокет по этому адресу будет мостом до Web IDE на 8443 порту контейнера. 
3. Заходим в терминал контейнера. 
4. Скачиваем нужный нам пакет командой 
```
git clone https://github.com/OSLL/duckietown-code-server.git
```
5. В браузере переходим по ссылке http://localhost:8080/. Выполняем установку /compose/ по инструкции, которая будет выведена на экран. 
6. В toolbar должна появиться вкладка с нашим пакетом. 
![изображение](https://user-images.githubusercontent.com/55065701/170998722-3e16617e-b1a1-46c6-bf52-c2be68c5773a.png)
7. Теперь нам осталось просто запустить Web ide по инструкции, приведенной выше и обновить страницу. 
Web ide интегрировано в Duckietown Dashboard.
![изображение](https://user-images.githubusercontent.com/55065701/170999357-b435f122-e5d8-45a5-8fac-c8dd8bcc3ace.png)
