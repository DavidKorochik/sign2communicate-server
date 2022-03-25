"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var auth = function (req, res, next) {
    try {
        var token = req.header('auth-token');
        if (!token)
            return res.status(401).json({ error: 'User not authorized' });
        var decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        req.user = decoded.user;
        next();
    }
    catch (err) {
        return res.status(401).json({ error: err.message });
    }
};
exports.default = auth;
