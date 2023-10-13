const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

const API_URL = 'https://portal.icentral.com.mx/crm/api/v1.0/clients/authenticated';
const SERVICES_API_URL = 'https://portal.icentral.com.mx/crm/api/v1.0/clients/services?clientId=';
const APP_KEY = '+kU080mYecWh6qQ3i0FJSsA0FZ3RzTozxLI+mwibGiCd1mcP70VIQARhk7q/L4C5';

app.use(express.json());

app.post('/authenticate', async (req, res) => {
    try {
        const response = await axios.post(API_URL, req.body, {
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-App-Key': APP_KEY
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error durante la autenticación' });
    }
});

app.get('/getservices/:userId', async (req, res) => {
    try {
        const response = await axios.get(SERVICES_API_URL + req.params.userId, {
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-App-Key': APP_KEY
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo el servicio del usuario' });
    }
});

app.listen(port, () => {
    console.log(`Backend en ejecución en http://localhost:${port}`);
});
