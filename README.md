# Project notes - Backend

## How to run
- Using mongo with docker container: **docker-compose up -d**
- Install libraries **npm install or yarn**
- Run project **npm start or yarn start - using hot loader(nodemon)**
- Run project with **Docker**:<br>
		
		docker image build -t notes-client:dev .
		docker container run -p 3001:3001 --detach --name bot notes-client:dev