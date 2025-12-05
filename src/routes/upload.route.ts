import { Express } from 'express';
import {
  uploadCompanyImage,
  uploadProductImage,
} from '../controllers/upload.controller';
import { uploadSingleImage } from '../middlewares/upload.middleware';

export const uploadRoutes = (app: Express) => {
  /**
   * Upload de imagem de empresa
   * POST /api/upload/company
   * Body: multipart/form-data com campo "image"
   */
  app.post(
    '/api/upload/company',
    uploadSingleImage,
    uploadCompanyImage
  );

  /**
   * Upload de imagem de produto
   * POST /api/upload/product
   * Body: multipart/form-data com campo "image"
   */
  app.post(
    '/api/upload/product',
    uploadSingleImage,
    uploadProductImage
  );
};
