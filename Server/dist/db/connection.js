"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../utils/config"));
const connect = () => {
    try {
        mongoose_1.default.set('strictQuery', true);
        mongoose_1.default.connect(config_1.default.dbURL).then(() => console.log("DataBase Connected Successfully")).catch(() => console.log("Unable to connect with DataBase"));
    }
    catch (error) {
        console.log("Unable to connect with DataBase");
    }
};
exports.default = connect;
