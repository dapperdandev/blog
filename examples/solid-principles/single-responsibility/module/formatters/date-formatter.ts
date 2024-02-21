const LOCALE = 'en-US';

export const getShortDate = (date: Date): string => {
    return date.toLocaleDateString(LOCALE, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
};

export const getMediumDate = (date: Date): string => {
    return date.toLocaleDateString(LOCALE, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

export const getFullDate = (date: Date): string => {
    return date.toLocaleDateString(LOCALE, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};
