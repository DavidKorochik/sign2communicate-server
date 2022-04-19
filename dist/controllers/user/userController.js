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
exports.deleteUser = exports.getUsers = exports.createUser = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var User_1 = require("../../entites/user/User");
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var router = express_1.default.Router();
// Create a user @/api/user
var createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, personal_number, phone_number, military_unit, role, userExists, user, payload, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, personal_number = _a.personal_number, phone_number = _a.phone_number, military_unit = _a.military_unit, role = _a.role;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, User_1.User.findOne({
                        where: { personal_number: personal_number },
                    })];
            case 2:
                userExists = _b.sent();
                if (userExists)
                    return [2 /*return*/, res
                            .status(400)
                            .json({ error: 'משתמש קיים, אנא כנס למערכת במקום להירשם' })];
                user = personal_number === '8811382' || personal_number === '8889611'
                    ? User_1.User.create({
                        name: name,
                        personal_number: personal_number,
                        phone_number: phone_number,
                        military_unit: military_unit,
                        role: 'Admin',
                    })
                    : User_1.User.create({
                        name: name,
                        personal_number: personal_number,
                        phone_number: phone_number,
                        military_unit: military_unit,
                        role: role,
                    });
                return [4 /*yield*/, user.save()];
            case 3:
                _b.sent();
                payload = {
                    user: {
                        id: user.id,
                    },
                };
                // We generate a jwt token for a user
                jsonwebtoken_1.default.sign(payload, process.env.SECRET_KEY, { expiresIn: '6 days' }, function (err, token) {
                    if (err)
                        throw err;
                    res.status(201).json(token);
                });
                return [3 /*break*/, 5];
            case 4:
                err_1 = _b.sent();
                res.status(500).json({ error: err_1.message });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.createUser = createUser;
// Get all users @/api/user
var getUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, User_1.User.find()];
            case 1:
                users = _a.sent();
                if (!users)
                    return [2 /*return*/, res.status(404).json({ error: 'There are no users' })];
                res.json(users);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.status(500).json({ error: err_2.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUsers = getUsers;
// Delete a user @api/user/:id
var deleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, User_1.User.findOne(id)];
            case 2:
                user = _a.sent();
                // if there is not a user we return a 404 status code
                if (!user)
                    return [2 /*return*/, res.status(404).json({ error: 'There is no such user' })];
                // if there is a user we delete it
                return [4 /*yield*/, User_1.User.delete(id)];
            case 3:
                // if there is a user we delete it
                _a.sent();
                res.json(user);
                return [3 /*break*/, 5];
            case 4:
                err_3 = _a.sent();
                res.status(500).json({ error: err_3.message });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.deleteUser = deleteUser;
exports.default = router;
