.PHONY: help build up buildFront stop

build:
	@bash scripts/start.sh --build

buildFront:
	@bash scripts/start.sh --buildFront

up:
	@bash scripts/start.sh

stop:
	@bash scripts/stop.sh

help:
	@echo "make <flag>"
	@echo "Flags: "
	@echo "build 		- Will build the project and launch it"
	@echo "buildFront 	- Rebuilds the front-end and gets it up and running"
	@echo "up		- Starts the project and builds it if it has not been done"
	@echo "stop 		- Stops and removes all containers and images"
	@echo "help 		- Outputs help on flags"