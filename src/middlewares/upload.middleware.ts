import multer from 'multer';
import { ValidationError } from '../errors/validation.error';

// Configuração do multer para armazenar em memória
const storage = multer.memoryStorage();

// Filtro para aceitar apenas imagens
const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new ValidationError(
        'Apenas arquivos de imagem são permitidos (JPEG, PNG, WebP, GIF)'
      )
    );
  }
};

// Configuração do multer
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB máximo
  },
});

// Middleware para upload de imagem única
export const uploadSingleImage = upload.single('image');

// Middleware para upload de múltiplas imagens
export const uploadMultipleImages = upload.array('images', 10);
