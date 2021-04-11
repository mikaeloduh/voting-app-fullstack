# Build a Voting App (backend)

[![Build Status](https://cloud.drone.io/api/badges/mikaeloduh/voting-app-fullstack/status.svg)](https://cloud.drone.io/mikaeloduh/voting-app-fullstack)

## Prerequisite & Install

- Node.js ^8.0
- MongoDB ^4.0

Install project packages:

```shell
npm install
```

## Run

To run the MongoDB:

```shell
sudo mongod
```

To run the backend server:

```shell
npm run start
```

To run test

```shell
npm run test
```

## Documentation

You can run this command and open browser at localhost:8000/document while server is running. Or check out our live demo from the link in repository detail.

```shell
npm run docs
```

## User Stories

- User Story: As an unauthenticated or authenticated user, I can see everyone's polls.
- User Story: As an unauthenticated or authenticated user, I can see everyone's poll detail.
- User Story: As an authenticated user, I can create a poll with any number of possible items.
- User Story: As an authenticated user, I can vote on everyone's poll.
- User Story: As an authenticated and authorized user, I can delete polls that I decide I don't want anymore.
