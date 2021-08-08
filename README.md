## Reign-task

This monorepo contains an application stack that fetch articles from an API to save them to a database and then deliver them to the client-side application.

# Deploy the sample stack

First you will need to have installed Docker and Docker compose:

* Docker - [Install Docker community edition](https://hub.docker.com/search/?type=edition&offering=community).
* Docker Compose - [Install Docker Compose](https://docs.docker.com/compose/install/).

To build and deploy your application for the first time, make sure you have .env file with env VARIABLES `MONGODB_USERNAME` & `MONGODB_PASSWORD` at root directory and run the following commands in your shell:

```bash
docker-compose up
```

# Build Compose

To refresh changes in services and build, run this command:

```bash
docker-compose build
```

# Cleanup

To delete the sample application that you created, use the AWS CLI. Assuming you used your project name for the stack name, you can run the following:

```bash
docker-compose down
```