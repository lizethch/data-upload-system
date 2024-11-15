import config from '../config/config';
import { jwtDecode } from 'jwt-decode';

export const loginService = async (email, password) => {
    try {
        const response = await fetch(`${config.API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error en el inicio de sesión');
        }

        const data = await response.json();

        let decodedToken;
        try {
            decodedToken = jwtDecode(data.token);
            console.log('Token decodificado:', decodedToken);
        } catch (decodeError) {
            console.error('Error decodificando el token:', decodeError);
            throw new Error('Error al procesar la respuesta del servidor');
        }

        return {
            ok: true,
            data: {
                email: email,
                name: decodedToken.name,
                role: decodedToken.role,
                token: data.token,
            }
        };
    } catch (error) {
        console.error('Error en loginService:', error);
        throw new Error(error.message || 'Error en el servidor');
    }
};

export const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
    };
};

export const authenticatedFetch = async (endpoint, options = {}) => {
    const response = await fetch(`${config.API_URL}${endpoint}`, {
        ...options,
        headers: {
            ...getAuthHeaders(),
            ...options.headers,
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en la petición');
    }

    return response.json();
};
