const express = require('express');
const userController = require('../Controller/UserController');
const projectController = require('../Controller/ProjectController')
const route = express.Router();
const jwtMiddleware = require('../Middleware/JwtMiddleware')
const multerMiddleware = require('../Middleware/multerMiddleware')



route.post('/register', userController.register);
route.post('/login', userController.login);
route.patch('/update-profile', jwtMiddleware, multerMiddleware.single('profilePicture'), userController.userProfileUpdate)
//projects
route.post('/add-project', jwtMiddleware, multerMiddleware.single('picture'), projectController.addProject)
route.get('/get-projects', jwtMiddleware, projectController.getAllUserProjects)
route.get('/all-projects', projectController.getAllProjects)
route.delete('/delete-project/:id', jwtMiddleware, projectController.deleteProject)
route.put('/project-update/:id', jwtMiddleware, multerMiddleware.single('picture'), projectController.updateProject)
module.exports = route;
