const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());

// URL del archivo JSON en GitHub
const jsonUrl = 'https://raw.githubusercontent.com/MarcoChaconR/distribucion_territorial_costa_rica/refs/heads/main/distritos.json';

// Ruta para obtener las provincias
app.get('/provincias', async (req, res) => {
    try {
        const response = await axios.get(jsonUrl);
        const data = response.data;
        const provincias = Object.keys(data['Costa Rica']['Provincias']);
        res.json(provincias);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'No se pudo obtener la información' });
    }
});

// Ruta para obtener los cantones de una provincia (usando header)
app.get('/cantones', async (req, res) => {
    try {
        const provincia = req.header('provincia');
        
        if (!provincia) {
            return res.status(400).json({ error: 'Debe especificar la provincia en el header' });
        }

        const response = await axios.get(jsonUrl);
        const data = response.data;
        const cantones = data['Costa Rica']['Provincias'][provincia]?.Cantones;

        if (cantones) {
            res.json(Object.keys(cantones));
        } else {
            res.status(404).json({ error: 'Provincia no encontrada' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'No se pudo obtener la información' });
    }
});

// Ruta para obtener los distritos de un cantón (usando headers para provincia y cantón)
app.get('/distritos', async (req, res) => {
    try {
        const provincia = req.header('provincia');
        const canton = req.header('canton');

        if (!provincia || !canton) {
            return res.status(400).json({ error: 'Debe especificar provincia y cantón en los headers' });
        }

        const response = await axios.get(jsonUrl);
        const data = response.data;

        const provinciaData = data['Costa Rica']['Provincias'][provincia];
        if (!provinciaData) {
            return res.status(404).json({ error: 'Provincia no encontrada' });
        }

        const cantonData = provinciaData.Cantones[canton];
        if (!cantonData) {
            return res.status(404).json({ error: 'Cantón no encontrado' });
        }

        res.json(cantonData.Distritos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'No se pudo obtener la información' });
    }
});

// Inicia el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));