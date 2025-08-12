# GymControl - Sistema de Gestión de Gimnasio

> Sistema integral de gestión para gimnasios desarrollado con Next.js, Tailwind CSS, Framer Motion y Prisma.

## 🚀 Características

- **Dashboard administrativo** con KPIs en tiempo real
- **Gestión de usuarios** con CRUD completo
- **Planes de membresía** personalizables
- **Caja administrativa** con reportes financieros
- **Animaciones fluidas** con Framer Motion
- **Tema oscuro** elegante y moderno
- **Base de datos** robusta con PostgreSQL y Prisma
- **Autenticación** con NextAuth.js
- **Responsive design** optimizado para todos los dispositivos

## 🛠 Stack Tecnológico

- **Frontend**: Next.js 13+ (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, Tema oscuro personalizado
- **Animaciones**: Framer Motion
- **Base de datos**: PostgreSQL con Prisma ORM
- **Autenticación**: NextAuth.js
- **Testing**: Jest + React Testing Library
- **Linting**: ESLint + Prettier

## 📋 Requisitos Previos

- Node.js 18+ 
- PostgreSQL 13+
- npm o yarn

## ⚡ Instalación Rápida

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd gym-control
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env.local
```

Edita `.env.local` con tus credenciales:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/gymcontrol"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Opcional: Stripe para pagos
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

4. **Configurar la base de datos**
```bash
# Ejecutar migraciones
npm run prisma:migrate

# Poblar con datos de prueba
npm run prisma:seed
```

5. **Iniciar el servidor de desarrollo**
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Iniciar servidor de desarrollo
npm run build        # Construir para producción  
npm run start        # Iniciar servidor de producción

# Base de datos
npm run prisma:migrate    # Ejecutar migraciones
npm run prisma:seed      # Poblar con datos de prueba
npm run prisma:studio    # Abrir Prisma Studio
npm run prisma:generate  # Generar cliente de Prisma

# Calidad de código
npm run lint        # Ejecutar ESLint
npm run test        # Ejecutar tests
npm run test:watch  # Ejecutar tests en modo watch
```

## 🔐 Credenciales de Prueba

Después de ejecutar `npm run prisma:seed`, tendrás acceso con:

| Rol | Email | Contraseña |
|-----|-------|------------|
| Admin | admin@gymcontrol.com | admin123 |
| Staff | staff@gymcontrol.com | staff123 |
| Usuario | user1@gmail.com | user123 |

## 🏗 Arquitectura del Proyecto

```
gym-control/
├── app/                    # App Router de Next.js
│   ├── (auth)/            # Rutas de autenticación
│   ├── dashboard/         # Panel administrativo
│   ├── api/              # API Routes
│   └── globals.css       # Estilos globales
├── components/            # Componentes React
│   ├── ui/               # Componentes base (Button, Card, etc.)
│   └── layout/           # Componentes de layout
├── lib/                  # Utilidades y configuración
│   ├── prisma.ts         # Cliente de Prisma
│   └── auth.ts           # Configuración de NextAuth
├── prisma/               # Esquema y migraciones
│   ├── schema.prisma     # Esquema de base de datos
│   └── seed.ts           # Datos de prueba
├── services/             # Lógica de negocio
│   ├── usersService.ts   # Gestión de usuarios
│   ├── plansService.ts   # Gestión de planes
│   └── cashboxService.ts # Gestión financiera
├── styles/               # Configuración de estilos
│   └── theme.tokens.ts   # Tokens de diseño
└── tests/               # Tests unitarios
```

## 🎨 Sistema de Diseño

### Paleta de Colores (Tema Oscuro)
- **Background**: `#0b0f14`
- **Surface**: `#0f1720` 
- **Primary**: `#7c5cff`
- **Secondary**: `#00b894`
- **Text Primary**: `#e6eef8`
- **Text Secondary**: `#98a0b3`

### Componentes UI
- **Button**: Múltiples variantes (primary, secondary, ghost, danger)
- **Card**: Con efectos hover y animaciones
- **Table**: Responsive con paginación
- **Modal**: Con animaciones de entrada/salida
- **KPI**: Tarjetas con contadores animados

## 🔒 Seguridad

- **Autenticación**: Basada en JWT con NextAuth.js
- **Autorización**: Control de acceso por roles (ADMIN, STAFF, USER)
- **Validación**: Esquemas Zod para validación de datos
- **CSRF Protection**: Tokens CSRF en formularios
- **Rate Limiting**: Límite de peticiones por IP (recomendado en producción)

## 📊 Funcionalidades Principales

### Dashboard
- KPIs en tiempo real (ingresos, check-ins, suscripciones)
- Gráficos de tendencias
- Actividad reciente
- Próximos vencimientos

### Gestión de Usuarios
- CRUD completo de usuarios
- Búsqueda y filtros avanzados
- Historial de pagos y check-ins
- Estados de membresía

### Planes de Membresía  
- Gestión de planes y precios
- Características personalizables
- Estadísticas de suscripciones
- Ingresos por plan

### Caja Administrativa
- Transacciones diarias
- Reportes financieros
- Cierre de caja automático
- Exportación de datos

## 🧪 Testing

```bash
# Ejecutar todos los tests
npm run test

# Tests en modo watch
npm run test:watch

# Coverage
npm run test:coverage
```

### Estructura de Tests
- **Componentes**: Tests unitarios para componentes UI
- **Servicios**: Tests de lógica de negocio
- **API**: Tests de integración para endpoints
- **E2E**: Tests end-to-end con Playwright (opcional)

## 🚀 Despliegue

### Vercel (Recomendado)
1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno
3. El despliegue es automático en cada push

### Docker
```bash
# Construir imagen
docker build -t gym-control .

# Ejecutar contenedor
docker run -p 3000:3000 gym-control
```

### Variables de Entorno para Producción
```env
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="https://tu-dominio.com"
NEXTAUTH_SECRET="production-secret"
```

## 📈 Próximas Características

- [ ] **Integración con Stripe** para pagos
- [ ] **Sistema de notificaciones** push
- [ ] **App móvil** con React Native
- [ ] **Reportes avanzados** con gráficos
- [ ] **API REST completa** para terceros
- [ ] **Sistema de reservas** para clases
- [ ] **Control de acceso** con códigos QR

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

Si tienes preguntas o problemas:

1. Revisa la documentación
2. Busca en los [Issues existentes](link-to-issues)
3. Crea un nuevo Issue si es necesario

## 🙏 Agradecimientos

- **Shadcn/ui** por los componentes base
- **Tailwind CSS** por el sistema de diseño
- **Framer Motion** por las animaciones
- **Prisma** por el ORM excepcional

---

Desarrollado con ❤️ para la comunidad fitness