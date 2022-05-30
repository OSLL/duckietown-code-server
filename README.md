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
git clone https://github.com/moevm/mse_duckietown_dashboard_WEB_Rviz.git
```
5. Поднимаемся в корень каталога. Переходим в /user-data/packages
6. Меняем имя находящейся в нем папки на то, под которым мы будем запускать проект, например, Web_IDE, и переходим в эту папку. 
7. В файле metadata.json в поля "name" и "description" подставляем название нашего проекта, выбранное на предыдущем шаге.  
8. Переходим в папку configuration. В файле schema.json подставляем навзание нашего проетка в поля "details", в "default" порта указываем 8443.
9. Поднимаемся обратно в /user-data/packages/Web_IDE . Переходим в каталог pages. Находящуюся там папку также переименовываем в название нашего пакета. Переходим в неё. В файле index.php в переменные hostname и port подтставляем присваивание названия нашего пакета. Тоже самое делаем в ifram-e для корректного отображения пакета. В файле metadata.json в поля "name" и "description" подставляем название нашего проекта.
10. В браузере переходим по ссылке http://localhost:8080/. Выполняем установку /compose/ по инструкции, которая будет выведена на экран. 
11. В toolbar должна появиться вкладка с нашим пакетом. 
![изображение](https://user-images.githubusercontent.com/55065701/170998722-3e16617e-b1a1-46c6-bf52-c2be68c5773a.png)
12. Теперь нам осталось просто запустить Web ide по инструкции, приведенной выше и обновить страницу. 
Web ide интегрировано в Duckietown Dashboard.
![изображение](https://user-images.githubusercontent.com/55065701/170999357-b435f122-e5d8-45a5-8fac-c8dd8bcc3ace.png)
