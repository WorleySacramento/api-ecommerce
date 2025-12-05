import { Express } from 'express';
import {
  uploadCompanyImage,
  uploadProductImage,
} from '../controllers/upload.controller';

export const uploadRoutes = (app: Express) => {
  /**
   * Upload de imagem de empresa via base64
   * POST /api/upload/company
   * Body: JSON com campo "imageBase64" (string base64)
   */
  app.post('/api/upload/company', uploadCompanyImage);

  /**
   * Upload de imagem de produto via base64
   * POST /api/upload/product
   * Body: JSON com campo "imageBase64" (string base64)
   */
  app.post('/api/upload/product', uploadProductImage);
};
