const express = require('express');
const Route = express.Router();
const AuthController = require('./services/AuthController');
const DepartmentController = require('./services/DepartmentController');
const ErrorHandler = require('./ErrorHandlers');

Route.route('/register')
    .post(AuthController.sanitize_body, AuthController.generateAuth, ErrorHandler.catchErrors(AuthController.register));

Route.route('/login')
    .post(AuthController.sanitize_login, ErrorHandler.catchErrors(AuthController.login));

Route.route('/department/create')
    .post(DepartmentController.sanitize_body, ErrorHandler.catchErrors(DepartmentController.create));

module.exports = Route;