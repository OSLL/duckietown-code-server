FROM python:3.8

COPY . ./src

WORKDIR src

RUN apt-get update
RUN apt-get install -y avahi-utils iputils-ping apache2-utils sshpass rsync
RUN mkdir template-ros-core

RUN pip3 install -r requirements.txt
RUN bash solution/scripts/dts-run.sh
RUN bash solution/scripts/runtime_docker.sh

CMD python3 server.py