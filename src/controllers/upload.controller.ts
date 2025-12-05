import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { CloudinaryService } from '../services/cloudinary.service';
import { ValidationError } from '../errors/validation.error';

/**
 * Upload de imagem de empresa
 * POST /api/upload/company
 */
export const uploadCompanyImage = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.file) {
      throw new ValidationError('Nenhum arquivo foi enviado');
    }

    const imageUrl = await CloudinaryService.uploadCompanyImage(req.file);

    res.status(200).json({
      success: true,
      message: 'Imagem de empresa enviada com sucesso',
      imageUrl,
    });
  }
);

/**
 * Upload de imagem de produto
 * POST /api/upload/product
 */
export const uploadProductImage = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.file) {
      throw new ValidationError('Nenhum arquivo foi enviado');
    }

    const imageUrl = await CloudinaryService.uploadProductImage(req.file);

    res.status(200).json({
      success: true,
      message: 'Imagem de produto enviada com sucesso',
      imageUrl,
    });
  }
);
