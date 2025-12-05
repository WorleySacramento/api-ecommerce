import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Validar configuração do Cloudinary
if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.error('❌ Erro: Credenciais do Cloudinary não configuradas no .env');
} else {
  console.log('✅ Cloudinary configurado com sucesso');
}

export class CloudinaryService {
  /**
   * Faz upload de uma imagem para o Cloudinary usando base64
   * @param base64String - String em base64 da imagem (com ou sem data URI)
   * @param folder - Pasta no Cloudinary onde a imagem será salva
   * @returns URL pública da imagem
   */
  private static async uploadBase64(
    base64String: string,
    folder: string = 'api-ecommerce'
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        // Validar se base64 não está vazio
        if (!base64String || base64String.trim().length === 0) {
          throw new Error('String base64 vazia ou inválida');
        }

        // Remove o prefixo data:image/...;base64, se existir
        const base64Data = base64String.includes('base64,')
          ? base64String.split('base64,')[1]
          : base64String;

        console.log(`📤 Iniciando upload para pasta: ${folder}`);

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
              console.error('❌ Erro no upload:', error);
              reject(new Error(`Erro ao fazer upload: ${error.message}`));
            } else {
              console.log('✅ Upload concluído com sucesso');
              console.log('📍 URL:', result!.secure_url);
              resolve(result!.secure_url);
            }
          }
        );

        // Converte base64 para buffer e faz upload
        uploadStream.end(Buffer.from(base64Data, 'base64'));
      } catch (error) {
        console.error('❌ Erro na validação:', error);
        reject(error);
      }
    });
  }

  /**
   * Faz upload de imagem de empresa via base64
   * @param base64String - String em base64 da imagem
   * @returns URL da imagem
   */
  static async uploadCompanyImage(base64String: string): Promise<string> {
    return this.uploadBase64(base64String, 'api-ecommerce/companies');
  }

  /**
   * Faz upload de imagem de produto via base64
   * @param base64String - String em base64 da imagem
   * @returns URL da imagem
   */
  static async uploadProductImage(base64String: string): Promise<string> {
    return this.uploadBase64(base64String, 'api-ecommerce/products');
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
