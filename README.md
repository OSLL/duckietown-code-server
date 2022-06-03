## Duckietown Code Server

Так как frontend (VS Code) разворачивается на боте, а backend на отдельной машине, каждый компонент запускается отдельно в соответствии с Readme:

- Frontend: 
 [Развернуть docker-container](https://github.com/OSLL/duckietown-code-server/blob/dev/frontend/README.md) [Развернуть docker-container](https://github.com/OSLL/duckietown-code-server/blob/dev/frontend/README.md)
  
- Backend: 
```
  cd backend/
  docker-compose up --build -d
```

## Инструкция по подключению Web IDE в dashboard.

1. Сначала скачиваем образ контейнера, для этого в терминале вводим команду:
```
docker pull afdaniele/compose
```
![изображение](https://user-images.githubusercontent.com/55065701/171939354-29efcb06-6531-4ed4-996a-b95c7dfe9a94.png)

2. Теперь запукаем сам контейнер с дашбордом и нужным пакетом.
При работе в Docker Desktop выбираем вклдаку Images и находим наш образ из пунтка 1. При запуске делаем в настройках доступным 8080 порт контейнера извне. Также необходимо указать порт для интерфейса localhost. Сокет по этому адресу будет мостом до Web IDE на 8080 порту контейнера. 
![изображение](https://user-images.githubusercontent.com/55065701/171870360-1c1db11f-b424-43e6-b07a-d42fd578ce94.png)

При работе в терминале используем команду:
```
docker run -p 8080:80 afdaniele/compose
```
 
3. Заходим в терминал контейнера. 
При работе в Docker Desktop для этого нажимаем кнопку CLI:
![изображение](https://user-images.githubusercontent.com/55065701/171940811-534ad19c-a7d5-41a0-9185-f581c5f065aa.png)

При работе в терминале для этого сначала выводим список запущенных контейнеров командой
```
docker ps
```
После этого заходим в терминал контейнера с помощью полученного CONTAINER ID выполняя команду
```
docker exec -it <CONTAINER ID> bash
```
![изображение](https://user-images.githubusercontent.com/55065701/171941074-0d355d9b-78bd-4681-b9bc-5da5c6ed64da.png)

4. Скачиваем нужный нам пакет.
Сначала в терминале контейнера переходим в папку user-data:
 ```
cd /user-data
```
Далее сюда нужно склонировать настроенный для проекта пакет, его можно получить вместе с проектом командой:
 ```
git clone https://github.com/OSLL/duckietown-code-server.git 
```
Далее, нам нужно переименовать название папки проекта в packages, делаем это командой 
```
mv duckietown-code-server packages
```
В получившейся папке /user-data/packages можно удалить файлы проекта, так как в данном случае нет смысла хранить их в контейнере, все нужные настройки сохранены в файле a.
6. В браузере переходим по ссылке http://localhost:8080/. Выполняем установку /compose/ по инструкции, которая будет выведена на экран, проходим все 4 шага. 
7. После завершения всех 4 шагов, в toolbar должна появиться вкладка с нашим пакетом. 
![изображение](https://user-images.githubusercontent.com/55065701/170998722-3e16617e-b1a1-46c6-bf52-c2be68c5773a.png)
8. Теперь нам осталось просто запустить Web ide по инструкции, приведенной выше и обновить страницу. 
Web ide интегрировано в Duckietown Dashboard.
![изображение](https://user-images.githubusercontent.com/55065701/170999357-b435f122-e5d8-45a5-8fac-c8dd8bcc3ace.png)
