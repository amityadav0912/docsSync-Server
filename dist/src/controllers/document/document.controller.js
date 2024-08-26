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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.documentController = void 0;
const catch_async_1 = __importDefault(require("../../middleware/catch-async"));
const ducument_service_1 = require("../../services/ducument.service");
const documnet_user_model_1 = require("../../db/models/documnet-user.model");
const document_model_1 = require("../../db/models/document.model");
class DocumentController {
    constructor() {
        this.getOne = (0, catch_async_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            if (!req.user)
                return res.sendStatus(401);
            const { id } = req.params;
            const document = yield ducument_service_1.documentService.findDocumentById(parseInt(id), parseInt(req.user.id));
        }));
        this.getAll = (0, catch_async_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            let documents = yield document_model_1.Document.findAll({
                where: {
                    userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id
                },
            });
            const documentUsers = yield documnet_user_model_1.DocumentUser.findAll({
                where: {
                    userId: (_b = req.user) === null || _b === void 0 ? void 0 : _b.id
                },
                include: {
                    model: document_model_1.Document,
                },
            });
            const sharedDocument = documentUsers.map((documentUser) => documentUser.document);
            documents.push(...sharedDocument);
            return res.status(200).json(documents);
        }));
    }
}
const documentController = new DocumentController();
exports.documentController = documentController;
