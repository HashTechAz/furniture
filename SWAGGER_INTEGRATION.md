# Swagger API İnteqrasiyası

Bu sənəd Swagger/OpenAPI spesifikasiyasından TypeScript API client yaratmaq üçün istifadə olunur.

## 📋 Tələblər

- Node.js və npm quraşdırılmış olmalıdır
- Swagger/OpenAPI spesifikasiyası (JSON və ya YAML formatında)

## 🚀 İstifadə

### 1. Swagger spesifikasiyasını paylaşın

Swagger spesifikasiyasını aşağıdakı üsullardan biri ilə paylaşa bilərsiniz:

#### Variant A: URL-dən (Swagger UI)
```bash
npm run generate-api https://api.example.com/swagger/v1/swagger.json
```

#### Variant B: Lokal fayl
```bash
npm run generate-api ./swagger.json
```

#### Variant C: Environment variable
```bash
# .env.local faylında:
SWAGGER_URL=https://api.example.com/swagger/v1/swagger.json

# Sonra:
npm run generate-api
```

### 2. Generated API client-i yoxlayın

Generator işlədikdən sonra aşağıdakı struktura baxın:

```
src/lib/generated-api/
├── core/
│   ├── OpenAPI.ts          # OpenAPI konfiqurasiyası
│   └── request.ts          # Request helper
├── services/
│   ├── ProductsService.ts  # Products API funksiyaları
│   ├── AccountService.ts   # Auth API funksiyaları
│   └── ...                 # Digər servislər
├── models/
│   ├── Product.ts          # Product modeli
│   └── ...                 # Digər modellər
└── index.ts                # Export faylı
```

### 3. Generated API-ni istifadə edin

#### Nümunə 1: Generated servisləri birbaşa istifadə

```typescript
// src/app/products/page.tsx
import { ProductsService } from '@/lib/generated-api';

export default async function ProductsPage() {
  const products = await ProductsService.getProducts();
  return <div>{/* ... */}</div>;
}
```

#### Nümunə 2: Mövcud apiRequest ilə inteqrasiya

```typescript
// src/lib/api/products-generated.ts
import { apiRequest } from './api-client';
import type { Product } from './generated-api';

export async function getProductsGenerated(): Promise<Product[]> {
  // Generated tipləri istifadə edərək mövcud apiRequest ilə çağırırıq
  return apiRequest<Product[]>('/api/Products');
}
```

### 4. Authentication ilə istifadə

Generated API client authentication üçün token istifadə edir:

```typescript
import { ProductsService } from '@/lib/generated-api';
import { getToken } from '@/lib/auth';

const token = getToken(); // localStorage-dən token alın
ProductsService.setSecurityData({ token });

const products = await ProductsService.getProducts();
```

## 🔧 Konfiqurasiya

Generator konfiqurasiyasını `scripts/generate-api.ts` faylında dəyişə bilərsiniz:

- `httpClient`: 'fetch' və ya 'axios'
- `useOptions`: true/false
- `useUnionTypes`: true/false
- `exportCore`, `exportServices`, `exportModels`: true/false

## 📝 Qeydlər

1. **Mövcud API funksiyaları**: Generated API mövcud `api-client.ts` ilə uyğunlaşdırıla bilər
2. **Type Safety**: Bütün API çağırışları TypeScript tipləri ilə qorunur
3. **Auto-complete**: IDE-də avtomatik tamamlama işləyir
4. **Update**: Swagger dəyişdikdə `npm run generate-api` işlədin

## 🐛 Problemlər

### Problem: "Swagger URL və ya fayl yolu təyin edilməyib"
**Həll**: Swagger URL və ya fayl yolunu parametr kimi verin:
```bash
npm run generate-api https://your-api.com/swagger.json
```

### Problem: "Network error" və ya "File not found"
**Həll**: 
- URL-nin düzgün olduğunu yoxlayın
- Lokal fayl üçün fayl yolunun düzgün olduğunu yoxlayın
- CORS problemi ola bilər (Swagger JSON-u yükləyib lokal fayl kimi istifadə edin)

### Problem: Generated kodda xətalar
**Həll**: 
- Swagger spesifikasiyasının düzgün olduğunu yoxlayın
- `src/lib/generated-api/` klasörünü silib yenidən generate edin

## 📚 Əlavə məlumat

- [openapi-typescript-codegen dokumentasiyası](https://github.com/ferdikoomen/openapi-typescript-codegen)
- [OpenAPI spesifikasiyası](https://swagger.io/specification/)
