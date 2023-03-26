export const localStorageKey = "dance-card";
export const localStorageToken = 'token';

export function createMessage(message) {
    return `<h3>${message}<h3>`
}


export function getLocalStorage(key = localStorageKey) {
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
export function setLocalStorage(data, key = localStorageKey) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    }
    catch (error) {
        console.log(error);
        // cart is corrupted, remote it.
        localStorage.removeItem(key);
    }
}
export function deleteLocalStorage(key = localStorageKey) {
    localStorage.removeItem(key);
}


export function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
