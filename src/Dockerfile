FROM python:3.8

COPY . ./src

WORKDIR src

RUN apt-get update
RUN apt-get install sshpass
RUN mkdir template-ros-core
#RUN apt-get install rsync

RUN pip3 install -r requirements.txt
RUN bash solution/scripts/dts-run.sh

CMD bash solution/scripts/start.sh