import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';

// import { fileUpload } from 'express-fileupload';

const uploadSingleFile: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    sendResponse<{ url: string }>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User Created successfully!',
      data: { url: data.uploadedImageUrl },
    });
  }
);
export const fileUploadController = {
  uploadSingleFile,
};
