import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { CloudinaryService } from '../services/cloudinary.service';
import { ValidationError } from '../errors/validation.error';

/**
 * Upload de imagem de empresa via base64
 * POST /api/upload/company
 */
export const uploadCompanyImage = asyncHandler(
  async (req: Request, res: Response) => {
    console.log('📨 Requisição recebida para upload de empresa');
    const { imageBase64 } = req.body;

    if (!imageBase64) {
      console.error('❌ Campo imageBase64 não foi fornecido');
      throw new ValidationError('Campo imageBase64 é obrigatório');
    }

    if (typeof imageBase64 !== 'string') {
      console.error('❌ imageBase64 não é uma string');
      throw new ValidationError('imageBase64 deve ser uma string');
    }

    if (imageBase64.trim().length === 0) {
      console.error('❌ imageBase64 está vazio');
      throw new ValidationError('imageBase64 não pode estar vazio');
    }

    console.log(`📦 Base64 recebido (tamanho: ${imageBase64.length} caracteres)`);

    try {
      const imageUrl = await CloudinaryService.uploadCompanyImage(imageBase64);

      res.status(200).json({
        success: true,
        message: 'Imagem de empresa enviada com sucesso',
        imageUrl,
      });
    } catch (error) {
      console.error('❌ Erro durante upload:', error);
      throw error;
    }
  }
);

/**
 * Upload de imagem de produto via base64
 * POST /api/upload/product
 */
export const uploadProductImage = asyncHandler(
  async (req: Request, res: Response) => {
    console.log('📨 Requisição recebida para upload de produto');
    const { imageBase64 } = req.body;

    if (!imageBase64) {
      console.error('❌ Campo imageBase64 não foi fornecido');
      throw new ValidationError('Campo imageBase64 é obrigatório');
    }

    if (typeof imageBase64 !== 'string') {
      console.error('❌ imageBase64 não é uma string');
      throw new ValidationError('imageBase64 deve ser uma string');
    }

    if (imageBase64.trim().length === 0) {
      console.error('❌ imageBase64 está vazio');
      throw new ValidationError('imageBase64 não pode estar vazio');
    }

    console.log(`📦 Base64 recebido (tamanho: ${imageBase64.length} caracteres)`);

    try {
      const imageUrl = await CloudinaryService.uploadProductImage(imageBase64);

      res.status(200).json({
        success: true,
        message: 'Imagem de produto enviada com sucesso',
        imageUrl,
      });
    } catch (error) {
      console.error('❌ Erro durante upload:', error);
      throw error;
    }
  }
);
