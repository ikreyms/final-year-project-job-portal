# Getting Started with App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the root directory, you can run:

### `npm run server`

Runs the backend server.

In the client directory, you can run:

### `npm start`

Runs the front end app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Attention: .env file required

A .env file needs to be created in the root directory as given below:

PORT=(a port number)

MONGO_URI=(mongodb connection URI)

JWT_SECRET=(random long string)
JWT_EXPIRY=(a time duration such as '10min' '5min')

EMAIL_SERVICE=SendGrid
EMAIL_USERNAME=apikey
EMAIL_PASSWORD=(password for email service)
EMAIL_FROM=(an email)
