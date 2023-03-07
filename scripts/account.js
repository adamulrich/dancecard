import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { localStorageKey } from './constants'

function checkAccount() {
    
    // check local storage for account info
    const accountData = getLocalStorage(localStorageKey);

    if (accountData) {
        // load the account data

    } else {
        // no data, offer login
    }
}










checkAccount();

