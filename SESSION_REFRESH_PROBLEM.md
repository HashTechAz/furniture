# Prompt – Başqa AI üçün (Claude və s.)

Aşağıdakı mətni kopyalayıb başqa AI-ə at:

---

Admin panelimdə JWT sessiya problemi var. Next.js 15 + ASP.NET Core backend istifadə edirəm.

**Problem:** ~15 dəqiqə sonra access token bitir. Məhsul əlavə/redaktə/silmə zamanı 401 alıram və "Sessiya bitdi" xətası gəlir. İstifadəçi məcburi çıxıb yenidən daxil olmalıdır.

**İstədiyim:** Access token bitməsinə 1–2 dəq qalmış refresh avtomatik işləməli. İstifadəçi heç vaxt atılmamalı, yalnız özü "Log Out" basanda çıxmalıdır.

**Backend API:** `POST https://furniture.hashtech.az/api/Account/refresh`
- Swagger: body boş, yalnız `Authorization: Bearer <accessToken>` header
- CURL işləyir: `curl -X POST ... -H 'Authorization: Bearer <token>' -d ''`
- Cavab: `{ accessToken, expiration }`

**Stack:** Next.js 15, localStorage (accessToken, refreshToken), cookies. Əsas fayllar: `src/lib/api-client.ts`, `src/lib/auth.ts`, `src/app/api/admin/login/route.ts`, `src/app/login/page.tsx`.

Token refresh mexanizmini düzgün implementasiya et: proaktiv refresh (bitməzdən 1–2 dəq əvvəl), 401-də refresh + retry. Brauzerdən birbaşa backend-ə CORS ola bilər – Next.js API route proxy kimi istifadə et.
