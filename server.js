const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

// URL del archivo JSON en GitHub
const jsonUrl = 'https://raw.githubusercontent.com/MarcoChaconR/distribucion_territorial_costa_rica/main/DTCR.json';

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

// Ruta para obtener los cantones de una provincia
app.get('/provincias/:provincia/cantones', async (req, res) => {
    try {
        const { provincia } = req.params;
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

// Ruta para obtener los distritos de un cantón
app.get('/cantones/:canton/distritos', async (req, res) => {
    try {
        const { canton } = req.params;
        const response = await axios.get(jsonUrl);
        const data = response.data;

        for (let provincia in data['Costa Rica']['Provincias']) {
            if (data['Costa Rica']['Provincias'][provincia].Cantones[canton]) {
                return res.json(data['Costa Rica']['Provincias'][provincia].Cantones[canton].Distritos);
            }
        }
        res.status(404).json({ error: 'Cantón no encontrado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'No se pudo obtener la información' });
    }
});

// Inicia el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
