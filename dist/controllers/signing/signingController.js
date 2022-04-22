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
exports.deleteAllSignings = exports.deleteSigning = exports.updateSigning = exports.getSignings = exports.createSigning = void 0;
var Signing_entity_1 = require("../../entites/signing/Signing.entity");
var express_1 = __importDefault(require("express"));
var redis_1 = __importDefault(require("../../db/redis/redis"));
var dotenv_1 = __importDefault(require("dotenv"));
var typeorm_1 = require("typeorm");
dotenv_1.default.config();
var router = express_1.default.Router();
// Create a signing @/api/signing
var createSigning = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, equipment, signingDate, returningDate, time, description, signing, signingCached, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, equipment = _a.equipment, signingDate = _a.signingDate, returningDate = _a.returningDate, time = _a.time, description = _a.description;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 8, , 9]);
                signing = Signing_entity_1.Signing.create({
                    equipment: equipment,
                    signingDate: signingDate,
                    returningDate: returningDate,
                    time: time,
                    description: description,
                    user: req.user,
                });
                // Caching the new signings that was created
                return [4 /*yield*/, redis_1.default.set(signing.id, JSON.stringify(signing))];
            case 2:
                // Caching the new signings that was created
                _b.sent();
                return [4 /*yield*/, redis_1.default.get(signing.id)];
            case 3:
                signingCached = _b.sent();
                // Saving the signing to the database
                return [4 /*yield*/, signing.save()];
            case 4:
                // Saving the signing to the database
                _b.sent();
                if (!signingCached) return [3 /*break*/, 5];
                return [2 /*return*/, res.status(201).json(JSON.parse(signingCached))];
            case 5: return [4 /*yield*/, redis_1.default.set(signing.id, JSON.stringify(signing))];
            case 6:
                _b.sent();
                return [2 /*return*/, res.status(201).json(signing)];
            case 7: return [3 /*break*/, 9];
            case 8:
                err_1 = _b.sent();
                return [2 /*return*/, res.status(500).json({ error: err_1.message })];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.createSigning = createSigning;
// Get all signings @/api/signing
var getSignings = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var signingRepository, signings, signingsCached, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 10, , 11]);
                signingRepository = (0, typeorm_1.getRepository)(Signing_entity_1.Signing);
                signings = void 0;
                if (!(req.user.role === 'Client')) return [3 /*break*/, 2];
                return [4 /*yield*/, signingRepository.find({
                        where: { user: req.user },
                        relations: ['user'],
                    })];
            case 1:
                signings = _a.sent();
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, signingRepository.find({
                    relations: ['user'],
                })];
            case 3:
                signings = _a.sent();
                _a.label = 4;
            case 4:
                // Finding all of the signings in the database
                if (!signings)
                    return [2 /*return*/, res.status(404).json({ error: 'אין החתמות' })];
                // Caching the signings
                return [4 /*yield*/, redis_1.default.set('signings', JSON.stringify(signings))];
            case 5:
                // Caching the signings
                _a.sent();
                return [4 /*yield*/, redis_1.default.get('signings')];
            case 6:
                signingsCached = _a.sent();
                if (!signingsCached) return [3 /*break*/, 7];
                return [2 /*return*/, res.status(200).json(JSON.parse(signingsCached))];
            case 7: return [4 /*yield*/, redis_1.default.set('signings', JSON.stringify(signings))];
            case 8:
                _a.sent();
                return [2 /*return*/, res.status(200).json(signings)];
            case 9: return [3 /*break*/, 11];
            case 10:
                err_2 = _a.sent();
                return [2 /*return*/, res.status(500).json({ error: err_2.message })];
            case 11: return [2 /*return*/];
        }
    });
}); };
exports.getSignings = getSignings;
// Update a signing @/api/signing/:id
var updateSigning = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, equipment, signingDate, returningDate, time, description, status, obj, id, signingRepository, signing, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, equipment = _a.equipment, signingDate = _a.signingDate, returningDate = _a.returningDate, time = _a.time, description = _a.description, status = _a.status;
                obj = {};
                if (description)
                    obj.description = description;
                if (signingDate)
                    obj.signingDate = signingDate;
                if (returningDate)
                    obj.returningDate = returningDate;
                if (time)
                    obj.time = time;
                if (equipment)
                    obj.equipment = equipment;
                if (status)
                    obj.status = status;
                id = req.params.id;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                signingRepository = (0, typeorm_1.getRepository)(Signing_entity_1.Signing);
                return [4 /*yield*/, signingRepository.findOne({
                        where: { id: id },
                        relations: ['user'],
                    })];
            case 2:
                signing = _b.sent();
                if (!signing)
                    return [2 /*return*/, res.status(404).json({ error: 'החתמה לא נמצאה' })];
                // Merging the changes that were made from the req.body to the signing that we have found
                signingRepository.merge(signing, obj);
                // Saving the new updated signing
                return [4 /*yield*/, signingRepository.save(signing)];
            case 3:
                // Saving the new updated signing
                _b.sent();
                return [2 /*return*/, res.status(200).json(signing)];
            case 4:
                err_3 = _b.sent();
                return [2 /*return*/, res.status(500).json({ error: err_3.message })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.updateSigning = updateSigning;
// Delete a signing @/api/signing/:id
var deleteSigning = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, signing, signingRepository, signingsAfterDeletion, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                return [4 /*yield*/, Signing_entity_1.Signing.findOne(id)];
            case 2:
                signing = _a.sent();
                if (!signing)
                    return [2 /*return*/, res.status(404).json({ error: 'החתמה לא נמצאה' })];
                // Deleting the signing based on the id that was passed
                return [4 /*yield*/, Signing_entity_1.Signing.delete(id)];
            case 3:
                // Deleting the signing based on the id that was passed
                _a.sent();
                // Deleting the signing from the cache
                return [4 /*yield*/, redis_1.default.del(id)];
            case 4:
                // Deleting the signing from the cache
                _a.sent();
                signingRepository = (0, typeorm_1.getRepository)(Signing_entity_1.Signing);
                return [4 /*yield*/, signingRepository.find({
                        relations: ['user'],
                    })];
            case 5:
                signingsAfterDeletion = _a.sent();
                res.status(200).json(signingsAfterDeletion);
                return [3 /*break*/, 7];
            case 6:
                err_4 = _a.sent();
                return [2 /*return*/, res.status(500).json({ error: err_4.message })];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.deleteSigning = deleteSigning;
var deleteAllSignings = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var signings, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, Signing_entity_1.Signing.find()];
            case 1:
                signings = _a.sent();
                if (!signings)
                    return [2 /*return*/, res.status(404).json({ error: 'החתמות לא נמצאו' })];
                // Remove all of the signings
                return [4 /*yield*/, Signing_entity_1.Signing.remove(signings)];
            case 2:
                // Remove all of the signings
                _a.sent();
                // Send all the signings that we are removing
                res.status(200).json(signings);
                return [3 /*break*/, 4];
            case 3:
                err_5 = _a.sent();
                return [2 /*return*/, res.status(500).json({ error: err_5.message })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteAllSignings = deleteAllSignings;
exports.default = router;
