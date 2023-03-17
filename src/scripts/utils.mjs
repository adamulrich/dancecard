export function createMessage(message) {
    return `<h3>${message}</h3>`
}

// retrieve data from localstorage
export function getLocalStorage(key) {
    try {
        return JSON.parse(localStorage.getItem(key));
    }
    catch (error) {
        // cart is corrupted, remote it.
        localStorage.removeItem(key);
        return null;
    }
}
// save data to local storage
export function setLocalStorage(key, data) {
    try {
        // if it's an empty list because we've deleted items, remove the key
        if (JSON.stringify(data) === '[]') {
            localStorage.removeItem(key);
        } else {
        
            localStorage.setItem(key, JSON.stringify(data));
        }
    }
    catch (error) {
        console.log(error);
        // cart is corrupted, remote it.
        localStorage.removeItem(key);
    } 
        
    
}
