export const validateFraction = (fraction: string): boolean => {
    if (!isNaN(+fraction)) return true;

    const parts = fraction.split(' ');

    if (parts.length === 2) {
        if (isNaN(+parts[0])) return false;
        if (!fractionToNumberHelper(parts[1])) return false;
    } else if (parts.length === 1) {
        if (!fractionToNumberHelper(parts[0])) return false;
    } else {
        return false;
    }

    return true;
};

const fractionToNumberHelper = (fraction: string): boolean => {
    const parts = fraction.split('/');

    if (parts.length !== 2) {
        return false;
    }

    const numerator = +parts[0];
    const denominator = +parts[1];

    if (isNaN(numerator) || isNaN(denominator) || denominator === 0) {
        return false;
    }

    return true;
};