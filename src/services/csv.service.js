// src/services/csv.service.js

import config from '../config/config';

export const uploadCSV = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`${config.API_URL}/upload/csv`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error('Error en la carga del archivo');
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error uploading CSV:', error);
        throw new Error('Error al procesar el archivo CSV');
    }
};