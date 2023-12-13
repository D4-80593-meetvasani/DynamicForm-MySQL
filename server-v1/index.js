const express = require("express");
const mysql = require("mysql2");

const app = express();

const connectionDetails = {
  host: "localhost",
  database: "wpt",
  user: "root",
  password: "manager",
};
app.use((request, response, next) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "*");
  response.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

// app.use((request, response, next)=>
//     {
//         //request.stream data is going to get converetd into
//         //String -> JSON and will be assigned to request.body

//         next();
//     });

app.use(express.json());

app.get("/emps", (request, response) => {
  var connection = mysql.createConnection(connectionDetails);

  var statement = `select * from form`;

  connection.query(statement, (error, result) => {
    if (error == null) {
      response.setHeader("Content-Type", "application/json");
      response.write(JSON.stringify(result));
      connection.end();
      response.end();
    } else {
      response.setHeader("Content-Type", "application/json");
      response.write(JSON.stringify(error));
      connection.end();
      response.end();
    }
  });
});

app.post("/emps", (request, response) => {
  console.log(request.body);

  var connection = mysql.createConnection(connectionDetails);

  var Name = request.body.Name;
  var Age = request.body.Age;
  var Number = request.body.Number;
  var Email = request.body.Email;

  var statement = `insert into form values('${Name}', '${Age}','${Number}','${Email}')`;

  console.log(statement);

  connection.query(statement, (error, result) => {
    if (error == null) {
      response.setHeader("Content-Type", "application/json");
      response.write(JSON.stringify(result));
      connection.end();
      response.end();
    } else {
      response.setHeader("Content-Type", "application/json");
      response.write(JSON.stringify(error));
      connection.end();
      response.end();
    }
  });
});

app.put("/emps/:Email", (request, response) => {
  var connection = mysql.createConnection(connectionDetails);

  var Name = request.body.Name;
  var Age = request.body.Age;
  var Number = request.body.Number;
  var Email = request.body.Email;

  var statement = `update form set name = '${Name}', age='${Age}', no ='${Number}', email = '${Email}' where email = '${Email}'`;

  console.log(statement);

  connection.query(statement, (error, result) => {
    if (error == null) {
      response.setHeader("Content-Type", "application/json");
      response.write(JSON.stringify(result));
      connection.end();
      response.end();
    } else {
      response.setHeader("Content-Type", "application/json");
      response.write(JSON.stringify(error));
      connection.end();
      response.end();
    }
  });
});

app.delete("/emps/:Email", (request, response) => {
  var connection = mysql.createConnection(connectionDetails);

  var Email = request.params.Email; 
  console.log(Email);

  var statement = `delete from form where email = '${Email}'`;

  console.log(statement);

  connection.query(statement, (error, result) => {
    if (error == null) {
      response.setHeader("Content-Type", "application/json");
      response.write(JSON.stringify(result));
      connection.end();
      response.end();
    } else {
      response.setHeader("Content-Type", "application/json");
      response.write(JSON.stringify(error));
      connection.end();
      response.end();
    }
  });
});

app.listen(3000, () => {
  console.log("server listening to port 3000");
});
