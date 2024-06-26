#!/usr/bin/env bash

set -euo pipefail

postgres_ready() {
    python manage.py shell << END
import sys
import psycopg2
from django.db import connections
try:
  connections['default'].cursor()
except psycopg2.OperationalError:
    sys.exit(-1)
sys.exit(0)
END
}

until postgres_ready; do
      >&2 echo "==> Waiting for Postgres..."
      sleep 1
    done

case "$1" in
  "dev_start")

    echo "==> Collecting static files..."
    python manage.py collectstatic --noinput

    echo "==> Running migrations..."
    python manage.py makemigrations
    python manage.py migrate

    echo "==> Loading initial data..."
    python manage.py loaddata marketplace/users/fixtures/initial.json
    python manage.py loaddata marketplace/providers/fixtures/initial.json

    echo "==> Running dev server..."
    python manage.py runserver_plus 0.0.0.0:8000
    ;;

  "run_tests")
      echo "==> Running pytest..."
      pytest tests/
      ;;
  *)
    exec "$@"
    ;;
esac
