module.exports = function validateSchoolData(schoolData) {
    const { name, address, latitude, longitude } = schoolData;

    if (!name || typeof name !== 'string') {
        return { valid: false, message: 'Invalid name: must be a non-empty string.' };
    }

    if (!address || typeof address !== 'string') {
        return { valid: false, message: 'Invalid address: must be a non-empty string.' };
    }

    if (latitude === undefined || typeof latitude !== 'number') {
        return { valid: false, message: 'Invalid latitude: must be a number.' };
    }

    if (longitude === undefined || typeof longitude !== 'number') {
        return { valid: false, message: 'Invalid longitude: must be a number.' };
    }

    return { valid: true };
};