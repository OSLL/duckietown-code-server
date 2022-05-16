# Запуск VS Code Server 
1) Запустить vsc-server через 
```
docker-compose up
```
2) Перейти в папку с расширением
```
 cd config/extensions/helloworld/ 
 ```
 3) Запустить локальный сервер 
 ```
 npx serve --cors -l 5050
 ```
 4) Открываем новый терминал в этой же папке:
 ```
npx localtunnel -p 5050
```
5) Переходим по ссылке из шага выше, нажимаем большую кнопку по середине экрана и копируем ссылку 
6) Переходим к нашей web-ide там нажимаем Ctrl+Shift+p (или F1 если Firefox)и ищем Install Web Extension from Location
7) Вводим нашу ссылку из 5 пункта

