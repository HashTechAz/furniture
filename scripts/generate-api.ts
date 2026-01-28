// scripts/generate-api.ts
// Swagger/OpenAPI spesifikasiyasından TypeScript API client yaradır

import { generate } from 'openapi-typescript-codegen';
import * as path from 'path';
import * as fs from 'fs';

const SWAGGER_URL_OR_PATH = process.env.SWAGGER_URL || process.argv[2];
const OUTPUT_DIR = path.join(process.cwd(), 'src/lib/generated-api');

if (!SWAGGER_URL_OR_PATH) {
  console.error('❌ Swagger URL və ya fayl yolu təyin edilməyib!');
  console.log('İstifadə: npm run generate-api <swagger-url-or-path>');
  console.log('Və ya: SWAGGER_URL=https://api.example.com/swagger/v1/swagger.json npm run generate-api');
  process.exit(1);
}

async function generateApiClient() {
  try {
    console.log('📡 Swagger spesifikasiyası yüklənir...');
    console.log(`📍 Mənbə: ${SWAGGER_URL_OR_PATH}`);
    
    // Output qovluğunu təmizlə
    if (fs.existsSync(OUTPUT_DIR)) {
      console.log('🧹 Köhnə generated API faylları silinir...');
      fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
    }

    await generate({
      input: SWAGGER_URL_OR_PATH,
      output: OUTPUT_DIR,
      httpClient: 'fetch',
      useOptions: true,
      useUnionTypes: true,
      exportCore: true,
      exportServices: true,
      exportModels: true,
      exportSchemas: false,
      clientName: 'ApiClient',
    });

    console.log('✅ API client uğurla yaradıldı!');
    console.log(`📁 Output: ${OUTPUT_DIR}`);
    console.log('\n📝 Növbəti addımlar:');
    console.log('1. src/lib/generated-api klasörünə baxın');
    console.log('2. Mövcud api-client.ts ilə inteqrasiya edin');
    console.log('3. Generated funksiyaları komponentlərdə istifadə edin');
  } catch (error: any) {
    console.error('❌ Xəta:', error.message);
    process.exit(1);
  }
}

generateApiClient();
