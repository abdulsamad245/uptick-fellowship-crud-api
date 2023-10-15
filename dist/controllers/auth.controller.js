"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = (req, res) => {
    const { username, password } = req.body;
    const newUser = new User_1.default({ username, password });
    newUser.save((err) => {
        if (err) {
            return res.status(500).json({ message: 'User registration failed.' });
        }
        return res.status(201).json({ message: 'User registered successfully.' });
    });
};
exports.register = register;
const login = (req, res) => {
    const { username, password } = req.body;
    User_1.default.findOne({ username, password }, (err, user) => {
        if (err || !user) {
            return res.status(401).json({ message: 'Authentication failed.' });
        }
        const token = jsonwebtoken_1.default.sign({ sub: user._id }, process.env.JWT_SECRET || 'secret');
        return res.status(200).json({ token });
    });
};
exports.login = login;
//# sourceMappingURL=auth.controller.js.map