
import { getLocalStorage, setLocalStorage, } from "./utils"; 

const accountData = getLocalStorage()

// databind to the elements
document.getElementById('user-name').innerText = accountData.name;
document.getElementById('user-email').innerText = accountData.email;
document.getElementById('user-phone').innerText = accountData.phone;
document.getElementById('user-ward').innerText = accountData.wardName;
document.getElementById('user-stake').innerText = accountData.stakeName;
document.getElementById('user-region').innerText = accountData.regionName;
document.getElementById('parent-name').innerText = accountData.parentName;
document.getElementById('parent-phone').innerText = accountData.parentPhone;
document.getElementById('signature').innerText = accountData.cardIsSigned;


document.getElementById('edit-account').addEventListener('click', editAccount);


function editAccount() {
    window.location.href = 'edit_account.html';
 }
