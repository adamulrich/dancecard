import { getLocalStorage } from './utils.js';

const userData = getLocalStorage();
try {
    if (userData) {
        document.getElementById('signed-in').classList.remove('disabled');
        document.getElementById('signed-out').classList.add('disabled');
    } else {
        document.getElementById('signed-out').classList.remove('disabled');
        document.getElementById('signed-in').classList.add('disabled');
    }
        
} catch (error) {
    document.getElementById('signed-out').classList.remove('disabled');
    document.getElementById('signed-in').classList.add('disabled');
}
try {
    if (userData.regionAdmin == true) {
        document.getElementById('aside-admin-link').classList.remove('hidden');
    } else {
        document.getElementById('aside-admin-link').classList.add('hidden');
    }
        
} catch (error) {
    document.getElementById('aside-admin-link').classList.add('hidden');
}
