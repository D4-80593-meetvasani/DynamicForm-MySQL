# Dynamic Form App

### This is a simple Dynamic Form application built with Express.js and MySQL. It provides basic CRUD (Create, Read, Update, Delete) operations for a form. Follow the instructions below to run the application.

## Prerequisites
Node.js installed (Download and install from https://nodejs.org/)
MySQL server installed and running

## Getting Started

Clone the repository
Go to directory

Install dependencies:
```bash
npm install
```

## Set up the MySQL database:

Create a database named wpt (or choose a different name, but make sure to update the database field in app.js accordingly).
Create a SQL schema . You can find the commands in repository.
Configure the MySQL connection:

## Update the connectionDetails object with your MySQL credentials:
```javascript
const connectionDetails = {
  host: "localhost",
  database: "your-databasename",
  user: "your-mysql-username",
  password: "your-mysql-password",
};
```

## Run the application:

```bash
node index.js
```
### The app should now be running. Access it in your web browser at http://localhost:3000.

## Routes
### GET /emps: Retrieve all form data.
### POST /emps: Add a new form entry.
### PUT /emps/:Email: Update an existing form entry.
### DELETE /emps/:Email: Delete a form entry.
