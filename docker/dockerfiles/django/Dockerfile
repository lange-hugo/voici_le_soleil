FROM python:3.12

WORKDIR /app/
COPY ./backend/ .
RUN python -m pip install -r requirements.txt

COPY ./docker/dockerfiles/django/start.sh /start.sh
RUN chmod +x /start.sh
CMD /start.sh