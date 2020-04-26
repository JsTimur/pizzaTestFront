export const loadBasket = () => {
    try {
        const serializedBasket = localStorage.getItem('basket');
        if (serializedBasket === null) {
            return [];
        }
        return JSON.parse(serializedBasket);
    } catch (err) {
        return [];
    }
};

export const saveBasket = (items) => {
    try {
        const serializedItems = JSON.stringify(items);
        localStorage.setItem('basket', serializedItems);
    } catch {
        // ignore write errors
    }
};