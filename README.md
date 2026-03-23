# Wedding Invitation System - Viely & Tony

Sistema de invitaciones digitales para bodas con panel de administración.

## 🚀 Inicio Rápido

### 1. Instalación
```bash
npm install
```

### 2. Configurar Variables de Entorno
Crea un archivo `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_de_supabase
```

### 3. Configurar Supabase
Sigue la guía completa en [SUPABASE_CONFIG.md](./SUPABASE_CONFIG.md)

### 4. Iniciar el Servidor
```bash
npm run dev
```

Visita:
- Invitaciones: `http://localhost:3000/invitacion/[codigo]`
- Panel Admin: `http://localhost:3000/admin/login`

## 🌍 Publicar y Compartir Invitaciones

### Opción Recomendada: Vercel

1. Sube el proyecto a GitHub.
2. En [Vercel](https://vercel.com), crea un proyecto e importa el repositorio.
3. En **Settings > Environment Variables** agrega:
	- `NEXT_PUBLIC_SUPABASE_URL`
	- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Ejecuta el deploy.
5. Usa el dominio generado por Vercel (ejemplo: `https://tu-proyecto.vercel.app`).

Los links públicos para compartir quedarán así:

```text
https://tu-proyecto.vercel.app/invitacion/CODIGO
```

> Nota: En Supabase debes agregar tu dominio de producción en **Authentication > URL Configuration**.

## 📁 Estructura del Proyecto

```
app/
├── admin/                    # Panel de administración
│   ├── login/               # Login con magic link
│   ├── components/          # Componentes del admin
│   │   ├── StatsCards.tsx   # Tarjetas de estadísticas
│   │   ├── InvitationsList.tsx  # Lista de invitaciones
│   │   └── RSVPsList.tsx    # Lista de RSVPs
│   ├── layout.tsx           # Layout del admin
│   └── page.tsx             # Dashboard principal
├── invitation/[code]/       # Invitaciones personalizadas
├── components/              # Componentes compartidos
├── lib/                     # Utilidades
│   ├── supabase.ts         # Cliente Supabase (legacy)
│   ├── supabase-client.ts  # Cliente para componentes
│   ├── supabase-server.ts  # Cliente para server components
│   └── supabase-middleware.ts  # Middleware de auth
└── middleware.ts            # Middleware global de Next.js
```

## 🔐 Autenticación

El sistema usa **Supabase Auth** con **Email & Password**:
- Login clásico con email y contraseña
- Sesiones manejadas automáticamente con cookies
- Rutas protegidas con middleware
- Logout funcional

## 📊 Base de Datos

### Tabla: `invitations`
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | uuid | ID único |
| code | text | Código único de invitación |
| guest_name | text | Nombre del invitado |
| type | text | Tipo: individual/pareja/familia |
| max_guests | int4 | Máximo de invitados permitidos |
| estimated_guests | int4 | Estimación de asistentes |
| created_at | timestamp | Fecha de creación |

### Tabla: `rsvps`
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | uuid | ID único |
| invitation_id | uuid | Referencia a invitación |
| confirmed_guests | int4 | Número de invitados confirmados |
| attending | bool | Si asisten o no |
| created_at | timestamp | Fecha de confirmación |

## 🎨 Características

### Panel Admin
- ✅ Dashboard con estadísticas en tiempo real
- ✅ Gestión de invitaciones (crear, eliminar, copiar links)
- ✅ Seguimiento de RSVPs
- ✅ Filtros y búsqueda
- ✅ Autenticación con magic link

### Sistema de Invitaciones
- ✅ URLs únicas por invitado
- ✅ Formulario de confirmación (RSVP)
- ✅ Contador de días hasta la boda
- ✅ Diseño responsive y elegante

## 🛠️ Tecnologías

- **Framework:** Next.js 16 (App Router)
- **Autenticación:** Supabase Auth
- **Base de Datos:** Supabase (PostgreSQL)
- **Estilos:** Tailwind CSS 4
- **Lenguaje:** TypeScript
- **Fuentes:** Playfair Display, Lato

## 📝 Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build para producción
npm run start    # Servidor de producción
npm run lint     # Linter
```

## 🔒 Seguridad

- Row Level Security (RLS) habilitado
- Políticas de acceso configuradas
- Rutas admin protegidas con middleware
- Autenticación sin contraseñas

## 📖 Guías

- [Configuración de Supabase](./SUPABASE_CONFIG.md) - Guía completa de setup

## 🎯 Próximas Mejoras

- [ ] Export de lista de invitados (CSV/Excel)
- [ ] Envío masivo de invitaciones por email
- [ ] Gráficas de confirmaciones
- [ ] Mensajes personalizados por invitación
- [ ] Sistema de mesas/asignación

## 📄 Licencia

Proyecto privado - Viely & Tony Wedding

