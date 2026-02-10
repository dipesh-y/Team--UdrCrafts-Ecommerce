
import {Router} from 'express'
import auth from '../middlewares/auth.js'
import { addAddressController,getAddressController , deleteAddressController} from '../controllers/addresscontroller.js';


const addressRouter = Router();
addressRouter.post('/add', auth, addAddressController)
addressRouter.get('/get',auth,getAddressController)
addressRouter.delete('/:id',auth,deleteAddressController)
export default addressRouter;