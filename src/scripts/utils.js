export const localStorageKey = "dance-card";

export function getLocalStorage() {
    const key = localStorageKey;
    try {
        return JSON.parse(localStorage.getItem(key));
    }
    catch (error) {
        // corrupted, remote it.
        localStorage.removeItem(key);
        return null;
    }
}
// save data to local storage
export function setLocalStorage(data) {
    const key = localStorageKey;
    try {
        localStorage.setItem(key, JSON.stringify(data));
    }
    catch (error) {
        console.log(error);
        // cart is corrupted, remote it.
        localStorage.removeItem(key);
    } 
}
