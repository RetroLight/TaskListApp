const getLocalStorageData = (key) => {
    if (key) {
        const data = window.localStorage.getItem(key);
        return data;
    }
};

const setLocalStorageData = (key, data) => {
    if (key && data) {
        window.localStorage.setItem(key, JSON.stringify(data));
    }
};

export { getLocalStorageData, setLocalStorageData };
