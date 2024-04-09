import express from 'express';
import uploadImage, { uploadMulter } from '../../middlewares/uploadImage';
import { fileUploadController } from './fileUpload.controller';

const router = express.Router();
router.post(
  '/',
  uploadMulter.single('image'),
  uploadImage,
  fileUploadController.uploadSingleFile
);

export const fileUploadRoutes = router;
