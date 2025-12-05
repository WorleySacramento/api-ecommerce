# Integração Cloudinary - Guia de Configuração

## 📋 Pré-requisitos

1. Criar uma conta gratuita em [Cloudinary](https://cloudinary.com/)
2. Obter as credenciais: `CLOUD_NAME`, `API_KEY` e `API_SECRET`

## 🔧 Configuração

### 1. Crie um arquivo `.env` na raiz do projeto

```env
CLOUDINARY_CLOUD_NAME=seu_cloud_name
CLOUDINARY_API_KEY=sua_api_key
CLOUDINARY_API_SECRET=seu_api_secret
```

### 2. Credenciais no Cloudinary

1. Acesse [Dashboard do Cloudinary](https://cloudinary.com/console)
2. Na seção "Account Details", você encontrará:
   - **Cloud Name** (visível no topo)
   - **API Key** (em "API Credentials")
   - **API Secret** (em "API Credentials")

## 📤 Como Usar

### Upload de Imagem de Empresa

```bash
curl -X POST http://localhost:3000/api/upload/company \
  -F "image=@/caminho/para/logo.png"
```

**Resposta:**
```json
{
  "success": true,
  "message": "Imagem de empresa enviada com sucesso",
  "imageUrl": "https://res.cloudinary.com/seu_cloud/image/upload/v1234567890/api-ecommerce/companies/abc123.png"
}
```

### Upload de Imagem de Produto

```bash
curl -X POST http://localhost:3000/api/upload/product \
  -F "image=@/caminho/para/produto.jpg"
```

**Resposta:**
```json
{
  "success": true,
  "message": "Imagem de produto enviada com sucesso",
  "imageUrl": "https://res.cloudinary.com/seu_cloud/image/upload/v1234567890/api-ecommerce/products/xyz789.jpg"
}
```

## 📦 Limites Gratuitos do Cloudinary

- **Armazenamento**: 10 GB
- **Transferência**: 10 GB/mês
- **Transformações**: Ilimitadas
- **Tamanho máximo de arquivo**: 5 MB (configurado em `upload.middleware.ts`)
- **Formatos suportados**: JPEG, PNG, WebP, GIF

## 🗂️ Estrutura de Pastas

As imagens são organizadas automaticamente:
- Imagens de empresas: `/api-ecommerce/companies/`
- Imagens de produtos: `/api-ecommerce/products/`

## 🛡️ Segurança

- As imagens são otimizadas automaticamente
- URLs são seguras (https)
- Suporte a CDN global do Cloudinary
- Compressão automática de imagens

## 📝 Exemplos de Uso com JavaScript

### Fazer upload de empresa

```javascript
const formData = new FormData();
formData.append('image', fileInput.files[0]);

const response = await fetch('/api/upload/company', {
  method: 'POST',
  body: formData
});

const data = await response.json();
console.log('URL da imagem:', data.imageUrl);
```

### Fazer upload de produto

```javascript
const formData = new FormData();
formData.append('image', fileInput.files[0]);

const response = await fetch('/api/upload/product', {
  method: 'POST',
  body: formData
});

const data = await response.json();
console.log('URL da imagem:', data.imageUrl);
```

## 🔄 Integração com Models

Após o upload, salve a URL retornada nos seus models:

```typescript
// Exemplo para Company
const company = {
  razaoSocial: 'Minha Empresa',
  nomeFantasia: 'Minha Marca',
  logoMarca: imageUrl, // URL retornada pelo upload
  // ... outros campos
};

// Exemplo para Product
const product = {
  nome: 'Meu Produto',
  descricao: 'Descrição',
  preco: 99.99,
  imagem: imageUrl, // URL retornada pelo upload
  // ... outros campos
};
```

## ✅ Próximos Passos

1. ✅ Dependências instaladas (cloudinary, multer)
2. ✅ Serviço CloudinaryService criado
3. ✅ Middlewares de upload configurados
4. ✅ Routes de upload criadas
5. ⏳ Criar endpoints CRUD para Companies com upload
6. ⏳ Criar endpoints CRUD para Products com upload
7. ⏳ Integrar validação de imagem com Joi

## 🐛 Troubleshooting

### Erro: "Cannot find module 'cloudinary'"
```bash
npm install cloudinary multer @types/multer
```

### Erro: "CLOUDINARY_CLOUD_NAME is undefined"
Certifique-se de que o arquivo `.env` está na raiz do projeto e possui as variáveis corretas.

### Erro ao fazer upload: "File too large"
O limite máximo é 5 MB. Reduza o tamanho da imagem.

### Erro: "Only image files are allowed"
Use apenas formatos: JPEG, PNG, WebP ou GIF.

## 📚 Referências

- [Documentação Cloudinary](https://cloudinary.com/documentation)
- [Node.js SDK Cloudinary](https://cloudinary.com/documentation/node_integration)
- [Multer Documentation](https://github.com/expressjs/multer)
