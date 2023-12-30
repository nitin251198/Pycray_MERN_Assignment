"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const connection_1 = __importDefault(require("./db/connection"));
const config_1 = __importDefault(require("./utils/config"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = config_1.default.port;
(0, connection_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/", routes_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
