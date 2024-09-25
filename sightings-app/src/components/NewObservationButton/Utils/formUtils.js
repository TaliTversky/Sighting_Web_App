export const validateInput = (name, value) => {
    let error = '';

    switch (name) {
        // Required text fields
        case 'date':
        case 'site':
        case 'reporter':
        case 'stage':
        case 'sex':
            if (!value || !value.trim()) {
                error = 'This field is required.';
            }
            break;

        // Numerical fields that must be valid numbers
        case 'latitude':
            if (isNaN(Number(value)) || Number(value) < -90 || Number(value) > 90) {
                error = 'Latitude must be a number between -90 and 90.';
            }
            break;
        case 'longitude':
            if (isNaN(Number(value)) || Number(value) < -180 || Number(value) > 180) {
                error = 'Longitude must be a number between -180 and 180.';
            }
            break;
        case 'count':
            if (value === '' || value === null) {
                error = 'Count is required.';
            } else if (!Number.isInteger(Number(value)) || Number(value) < 0) {
                error = 'Count must be a positive integer.';
            }
            break;
        case 'length':
        case 'diskLength':
        case 'width':
        case 'distance':
        case 'weight':
            if (value !== '' && value !== null) {
                if (isNaN(Number(value)) || Number(value) < 0) {
                    error = 'Please enter a valid positive number.';
                }
            }
            break;
        case 'depth':
        case 'temperature':
            if (value !== '' && value !== null) {
                if (isNaN(Number(value))) {
                    error = 'Please enter a valid number.';
                }
            }
            break;

        // Email validation (if applicable)
        case 'email':
            if (value && value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value.trim())) {
                    error = 'Please enter a valid email address.';
                }
            }
            break;

        // URL links validation
        case 'urlLinks':
            if (value && value.trim()) {
                const urlRegex = /^(https?:\/\/[^\s]+)$/;
                const urls = value.split(',');
                const invalidUrls = urls.filter((url) => !urlRegex.test(url.trim()));
                if (invalidUrls.length > 0) {
                    error = 'Please enter valid URLs separated by commas.';
                }
            }
            break;

        default:
            break;
    }

    return error;
};
