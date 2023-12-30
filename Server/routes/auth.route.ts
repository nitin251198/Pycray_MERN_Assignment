import express, { Router} from 'express';
import { signup, test, login } from '../controller/auth.controller';
import authenticate from '../controller/middleware';

const router: Router = express.Router();
router.get("/",test);
router.post("/signup",signup);
router.post("/login",login);
//router.post("/logout",authenticate,logOut);


export default router;