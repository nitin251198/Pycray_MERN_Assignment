
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../utils/config';

interface customRequest extends Request{
    user?: any;    
}
 const authenticate = (req: customRequest, res: Response, next: NextFunction) => {
  const token = req.header('x-auth-token');
// Check if not token
  if (!token) {
    return res.status(401).send({ 
        status: false,
        message: 'No Valid token, authorization denied'
     });
  }

  try {
    const decoded: any = jwt.verify(token, config.secretKey as string);
    req.user = decoded.user;
    next();
  } catch (error:any) {
    console.log("Error", error);
    res.status(400).send({
        message:error.message,
        status:false
    }) 
}
};

export default authenticate;
