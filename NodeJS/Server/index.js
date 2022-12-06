'use strict';
// const express = require('express');
const config = require('./config');
// const router = express.Router()


const { Connection, Request } = require("tedious");


const connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on("connect", err => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('connected');
    queryDatabase();
  }
  //connection.close();
});

connection.connect();

function queryDatabase() {
  console.log("Reading rows from the Table...");

  // Read all rows from table
  const request = new Request(
    `SELECT * FROM Usr;`,
    (err, rowCount) => {
      if (err) {
        console.error("this error: " + err.message);
      } else {
        console.log(`${rowCount} row(s) returned`);
      }
    }
  );

  request.on("row", columns => {
    columns.forEach(column => {
      console.log("%s\t%s", column.metadata.colName, column.value);
    });
  });

  connection.execSql(request);

  request.on('requestCompleted', () => {
    console.log('DONE!');
    connection.close();
  });
}