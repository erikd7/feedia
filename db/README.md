## Overview

This repo contains the setup for the Feedia PostgreSQL database and the SQL migrations, applied via Flyway. The database runs in Docker. The docker compose initializes the database and Flyway runs the SQL scripts against it.

## Getting Started

### Environment Variables

You'll need the following environment variables:
`POSTGRES_DB` - name of the database
`POSTGRES_USER` - name of the intialized user. PostgreSQL provisions the user and Flyway uses the user to run the migrations.
`POSTGRES_PASSWORD` - password of the database user

The below environment variables allow you to keep a consistent user record that is recreated with each database creation. To get the values the first time, run migration V100 without creating user 0. Use the UI to sign in. Then copy the newly-created values from the new row on the `users` table into the below variables.

`DEFAULT_USER_EMAIL`
`DEFAULT_USER_PHOTO_URL`
`DEFAULT_USER_EXTERNAL_ID`

### Running

Use the following command to run the database and run the Flyway migrations.

```
./start.sh
```

Press Ctrl+C when you no longer need db to run. The database instance will be saved locally between runs.

Use the following command to remove the local instance:

```
./destroy_docker_instance.sh
```

## Used Materials

Credit to tomaszbartoszewski. This proejct was initialized by forking [this repo](https://github.com/tomaszbartoszewski/postgresql-docker).
