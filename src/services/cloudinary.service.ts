import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export class CloudinaryService {
  /**
   * Faz upload de uma imagem para o Cloudinary
   * @param file - Arquivo enviado pelo multer
   * @param folder - Pasta no Cloudinary onde a imagem será salva
   * @returns URL pública da imagem
   */
  static async uploadImage(
    file: Express.Multer.File,
    folder: string = 'api-ecommerce'
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: 'auto',
          quality: 'auto',
          width: 1000,
          crop: 'limit',
        },
        (error, result) => {
          if (error) {
            reject(new Error(`Erro ao fazer upload: ${error.message}`));
          } else {
            resolve(result!.secure_url);
          }
        }
      );

      uploadStream.end(file.buffer);
    });
  }

  /**
   * Faz upload de imagem de empresa
   * @param file - Arquivo enviado
   * @returns URL da imagem
   */
  static async uploadCompanyImage(file: Express.Multer.File): Promise<string> {
    return this.uploadImage(file, 'api-ecommerce/companies');
  }

  /**
   * Faz upload de imagem de produto
   * @param file - Arquivo enviado
   * @returns URL da imagem
   */
  static async uploadProductImage(file: Express.Multer.File): Promise<string> {
    return this.uploadImage(file, 'api-ecommerce/products');
  }

  /**
   * Deleta uma imagem do Cloudinary usando a URL pública
   * @param imageUrl - URL pública da imagem
   */
  static async deleteImage(imageUrl: string): Promise<void> {
    try {
      // Extrai o public_id da URL
      const publicId = imageUrl.split('/').pop()?.split('.')[0];
      if (!publicId) {
        throw new Error('URL inválida');
      }

      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      console.error('Erro ao deletar imagem:', error);
    }
  }
}
