## Paytm Clone
This is an appliction where you can transfer money to your different contact, check you own balance.

## Prerequisites

 - [Node.js](https://nodejs.org/en) version >=16.x
 - [Docker](https://www.docker.com/get-started/)


## Setup

1. Clone the repo into a public GitHub repository.
```
   git clone https://github.com/<github_username>/paytm-clone.git
```

2. Navigate to project directory
```
cd paytm-clone
```
3. Build(using the docker file) and run local mongo instance in replicated mode on docker
```
docker build ./ -t mongodb:4.7-replset
docker run --name mongo-replset -p 27017:27017 -v /db-data/mongo:/data/db -d mongodb:4.7-replicaset
```
4. Navigate to backed folder.
```
cd backend
```
5. Build and run the backend
```
npm i
npx tsc -b
npm run dev
```
6. Run the frontend
```
cd ..\frontend\
npm run dev
```


https://github.com/100xdevs-cohort-2/paytm
https://daily-code-web.vercel.app/tracks/oAjvkeRNZThPMxZf4aX5/JLaLbhDuYn3h5Cn7WJu1
docker build ./ -t mongodb:4.7-replset
docker run --name mongo-replset -p 27017:27017 -v /db-data/mongo:/data/db -d mongodb:4.7-replicaset

Messages
Better Input page
Loading
Readyme

