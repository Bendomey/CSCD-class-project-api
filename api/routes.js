const express = require('express');
const Route = express.Router();
const AuthController = require('./services/AuthController');
const DepartmentController = require('./services/DepartmentController');
const HallController = require('./services/HallController');
const RoomController = require('./services/RoomController');
const ErrorHandler = require('./ErrorHandlers');

Route.route('/register')
    .post(AuthController.sanitize_body, AuthController.generateAuth, ErrorHandler.catchErrors(AuthController.register));

Route.route('/login')
    .post(AuthController.sanitize_login, ErrorHandler.catchErrors(AuthController.login));

Route.route('/department/create')
    .post(DepartmentController.sanitize_body, ErrorHandler.catchErrors(DepartmentController.create));

Route.route('/hall/create')
    .post(HallController.sanitize_body, ErrorHandler.catchErrors(HallController.create));

Route.route('/room/create')
    .post(RoomController.sanitize_room, ErrorHandler.catchErrors(RoomController.generateRoom), ErrorHandler.catchErrors(RoomController.create));

Route.route('/room/applyToRoom')
    .post(ErrorHandler.catchErrors(RoomController.applyToRoom));

Route.route('/room/removeFromRoom')
    .post(ErrorHandler.catchErrors(RoomController.removeFromRoom));

module.exports = Route;