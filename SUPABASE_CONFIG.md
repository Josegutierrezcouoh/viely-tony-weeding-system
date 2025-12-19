# 🔐 Configuración de Supabase - Guía Completa

Esta guía te ayudará a configurar la autenticación y las políticas de seguridad en Supabase para tu aplicación de wedding.

## 📋 Paso 1: Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_de_supabase
```

Para obtener estas credenciales:
1. Ve a tu proyecto en [Supabase](https://supabase.com)
2. Menú lateral > Project Settings > API
3. Copia "Project URL" y "anon/public key"

---

## 🔑 Paso 2: Configurar Authentication (Email & Password)

### 2.1 Habilitar Email Auth
1. En Supabase Dashboard: **Authentication > Providers**
2. Habilita **Email** provider
3. Desactiva "Confirm email" (opcional, para desarrollo más rápido)

### 2.2 Configurar Site URL
1. Ve a **Authentication > URL Configuration**
2. En "Site URL" agrega: `http://localhost:3000` (desarrollo)

### 2.3 Crear Usuario Admin Inicial

**Opción A - Desde el Dashboard (Recomendado):**
1. Ve a **Authentication > Users**
2. Click en "Add user" > "Create new user"
3. Ingresa el email que usarás como admin
4. Ingresa una contraseña segura
5. Selecciona "Auto Confirm User"
6. Click en "Create user"

**Opción B - Desde SQL Editor:**
```sql
-- Insertar un usuario admin manualmente
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  invited_at,
  confirmation_token,
  confirmation_sent_at,
  recovery_token,
  recovery_sent_at,
  email_change_token_new,
  email_change,
  email_change_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  created_at,
  updated_at,
  phone,
  phone_confirmed_at,
  phone_change,
  phone_change_token,
  phone_change_sent_at,
  email_change_token_current,
  email_change_confirm_status,
  banned_until,
  reauthentication_token,
  reauthentication_sent_at,
  is_sso_user,
  deleted_at
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'tu-email@example.com', -- CAMBIA ESTO
  crypt('temporal123', gen_salt('bf')), -- Password temporal
  NOW(),
  NULL,
  '',
  NULL,
  '',
  NULL,
  '',
  '',
  NULL,
  NULL,
  '{"provider":"email","providers":["email"]}',
  '{}',
  FALSE,
  NOW(),
  NOW(),
  NULL,
  NULL,
  '',
  '',
  NULL,
  '',
  0,
  NULL,
  '',
  NULL,
  FALSE,
  NULL
);
```

---

## 🔒 Paso 3: Configurar Row Level Security (RLS)

### 3.1 Habilitar RLS en las Tablas
```sql
-- Habilitar RLS en todas las tablas
ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;
```

### 3.2 Políticas para la Tabla `invitations`

```sql
-- Política 1: Usuarios autenticados pueden ver todas las invitaciones
CREATE POLICY "Admins can view all invitations"
ON invitations FOR SELECT
TO authenticated
USING (true);

-- Política 2: Usuarios autenticados pueden insertar invitaciones
CREATE POLICY "Admins can insert invitations"
ON invitations FOR INSERT
TO authenticated
WITH CHECK (true);

-- Política 3: Usuarios autenticados pueden actualizar invitaciones
CREATE POLICY "Admins can update invitations"
ON invitations FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Política 4: Usuarios autenticados pueden eliminar invitaciones
CREATE POLICY "Admins can delete invitations"
ON invitations FOR DELETE
TO authenticated
USING (true);

-- Política 5: Usuarios anónimos pueden ver su propia invitación (por código)
CREATE POLICY "Anyone can view invitation by code"
ON invitations FOR SELECT
TO anon
USING (true);
```

### 3.3 Políticas para la Tabla `rsvps`

```sql
-- Política 1: Usuarios autenticados pueden ver todos los RSVPs
CREATE POLICY "Admins can view all rsvps"
ON rsvps FOR SELECT
TO authenticated
USING (true);

-- Política 2: Usuarios autenticados pueden actualizar RSVPs
CREATE POLICY "Admins can update rsvps"
ON rsvps FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Política 3: Usuarios autenticados pueden eliminar RSVPs
CREATE POLICY "Admins can delete rsvps"
ON rsvps FOR DELETE
TO authenticated
USING (true);

-- Política 4: Usuarios anónimos pueden crear RSVPs
CREATE POLICY "Anyone can create rsvp"
ON rsvps FOR INSERT
TO anon
WITH CHECK (true);

-- Política 5: Usuarios anónimos pueden ver RSVPs
CREATE POLICY "Anyone can view rsvps"
ON rsvps FOR SELECT
TO anon
USING (true);
```

### 3.4 Verificar Políticas
```sql
-- Ver todas las políticas de una tabla
SELECT * FROM pg_policies WHERE tablename = 'invitations';
SELECT * FROM pg_policies WHERE tablename = 'rsvps';
```

---

## 🧪 Paso 4: Probar la Configuración

### 4.1 Probar Login
1. Inicia el servidor: `npm run dev`
2. Ve a `http://localhost:3000/admin/login`
3. Ingresa tu email y contraseña de admin
4. Haz click en "Iniciar Sesión"
5. Deberías ser redirigido a `/admin`

### 4.2 Probar Autenticación
```typescript
// En la consola del navegador (página /admin)
const supabase = createClient()
const { data } = await supabase.auth.getSession()
console.log(data.session?.user) // Debería mostrar tu usuario
```

### 4.3 Probar Acceso a Datos
```typescript
// Probar que puedes leer invitaciones
const { data, error } = await supabase.from('invitations').select('*')
console.log(data, error)
```

---

## 🚨 Solución de Problemas Comunes

### Error: "Invalid API key"
- Verifica que las variables de entorno estén correctas
- Reinicia el servidor de desarrollo

### Error: "Invalid login credentials"
- Verifica que el email y contraseña sean correctos
- Asegúrate de que el usuario esté confirmado en Supabase
- Verifica que el usuario exista en Authentication > Users

### Error: "Email not confirmed"
- En Supabase: Authentication > Settings
- Desactiva "Enable email confirmations"
- O marca "Auto Confirm User" al crear el usuario

### Error: "Row Level Security policy violation"
- Verifica que RLS esté habilitado
- Verifica que las políticas estén creadas correctamente
- Usa el SQL Editor para ejecutar las consultas de políticas

### No puedo acceder a `/admin` después del login
- Verifica que el middleware esté configurado correctamente
- Revisa la consola del navegador para errores
- Verifica que las cookies estén habilitadas

---

## 📊 Verificación Final

Ejecuta estos checks para asegurar que todo está configurado:

- [ ] Variables de entorno configuradas en `.env.local`
- [ ] Email provider habilitado en Supabase Auth
- [ ] Usuario admin creado con contraseña
- [ ] RLS habilitado en ambas tablas
- [ ] Políticas creadas para `invitations`
- [ ] Políticas creadas para `rsvps`
- [ ] Login funciona correctamente con email y contraseña
- [ ] Puedes acceder a `/admin` después del login
- [ ] Puedes ver y crear invitaciones
- [ ] Puedes ver RSVPs

---

## 🎯 Próximos Pasos Opcionales

### Agregar Reset de Contraseña
1. Configura email templates en Supabase
2. Implementa funcionalidad de "Olvidé mi contraseña"
3. Usa `supabase.auth.resetPasswordForEmail()`

### Configurar Dominios Personalizados
1. Configura tu dominio en Supabase
2. Actualiza las URLs de redirección
3. Agrega tu dominio a "Site URL"

### Agregar Más Usuarios Admin
- Repite el proceso de creación de usuario
- O permite auto-registro y gestiona permisos con custom claims

---

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs en Supabase: Database > Logs
2. Revisa la consola del navegador
3. Verifica la documentación oficial: https://supabase.com/docs/guides/auth
