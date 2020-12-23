# BrainHi Marketplace Interview Project

This repository contains the source code for a marketplace app that allows users to book appointments with a variety of health care providers.

The frontend for the app was written with React, and the backend was written with Django.

## Demo

A running version of the app is available at the following URL:

https://brainhi-marketplace.rauln.com/

This version contains 30 provider profiles that were generated using [Faker](backend/marketplace/providers/factories.py).

Whenever you submit a valid appointment form, a new `Appointment` instance is created in the backend. The backend is hosted at the following URL:

https://brainhi-marketplace-api.herokuapp.com

You can use the Django Admin interface (https://brainhi-marketplace-api.herokuapp.com/admin/) to view the created `Appointments`. Use the following pre-created admin user to login:

```
username: admin@brainhi.com
password: Bra1nHi!
```

### Notes

The app is auto-deployed on every `git push` to the master branch using _Netlify_ for the front-end and _Heroku_ for the backend.

## Local Development

You can also setup a local version of the marketplace app.

### Backend setup

__Note__: Requires _Docker_

1. Change into the `backend` folder.

2. Build and run the app in detached mode: `docker-compose up --build -d`

This sets up a PostgreSQL database as well as the Django backend hosted on `localhost:8000`. It also runs some fixtures to pre-populate the database with some provider profiles.

The same Django Admin username and password used for the live demo also work here.

### Frontend setup

1. Change in to the `frontend` folder.

2. Install dependencies: `yarn install`

3. Run the React development server: `yarn start`

This should set up the app on `localhost:3000`, which is expecting the backend to be available at `localhost:8000`.


## Tests

### Backend

First, change into the `backend` fodler.

**Note**: The [default Django test command](https://docs.djangoproject.com/en/2.2/topics/testing/overview/#running-tests) is being overwritten in this project. That means running

```bash
pipenv run python manage.py test
```

will instead run a custom management command that executes a shell script, using `docker-compose` and `pytest` for testing.

Alternatively, you can run the shell script directly:

```bash
./run-tests
```

### Frontend

1. Change in to the `frontend` folder.

2. Install dependencies: `yarn install`

3. Run `cypress` tests
    * With the browser: `yarn test:open`
    * With the CLI: `yarn test:run`
