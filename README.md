## Duckietown Code Server

Since the frontend (VS Code) is deployed on a bot, and the backend on a separate machine, each component is launched separately according to the Readme:

- Frontend(on a duckiebot): 
```
  make buildFront
```
  
- Backend(on server machine): 
```
  make buildBackend
```

To test running locally, type the command:
```
  make build
```

## Duckietown Code Server in DashBoard

The project provides for the possibility of launching a Web-ide in DashBoard:

1. Download the desired image via the terminal:
```
  docker pull afdaniele/compose
```

2. We launch the container itself with a dashboard and the necessary package.
When working in Docker Desktop, select the Images tab and find our image from point 1. At startup, we make the container port 8080 available from the outside in the settings. You also need to specify a port for the localhost interface. The socket at this address will bridge to the Web IDE on container port 8080.
![img1](https://user-images.githubusercontent.com/55065701/171870360-1c1db11f-b424-43e6-b07a-d42fd578ce94.png)

When working in the terminal, use the command:
```
  docker run -p 8080:80 afdaniele/compose
```
 
3. We go to the container terminal.
When working in Docker Desktop, for this we press the CLI button:
![img2](https://user-images.githubusercontent.com/55065701/171940811-534ad19c-a7d5-41a0-9185-f581c5f065aa.png)

When working in the terminal, for this we display a list of running containers with the command
```
  docker ps
```
After that, we go to the container terminal using the received CONTAINER ID by executing the command
```
  docker exec -it <CONTAINER ID> bash
```

4. Download the package we need.
In the container terminal, go to the user-data folder:
 ```
  cd /user-data
```
Next, you need to clone the package configured for the project into the /user-data folder. When copying a directory from a host system, enter the command
```
  docker cp <host_source_path> /user-data
```

Also, the required package can be obtained along with the project by the command:
 ```
  git clone https://github.com/OSLL/duckietown-code-server.git 
```
5. After that, you need to rename the name of the project folder to "packages", do this with the command
```
  mv <old_name> packages
```
If the package was copied along with the project, then in the resulting /user-data/packages folder, you can delete the project files, since in this case it makes no sense to store them in the container, all the necessary settings are saved in the packages.

6. In the browser, follow the link http://localhost:8080/. We install / compose / according to the instructions that will be displayed on the screen, go through all 4 steps.
 
7. After completing all 4 steps, a tab with our package should appear in the toolbar.
![img3](https://user-images.githubusercontent.com/55065701/170998722-3e16617e-b1a1-46c6-bf52-c2be68c5773a.png)

8. Now we just have to start the Web IDE according to the instructions above and refresh the page.
Web-ide is integrated into Duckietown Dashboard.
![img4](https://user-images.githubusercontent.com/55065701/170999357-b435f122-e5d8-45a5-8fac-c8dd8bcc3ace.png)