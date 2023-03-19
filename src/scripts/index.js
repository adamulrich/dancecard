// if there is localstorage data, go to the account main page
import { getLocalStorage } from "./utils";


let accountInfo = getLocalStorage();

if (accountInfo) {
    window.location.href = "main.html";
}
