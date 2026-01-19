# 📸 SiteSnap AI

> **Organiza tus fotos de obra automáticamente. Evidencia GPS irrefutable.**

## 🎯 ¿Qué es SiteSnap AI?

SiteSnap AI es una Progressive Web App (PWA) diseñada para técnicos, instaladores y contratistas que necesitan documentar su trabajo con fotos.

**Modelo BYOS (Bring Your Own Storage):** Tus fotos se guardan directamente en TU Google Drive. Sin intermediarios. Sin secuestro de datos.

## ✨ Características

- 📸 **Captura con Watermark GPS** - Coordenadas, fecha y hora grabados permanentemente
- 📁 **Organización Automática** - Fotos clasificadas por proyecto/cliente
- ☁️ **BYOS** - Sync directo a tu Google Drive
- 🤖 **IA Naming** - GPT-4o nombra tus archivos automáticamente
- 📱 **PWA** - Funciona offline e instalable como app
- 💳 **Planes Flexibles** - Gratis, Pro (9€), Team (29€)

## 🛠️ Stack Tecnológico

- **Frontend:** Next.js 14 (App Router) + TypeScript + Tailwind
- **Auth:** Supabase Auth (Google OAuth + Email)
- **Database:** Supabase PostgreSQL
- **Storage:** Google Drive API (BYOS)
- **Payments:** Stripe (Checkout + Billing Portal)
- **AI:** OpenAI GPT-4o Vision
- **Hosting:** Vercel

## 📁 Estructura

```
SiteSnapAI/
├── landing/          # Landing page (marketing)
├── app/              # PWA principal
└── supabase/         # Database schema
```

## 🚀 Despliegue Rápido

### 1. Clonar y configurar

```bash
git clone https://github.com/tu-usuario/SiteSnapAI.git
cd SiteSnapAI/app
cp .env.example .env.local
# Editar .env.local con tus claves
```

### 2. Variables de entorno requeridas

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_PRO=
STRIPE_PRICE_TEAM=

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# OpenAI
OPENAI_API_KEY=

# App
NEXT_PUBLIC_APP_URL=https://app.sitesnap.ai
```

### 3. Configurar Supabase

1. Crear proyecto en [supabase.com](https://supabase.com)
2. Ejecutar `supabase/schema.sql` en el SQL Editor
3. Habilitar Google OAuth en Authentication > Providers
4. Copiar URL y keys

### 4. Configurar Google Cloud

1. Crear proyecto en [Google Cloud Console](https://console.cloud.google.com)
2. Habilitar Google Drive API
3. Crear OAuth 2.0 credentials
4. Añadir redirect URI: `https://tu-dominio.com/api/google/callback`

### 5. Desplegar en Vercel

```bash
vercel deploy --prod
```

## 💰 Modelo de Precios

| Plan | Precio | Límites |
|------|--------|---------|
| **Free** | 0€ | 3 proyectos, 50 fotos/mes |
| **Pro** | 9€/mes | Ilimitado, IA naming |
| **Team** | 29€/mes | 5 usuarios, dashboard |

## 📄 Licencia

Propietario. © 2026 SiteSnap AI.
