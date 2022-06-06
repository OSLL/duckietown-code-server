# Запуск VS Code Server

Работа с vscode-server проходит через makefile.
Для запуска надо ввести:
```
make up
```

У makefile есть следующие флаги:

```
	build 		- Will build the project and launch it
	buildFront 	- Rebuilds the front-end gets it up and running
	up		    - Starts the project and builds it if it has not been done
	stop 		- Stops and removes all containers and images
	help 		- Outputs help on flags
```
