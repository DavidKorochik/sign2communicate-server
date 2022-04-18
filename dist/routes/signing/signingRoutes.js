"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_1 = __importDefault(require("../../middleware/auth"));
var signingController_1 = require("../../controllers/signing/signingController");
var router = express_1.default.Router();
// Create a signing @/api/signing
router.post('/', auth_1.default, signingController_1.createSigning);
// Get all signings @/api/signing
router.get('/', auth_1.default, signingController_1.getSignings);
// Update a signing @/api/signing/:id
router.put('/:id', auth_1.default, signingController_1.updateSigning);
// Delete a signing @/api/signing/:id
router.delete('/:id', auth_1.default, signingController_1.deleteSigning);
// Delete all signings @/api/signing
router.delete('/', auth_1.default, signingController_1.deleteAllSignings);
exports.default = router;
