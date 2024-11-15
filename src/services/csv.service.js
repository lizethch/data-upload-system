// src/services/csv.service.js

// import { validateField } from '../utils/validators';

// export const processCSVContent = (content) => {
//     try {
//         const lines = content.split('\n');
//         const headers = lines[0].trim().split(',');
//         const success = [];
//         const errors = [];

//         lines.slice(1).forEach((line, index) => {
//             if (!line.trim()) return;

//             const values = line.trim().split(',');
//             const record = {};
//             const recordErrors = {};
//             let hasErrors = false;

//             headers.forEach((header, i) => {
//                 const value = values[i];
//                 record[header] = value;
//                 const validationError = validateField(header, value);
//                 if (validationError) {
//                     recordErrors[header] = validationError;
//                     hasErrors = true;
//                 }
//             });

//             if (hasErrors) {
//                 errors.push({
//                     row: index + 2,
//                     details: record,
//                     validationErrors: recordErrors
//                 });
//             } else {
//                 success.push({
//                     id: Date.now() + index,
//                     ...record
//                 });
//             }
//         });

//         return { success, errors };
//     } catch (error) {
//         console.error('Error processing CSV:', error);
//         throw new Error('Error al procesar el archivo CSV');
//     }
// };

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