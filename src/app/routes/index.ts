import express from 'express';
import { fileUploadRoutes } from '../modules/fileUpload/fileUpload.route';
const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/uploadImg',
    route: fileUploadRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
