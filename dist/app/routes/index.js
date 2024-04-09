"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fileUpload_route_1 = require("../modules/fileUpload/fileUpload.route");
const router = express_1.default.Router();
const moduleRoutes = [
    // ... routes
    {
        path: '/uploadImg',
        route: fileUpload_route_1.fileUploadRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
