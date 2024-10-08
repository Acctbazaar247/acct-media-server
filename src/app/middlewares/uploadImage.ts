import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import httpStatus from 'http-status';
import multer from 'multer';
import path from 'path';
import ApiError from '../../errors/ApiError';

// cloudinary config

// Define the folder where images will be uploaded
const uploadDir = '/mnt/data/uploads';

// Ensure the directory exists before using it
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Define Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Check and create folder if necessary
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// Multer upload configuration
export const uploadMulter = multer({
  dest: uploadDir,
  storage,
  limits: {
    fileSize: 4000000, // Limit file size to 4MB
  },
});
const uploadImage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.file) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Image file not found!');
    }

    const file = req.file;
    console.log(file);
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${
      file.filename
    }`;
    console.log(imageUrl);
    req.body.uploadedImageUrl = imageUrl;
    next();
  } catch (e) {
    next(e);
  }
};

// async function uploadToCloudinary(file: UploadedFile, publicId: string) {
//   return new Promise<UploadApiResponse>((resolve, reject) => {
//     cloudinary.uploader
//       .upload(file.tempFilePath, {
//         resource_type: 'auto', // Automatically determine the resource type
//         public_id: publicId,
//       })
//       .then(result => {
//         resolve(result);
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });
// }

export default uploadImage;
