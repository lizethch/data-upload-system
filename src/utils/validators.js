export const validateField = (field, value) => {
    switch (field) {
        case 'name':
            return !value ? "El campo 'name' no puede estar vacío." : '';
        case 'email':
            return !value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ?
                "El formato del campo 'email' es inválido." : '';
        case 'age':
            if (!value) return '';
            const age = parseInt(value);
            return isNaN(age) || age <= 0 ?
                "El campo 'age' debe ser un número positivo." : '';
        default:
            return '';
    }
};

