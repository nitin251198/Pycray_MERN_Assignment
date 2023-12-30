"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = exports.test = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = __importDefault(require("../utils/config"));
const User_1 = __importDefault(require("../db/schema/User"));
const test = (req, res) => {
    res.status(200).send({
        message: "Welcome to Auth Route",
        status: 200,
        data: "ok"
    });
};
exports.test = test;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        let user = yield User_1.default.findOne({ username });
        if (user) {
            return res.status(400).send({
                status: false,
                message: 'User already exists'
            });
        }
        user = new User_1.default({ username, password });
        const salt = yield bcryptjs_1.default.genSalt(10);
        user.password = yield bcryptjs_1.default.hash(password, salt);
        yield user.save();
        const payload = {
            user: {
                id: user._id,
            },
        };
        // Generate JWT token
        let token = jsonwebtoken_1.default.sign(payload, config_1.default.secretKey, { expiresIn: 3600 });
        res.status(200).send({
            message: "SignUp Successfully",
            status: true,
            data: token
        });
    }
    catch (error) {
        console.log("Error", error);
        res.status(400).send({
            message: error.message,
            status: false
        });
    }
});
exports.signup = signup;
// Sign in
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        let user = yield User_1.default.findOne({ username });
        if (!user) {
            return res.status(400).json({
                status: false,
                message: 'User Not Exists '
            });
        }
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                status: false,
                message: 'Invalid Credentials'
            });
        }
        const payload = {
            user: {
                id: user._id,
            },
        };
        // Generate JWT token
        let token = jsonwebtoken_1.default.sign(payload, config_1.default.secretKey, { expiresIn: 3600 });
        res.status(200).send({
            message: "Login Successfully",
            status: true,
            data: token
        });
    }
    catch (error) {
        console.log("Error", error);
        res.status(400).send({
            message: error.message,
            status: false
        });
    }
});
exports.login = login;
