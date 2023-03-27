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
