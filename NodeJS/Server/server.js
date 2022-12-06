const { response } = require('express');
const express = require('express'),

  userController = require('./controllers/userController'),
  cors = require('cors');

userController.getUsers().then(res => {
  const users = res.recordset;
  console.log(users);
})