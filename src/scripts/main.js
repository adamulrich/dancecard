import { getLocalStorage } from './utils.js';

const userData = getLocalStorage();
try {
    if (userData.isRegionAdmin == true) {
        document.getElementById('admin-link').classList.remove('disabled')
    } else {
        document.getElementById('admin-link').classList.add('disabled')    
    }
        
} catch (error) {
    document.getElementById('admin-link').classList.add('disabled')
}
