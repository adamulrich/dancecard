import { getLocalStorage } from './utils.js';

const userData = getLocalStorage();
try {
    if (userData.regionAdmin == true) {
        document.getElementById('admin-link').classList.remove('hidden');
        document.getElementById('aside-admin-link').classList.remove('hidden');
    } else {
        document.getElementById('admin-link').classList.add('hidden');
        document.getElementById('aside-admin-link').classList.add('hidden');
    }
        
} catch (error) {
    document.getElementById('admin-link').classList.add('hidden');
    document.getElementById('aside-admin-link').classList.add('hidden');
}
