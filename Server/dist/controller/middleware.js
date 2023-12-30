"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../utils/config"));
const authenticate = (req, res, next) => {
    const token = req.header('x-auth-token');
    // Check if not token
    if (!token) {
        return res.status(401).send({
            status: false,
            message: 'No Valid token, authorization denied'
        });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.secretKey);
        req.user = decoded.user;
        next();
    }
    catch (error) {
        console.log("Error", error);
        res.status(400).send({
            message: error.message,
            status: false
        });
    }
};
exports.default = authenticate;
