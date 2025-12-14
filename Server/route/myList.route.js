 // myList.route.js
import express from 'express';
import auth from '../middlewares/auth.js';
import {
  addToMyListController,
  deleteToMyListController,  // Make sure this matches the export name
  getMyListController
} from '../controllers/myList.controller.js';

const myListRouter = express.Router();

myListRouter.post('/add', auth, addToMyListController);
myListRouter.delete('/remove/:id', auth, deleteToMyListController);  // This must match
myListRouter.get('/', auth, getMyListController);

export default myListRouter;
