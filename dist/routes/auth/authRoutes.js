"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_1 = __importDefault(require("../../middleware/auth"));
var authController_1 = require("../../controllers/auth/authController");
var router = express_1.default.Router();
// Log in to an existing user @/api/auth
router.post('/', authController_1.logInUser);
// Get the logged in user @/api/auth
router.get('/', auth_1.default, authController_1.getLoggedInUser);
exports.default = router;
