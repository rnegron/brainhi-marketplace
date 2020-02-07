# BrainHi Marketplace: An interview project

## Docker Setup

1. Download [Docker Compose](https://docs.docker.com/compose/install/)
2. Run `docker-compose up -d`
3. Visit [http://localhost:8000](http//localhost:8000) to view the frontend, [http://localhost:8000](http//localhost:8000) to view the backend API and [http://localhost:8080](http//localhost:8080) to access the [Adminer](https://www.adminer.org/) database interface. A super user for the Django Admin is created automatically using fixtures. 


    email: admin@example.com
    password: password123


You can log in to the Admin interface with the created super user and to the adminer with the following settings:
    
    System      PostgreSQL
    Server      database
    Username    postgres
    Password    password
    Database    postgres

4. Run `docker-compose down` to stop the running containers.

## Running backend tests

**Note**: The [default Django test command](https://docs.djangoproject.com/en/2.2/topics/testing/overview/#running-tests) is being overwritten in this project. That means running

```bash
python backend/manage.py test
```

will instead run a custom management command that executes a shell script, using `docker-compose` and `pytest` for testing.

Alternatively, you can run the shell script directly:

```bash
./backend/run-tests
```