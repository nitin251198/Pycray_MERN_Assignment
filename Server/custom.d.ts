// custom.d.ts
import { Request as expressRequest } from "express";
interface Request extends expressRequest{
  user?: any;    
}