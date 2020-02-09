FROM python:3.7-slim-buster as base

ENV LANG en_US.utf8
ENV PIP_USER=1
ENV PIPENV_SYSTEM=1
ENV PYTHONUNBUFFERED=1
RUN apt-get update -y \
    && apt-get install -y --no-install-recommends build-essential=12.6 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

ENV PATH="/home/appuser/.local/bin:$PATH"
RUN useradd --create-home appuser
USER appuser

FROM base as builder

WORKDIR /tmp/
RUN pip install pipenv==2018.11.26
COPY --chown=appuser:appuser Pipfile Pipfile.lock /tmp/
RUN pipenv lock --requirements > requirements.txt
RUN pipenv lock --requirements --dev > requirements_dev.txt

FROM base

WORKDIR /home/appuser
COPY --from=builder --chown=appuser:appuser /tmp/requirements*.txt /home/appuser/
RUN pip install --user -r requirements.txt && pip install --user -r requirements_dev.txt
COPY --chown=appuser:appuser . .