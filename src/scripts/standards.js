import { createMessage } from './utils.js';
import ExternalServices, { routeList } from './external_services.mjs';
import { getLocalStorage } from './utils.js';

let regionId = 0;

async function loadStandards() {

    const userData = getLocalStorage();
    regionId = userData.regionId;

    //load stake data 
    const stake = new ExternalServices();
    const region = await stake.getData(`${routeList.region}/${regionId}`);
    
    // display stake data
    document.getElementById('standards').innerHTML = region.standards;

}


loadStandards();
