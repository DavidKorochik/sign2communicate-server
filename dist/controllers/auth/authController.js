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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLoggedInUser = exports.logInUser = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var User_1 = require("../../entites/user/User");
var redis_1 = __importDefault(require("../../db/redis/redis"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Log in to an existing user @/api/auth
var logInUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var personal_number, user, payload, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                personal_number = req.body.personal_number;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, User_1.User.findOne({ where: { personal_number: personal_number } })];
            case 2:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/, res
                            .status(404)
                            .json({ error: 'User is not existed, create a user instead' })];
                payload = {
                    user: {
                        id: user.id,
                    },
                };
                // Assign the payload and create a new log in instance
                jsonwebtoken_1.default.sign(payload, process.env.SECRET_KEY, {
                    expiresIn: '6 days',
                }, function (err, token) {
                    if (err)
                        throw err;
                    res.status(201).json(token);
                });
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                return [2 /*return*/, res.status(500).json({ error: err_1.message })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.logInUser = logInUser;
// Get the logged in user @/api/auth
var getLoggedInUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, userCached, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                return [4 /*yield*/, User_1.User.findOne(req.user.id)];
            case 1:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/, res.status(404).json({ error: 'User is not existed' })];
                // Caching the user that is logged in
                return [4 /*yield*/, redis_1.default.setEx(req.user.id, 3600, JSON.stringify(user))];
            case 2:
                // Caching the user that is logged in
                _a.sent();
                return [4 /*yield*/, redis_1.default.get(req.user.id)];
            case 3:
                userCached = _a.sent();
                if (!userCached) return [3 /*break*/, 4];
                return [2 /*return*/, res.status(200).json(userCached)];
            case 4: return [4 /*yield*/, redis_1.default.setEx(req.user.id, 3600, JSON.stringify(user))];
            case 5:
                _a.sent();
                return [2 /*return*/, res.status(200).json(user)];
            case 6: return [3 /*break*/, 8];
            case 7:
                err_2 = _a.sent();
                return [2 /*return*/, res.status(500).json({ error: err_2.message })];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.getLoggedInUser = getLoggedInUser;