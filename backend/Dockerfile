# 
FROM python:3.11-alpine

# 
WORKDIR /code

#
COPY . /code/

#
RUN apk add --update --no-cache --virtual .tmp-build-deps \
    gcc libc-dev linux-headers postgresql-dev \
    && apk add libffi-dev
RUN pip install --no-cache-dir --upgrade -r requirments.txt

ENV PYTHONPATH "${PYTHONPATH}:/code"