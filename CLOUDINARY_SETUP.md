# Integração Cloudinary - Upload Base64

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

**Request:**
```bash
curl -X POST http://localhost:3000/api/upload/company \
  -H "Content-Type: application/json" \
  -d '{
    "imageBase64": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA..."
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Imagem de empresa enviada com sucesso",
  "imageUrl": "https://res.cloudinary.com/seu_cloud/image/upload/v1234567890/api-ecommerce/companies/abc123.png"
}
```

### Upload de Imagem de Produto

**Request:**
```bash
curl -X POST http://localhost:3000/api/upload/product \
  -H "Content-Type: application/json" \
  -d '{
    "imageBase64": "data:image/jpeg;base64,/9j/4AAQSkZJRgABA..."
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Imagem de produto enviada com sucesso",
  "imageUrl": "https://res.cloudinary.com/seu_cloud/image/upload/v1234567890/api-ecommerce/products/xyz789.jpg"
}
```

## 📝 Exemplos de Código

### JavaScript/TypeScript - Converter imagem para Base64

```javascript
// Ler arquivo e converter para base64
function convertImageToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result); // Inclui "data:image/...;base64,"
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

// Fazer upload de empresa
async function uploadCompanyImage(file) {
  const imageBase64 = await convertImageToBase64(file);
  
  const response = await fetch('/api/upload/company', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      imageBase64,
    }),
  });

  const data = await response.json();
  return data.imageUrl;
}

// Fazer upload de produto
async function uploadProductImage(file) {
  const imageBase64 = await convertImageToBase64(file);
  
  const response = await fetch('/api/upload/product', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      imageBase64,
    }),
  });

  const data = await response.json();
  return data.imageUrl;
}

// Uso:
const file = document.getElementById('imageInput').files[0];
const imageUrl = await uploadCompanyImage(file);
console.log('URL da imagem:', imageUrl);
```

### React Hook para Upload

```typescript
import { useState } from 'react';

function ImageUploader() {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const imageBase64 = event.target?.result as string;
        
        const response = await fetch('/api/upload/company', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageBase64 }),
        });

        const data = await response.json();
        setImageUrl(data.imageUrl);
      };
      reader.readAsDataURL(file);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleImageChange} 
        disabled={loading}
      />
      {imageUrl && <img src={imageUrl} alt="Uploaded" />}
    </div>
  );
}
```

### Integração com Formulários de Cadastro

```typescript
// Exemplo ao criar uma empresa
async function createCompanyWithImage(companyData, imageFile) {
  const imageUrl = await uploadCompanyImage(imageFile);

  const response = await fetch('/api/companies', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...companyData,
      logoMarca: imageUrl, // URL retornada pelo upload
    }),
  });

  return response.json();
}

// Uso:
await createCompanyWithImage(
  {
    razaoSocial: 'Minha Empresa',
    nomeFantasia: 'Minha Marca',
    cpfCnpj: '12345678000190',
    // ... outros campos
  },
  imagemFile
);
```

## 📦 Limites Gratuitos do Cloudinary

- **Armazenamento**: 10 GB
- **Transferência**: 10 GB/mês
- **Transformações**: Ilimitadas
- **Tamanho máximo**: Sem limite prático para base64
- **Formatos suportados**: JPEG, PNG, WebP, GIF

## 🗂️ Estrutura de Pastas

As imagens são organizadas automaticamente:
- Imagens de empresas: `/api-ecommerce/companies/`
- Imagens de produtos: `/api-ecommerce/products/`

## 🛡️ Segurança

- ✅ URLs são seguras (https)
- ✅ Suporte a CDN global do Cloudinary
- ✅ Compressão automática de imagens
- ✅ Redimensionamento automático (máx 1000px)
- ✅ Validação de tipo de imagem

## 📚 Estrutura das Rotas

| Método | Rota | Body | Descrição |
|--------|------|------|-----------|
| POST | `/api/upload/company` | JSON | Upload empresa via base64 |
| POST | `/api/upload/product` | JSON | Upload produto via base64 |

## 🔄 Integração com Models

```typescript
// Company Model
export type Company = {
  id?: string;
  razaoSocial: string;
  nomeFantasia: string;
  logoMarca: string; // URL do Cloudinary
  cpfCnpj: string;
  // ... outros campos
};

// Product Model
export type Product = {
  id?: string;
  companyId: string;
  nome: string;
  descricao: string;
  preco: number;
  imagem: string; // URL do Cloudinary
  // ... outros campos
};
```

## ✅ Próximos Passos

1. ✅ Integração Cloudinary com upload base64
2. ✅ Rotas de upload criadas
3. ⏳ Integrar uploads nos CRUD de empresas
4. ⏳ Integrar uploads nos CRUD de produtos
5. ⏳ Adicionar validação de tamanho de imagem em base64

## 🐛 Troubleshooting

### Erro: "CLOUDINARY_CLOUD_NAME is undefined"
Certifique-se de que o arquivo `.env` está na raiz do projeto com as variáveis corretas.

### Erro: "Campo imageBase64 é obrigatório"
Verifique se está enviando o campo `imageBase64` no JSON com a string base64 completa.

### Erro: "Invalid base64 string"
A string base64 pode estar corrompida. Certifique-se de que:
- A string está completa
- Não contém quebras de linha
- Inclui o prefixo `data:image/...;base64,` ou apenas base64 puro

### Arquivo muito grande?
Se a string base64 ficar muito grande:
1. Comprima a imagem antes de converter
2. Use formato WebP em vez de PNG
3. Reduza a qualidade JPEG

## 📚 Referências

- [Documentação Cloudinary](https://cloudinary.com/documentation)
- [Node.js SDK Cloudinary](https://cloudinary.com/documentation/node_integration)
- [FileReader API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/FileReader)
- [Base64 Encoding - MDN](https://developer.mozilla.org/en-US/docs/Glossary/Base64)
