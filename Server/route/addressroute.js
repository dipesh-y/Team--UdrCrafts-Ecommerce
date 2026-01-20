import {Router} from 'express'
import auth from '../middleware/auth.js'
import { addAddressController } from '../controllers/addresscontroller';

const addressRouter = Router();
addressRouter.post('/add', auth, addAddressController)

export default addressRouter;