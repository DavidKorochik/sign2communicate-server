"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_1 = __importDefault(require("../../middleware/auth"));
var userController_1 = require("../../controllers/user/userController");
var router = express_1.default.Router();
// Create a user @/api/user
router.post('/', userController_1.createUser);
// Get all users @/api/user
router.get('/', userController_1.getUsers);
// Delete a user @/api/user/:id
router.delete('/:id', auth_1.default, userController_1.deleteUser);
exports.default = router;
