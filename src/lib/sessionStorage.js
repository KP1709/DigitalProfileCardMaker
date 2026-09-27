export const readSessionState = (key, defaultValue) => {
    try {
        const storedValue = sessionStorage.getItem(key);
        const parsedValue = storedValue ? JSON.parse(storedValue) : null;

        return parsedValue && typeof parsedValue === "object" && !Array.isArray(parsedValue)
            ? { ...defaultValue, ...parsedValue }
            : defaultValue;
    } catch {
        return defaultValue;
    }
};

export const writeSessionState = (key, value) => {
    try {
        sessionStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch {
        return false;
    }
};

export const clearSessionState = () => {
    const keysToRemove = ["userData", "colourCustomise"];
    for (const key of keysToRemove) {
        try {
            sessionStorage.removeItem(key);
        } catch {
            return false;
        }
    }

    return true;
};