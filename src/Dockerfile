FROM python:3.8

COPY . ./src

WORKDIR src

RUN apt-get update
RUN apt-get install rsync gsync

RUN pip3 install -r requirements.txt

CMD python3 start-docker.py