"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/notes-api',
    SESSION_SECRET: process.env.SESSION_SECRET || 'your-secret',
    JWT_SECRET: process.env.JWT_SECRET || '',
    PORT: process.env.PORT || 3000,
};
exports.default = config;
//# sourceMappingURL=config.js.map