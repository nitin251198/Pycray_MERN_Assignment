import express, { Router,Request, Response} from 'express';
const router: Router = express.Router();
import authRoute from './auth.route';
import taskRoute from './task.route';

router.use("/auth",authRoute);
router.use("/task",taskRoute);

export default router;