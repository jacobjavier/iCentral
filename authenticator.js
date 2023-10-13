const axios = require('axios');

const API_URL = 'https://portal.icentral.com.mx/crm/api/v1.0/clients/authenticated';
const SERVICES_API_URL = 'https://portal.icentral.com.mx/crm/api/v1.0/clients/services?clientId=';
const APP_KEY = '+kU080mYecWh6qQ3i0FJSsA0FZ3RzTozxLI+mwibGiCd1mcP70VIQARhk7q/L4C5';

const handleError = (message, error) => {
    throw new Error(`${message}: ${error.message}`);
};

const authenticateUser = async (username, password) => {
    try {
        const response = await axios.post(API_URL, { username, password }, {
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-App-Key': APP_KEY
            }
        });
        return response.status === 200 ? response.data : false;
    } catch (error) {
        handleError('Error durante la autenticación', error);
    }
};

const getUserService = async userId => {
    try {
        const response = await axios.get(SERVICES_API_URL + userId, {
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-App-Key': APP_KEY
            }
        });
        return response.data;
    } catch (error) {
        handleError('Error getting user service', error);
    }
};

// Ejemplo de uso:
authenticateUser('usuario', 'contraseña')
    .then(user => {
        if (user) {
            return getUserService(user.userId);
        } else {
            console.log('La autenticación falló.');
        }
    })
    .then(service => {
        if (service) {
            console.log('Servicio:', service);
        }
    })
    .catch(error => {
        console.error(error.message);
    });
