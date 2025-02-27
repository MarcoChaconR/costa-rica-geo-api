# Costa Rica Geo API

API REST que proporciona información sobre la distribución territorial de Costa Rica, incluyendo provincias, cantones y distritos.

## 📋 Descripción

Esta API permite obtener datos geográficos de Costa Rica organizados jerárquicamente:
- Provincias
- Cantones por provincia
- Distritos por cantón

## 🚀 Endpoints

### Obtener todas las provincias

```http
GET /provincias
```

#### Respuesta
```json
[
  "San José",
  "Alajuela",
  "Cartago",
  "Heredia",
  "Guanacaste",
  "Puntarenas",
  "Limón"
]
```

### Obtener cantones de una provincia

```http
GET /cantones
```

#### Headers requeridos
| Header    | Tipo   | Descripción           |
|-----------|--------|-----------------------|
| provincia | string | Nombre de la provincia|

#### Ejemplo de respuesta
```json
[
  "Central",
  "Escazú",
  "Desamparados",
  "Puriscal",
  "Tarrazú"
  // ... más cantones
]
```

### Obtener distritos de un cantón

```http
GET /distritos
```

#### Headers requeridos
| Header    | Tipo   | Descripción           |
|-----------|--------|-----------------------|
| provincia | string | Nombre de la provincia|
| canton    | string | Nombre del cantón     |

#### Ejemplo de respuesta
```json
[
  "Carmen",
  "Merced",
  "Hospital",
  "Catedral"
  // ... más distritos
]
```

## 🛠️ Tecnologías utilizadas

- Node.js
- Express
- Axios
- CORS

## 📦 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/MarcoChaconR/costa-rica-geo-api.git
```

2. Instala las dependencias:
```bash
cd costa-rica-geo-api
npm install
```

3. Inicia el servidor:
```bash
npm start
```

El servidor se iniciará en `http://localhost:3000`

## 🔧 Variables de entorno

- `PORT`: Puerto en el que se ejecutará el servidor (por defecto: 3000)

## 📝 Ejemplos de uso

### Usando fetch (JavaScript)
```javascript
// Obtener provincias
fetch('https://costa-rica-geo-api.onrender.com/provincias')
  .then(response => response.json())
  .then(data => console.log(data));

// Obtener cantones de una provincia
fetch('https://costa-rica-geo-api.onrender.com/cantones', {
  headers: {
    'provincia': 'San José'
  }
})
  .then(response => response.json())
  .then(data => console.log(data));

// Obtener distritos de un cantón
fetch('https://costa-rica-geo-api.onrender.com/distritos', {
  headers: {
    'provincia': 'San José',
    'canton': 'Central'
  }
})
  .then(response => response.json())
  .then(data => console.log(data));
```

### Usando Axios (Node.js)
```javascript
const axios = require('axios');

// Obtener provincias
axios.get('https://costa-rica-geo-api.onrender.com/provincias')
  .then(response => console.log(response.data));

// Obtener cantones
axios.get('https://costa-rica-geo-api.onrender.com/cantones', {
  headers: {
    'provincia': 'San José'
  }
})
  .then(response => console.log(response.data));

// Obtener distritos
axios.get('https://costa-rica-geo-api.onrender.com/distritos', {
  headers: {
    'provincia': 'San José',
    'canton': 'Central'
  }
})
  .then(response => console.log(response.data));
```

## ⚠️ Códigos de error

| Código | Descripción                                    |
|--------|------------------------------------------------|
| 400    | Falta un header requerido                      |
| 404    | Provincia o cantón no encontrado               |
| 500    | Error interno del servidor                     |

## 📄 Fuente de datos

Los datos geográficos son obtenidos de un archivo JSON alojado en GitHub que contiene la información oficial de la división territorial de Costa Rica.

## 👥 Contribuir

Si deseas contribuir al proyecto:
1. Haz un Fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Haz commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - mira el archivo LICENSE.md para detalles

## 📧 Contacto

Si tienes preguntas o sugerencias, no dudes en abrir un issue en el repositorio.
