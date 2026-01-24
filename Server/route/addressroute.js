import {Router} from 'express'
import auth from '../middleware/auth.js'
import { addAddressController,getAddressController } from '../controllers/address.controller.js';
// import { selectAddressController } from '../controllers/addresscontroller.js';

const addressRouter = Router();
addressRouter.post('/add', auth, addAddressController)
addressRouter.get('/get',auth,getAddressController)
// addressRouter.put('/selectAddress/:id',auth,selectAddressController)
export default addressRouter;