# Flights API

Una API REST completa para gestionar vuelos con MongoDB y TypeScript, desplegada con Docker Compose.

## 🚀 Características

- **Base de datos NoSQL**: MongoDB con Mongoose ODM
- **API REST**: Endpoints CRUD completos para vuelos
- **TypeScript**: Tipado estático completo
- **Docker Compose**: Entorno de desarrollo containerizado
- **Validación**: Validación de datos con Mongoose
- **Logging**: Morgan para logs de requests
- **Seguridad**: Helmet para headers de seguridad
- **CORS**: Soporte para Cross-Origin Resource Sharing

## 📋 Estructura del Proyecto

```
├── src/
│   ├── config/
│   │   └── database.ts          # Configuración de MongoDB
│   ├── controllers/
│   │   └── flightController.ts  # Controladores CRUD
│   ├── middleware/
│   │   └── errorHandler.ts      # Manejo de errores
│   ├── models/
│   │   └── Flight.ts           # Modelo Mongoose
│   ├── routes/
│   │   └── flightRoutes.ts     # Rutas de la API
│   ├── types/
│   │   └── flight.ts           # Tipos TypeScript
│   └── index.ts                # Punto de entrada
├── docker-compose.yml          # Configuración Docker
├── Dockerfile                  # Dockerfile para la API
├── package.json               # Dependencias y scripts
├── tsconfig.json              # Configuración TypeScript
└── README.md                  # Documentación
```

## 🛠️ Instalación y Configuración

### Prerrequisitos

- Docker y Docker Compose instalados
- Node.js 18+ (para desarrollo local)

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd flights-api
```

### 2. Configurar variables de entorno

```bash
cp env.example .env
# Editar .env según sea necesario
```

### 3. Ejecutar con Docker Compose

```bash
# Construir y ejecutar todos los servicios
docker-compose up --build

# Ejecutar en segundo plano
docker-compose up -d --build
```

### 4. Verificar que todo funciona

```bash
# Health check
curl http://localhost:3000/health

# Información de la API
curl http://localhost:3000/
```

## 📊 Estructura de Datos

### Colección Flights

```typescript
interface Flight {
  flightCode: string;           // Código único del vuelo (identificador principal)
  passengers: Passenger[];      // Array de pasajeros
  createdAt?: Date;
  updatedAt?: Date;
}

interface Passenger {
  id: number;                   // ID único del pasajero
  name: string;                 // Nombre del pasajero
  hasConnections: boolean;      // Si tiene conexiones
  age: number;                  // Edad del pasajero
  flightCategory: "Black" | "Platinum" | "Gold" | "Normal"; // Categoría del vuelo
  reservationId: string;        // ID de reserva
  hasCheckedBaggage: boolean;   // Si tiene equipaje facturado
}
```

## 🔌 Endpoints de la API

### Base URL: `http://localhost:3000`

### Health Check
- **GET** `/health` - Verificar estado de la API

### Vuelos

#### Obtener todos los vuelos
- **GET** `/api/flights`
- **Respuesta**: Lista de todos los vuelos

#### Obtener vuelo por código
- **GET** `/api/flights/:flightCode`
- **Respuesta**: Vuelo específico



#### Crear nuevo vuelo
- **POST** `/api/flights`
- **Body**:
```json
{
  "flightCode": "FL123",
  "passengers": [
    {
      "id": 1,
      "name": "Juan Pérez",
      "hasConnections": false,
      "age": 30,
      "flightCategory": "Gold",
      "reservationId": "RES001",
      "hasCheckedBaggage": true
    }
  ]
}
```

#### Actualizar vuelo
- **PUT** `/api/flights/:flightCode`
- **Body**: Mismos campos que crear (todos opcionales)

#### Eliminar vuelo
- **DELETE** `/api/flights/:flightCode`
- **Respuesta**: Vuelo eliminado

## 🧪 Ejemplos de Uso con Postman

### 1. Crear un vuelo

**POST** `http://localhost:3000/api/flights`

```json
{
  "flightCode": "FL123",
  "passengers": [
    {
      "id": 1,
      "name": "María García",
      "hasConnections": true,
      "age": 25,
      "flightCategory": "Platinum",
      "reservationId": "RES001",
      "hasCheckedBaggage": true
    },
    {
      "id": 2,
      "name": "Carlos López",
      "hasConnections": false,
      "age": 45,
      "flightCategory": "Gold",
      "reservationId": "RES002",
      "hasCheckedBaggage": false
    }
  ]
}
```

### 2. Obtener todos los vuelos

**GET** `http://localhost:3000/api/flights`



### 3. Actualizar vuelo

**PUT** `http://localhost:3000/api/flights/FL123`

```json
{
  "flightCode": "FL123-UPDATED",
  "passengers": [
    {
      "id": 1,
      "name": "María García Actualizada",
      "hasConnections": false,
      "age": 26,
      "flightCategory": "Black",
      "reservationId": "RES001",
      "hasCheckedBaggage": true
    }
  ]
}
```

### 4. Eliminar vuelo

**DELETE** `http://localhost:3000/api/flights/FL123`

## 🐳 Comandos Docker

```bash
# Construir y ejecutar
docker-compose up --build

# Ejecutar en segundo plano
docker-compose up -d

# Ver logs
docker-compose logs -f api

# Detener servicios
docker-compose down

# Detener y eliminar volúmenes
docker-compose down -v

# Reconstruir sin cache
docker-compose build --no-cache
```

## 🔧 Desarrollo Local

### Instalar dependencias

```bash
npm install
```

### Ejecutar en modo desarrollo

```bash
npm run dev
```

### Compilar TypeScript

```bash
npm run build
```

### Ejecutar en producción

```bash
npm start
```

## 📝 Respuestas de la API

### Respuesta exitosa
```json
{
  "success": true,
  "data": { ... },
  "count": 1,
  "message": "Operation completed successfully"
}
```

### Respuesta de error
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

## 🚨 Manejo de Errores

La API incluye manejo de errores para:

- **400**: Datos inválidos o duplicados
- **404**: Recurso no encontrado
- **500**: Error interno del servidor

## 🔒 Seguridad

- Headers de seguridad con Helmet
- Validación de datos con Mongoose
- Sanitización de inputs
- Logs de requests con Morgan

## 📈 Monitoreo

- Health check endpoint
- Logs detallados de requests
- Manejo de errores centralizado
- Métricas de respuesta

