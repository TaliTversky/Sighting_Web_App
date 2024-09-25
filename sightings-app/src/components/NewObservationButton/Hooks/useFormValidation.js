import { useState } from 'react';
import { validateInput } from '../Utils/formUtils';

function useFormValidation(formData) {
    const [formErrors, setFormErrors] = useState({});

    const validateAllFields = () => {
        const newErrors = {};
        Object.keys(formData).forEach((key) => {
            const error = validateInput(key, formData[key]);
            if (error) {
                newErrors[key] = error;
            }
        });
        setFormErrors(newErrors);
        console.log("errors >>> ", newErrors)
        return Object.keys(newErrors).length === 0;
    };

    return {
        formErrors,
        setFormErrors,
        validateAllFields,
    };
}

export default useFormValidation;
