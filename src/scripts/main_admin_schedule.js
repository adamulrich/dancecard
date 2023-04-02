import ExternalServices, { routeList } from './external_services.mjs';
import { getLocalStorage } from './utils.js';


async function createSchedule() {

    const userData = getLocalStorage();
    const regionId = userData.regionId;
    console.log(regionId);

    //load stake data 
    const region = new ExternalServices();
    const regionData = await region.getData(`${routeList.region}/${regionId}`);
    
    
    // display region data
    document.getElementById('region-name').innerText = regionData.name;

    // load schedule data
    const schedule = await region.getData(`${routeList.schedule}${routeList.region}/${regionId}`);

    // display schedule data
    const scheduleElement = document.getElementById('schedule');

    let innerHTML = '';

    schedule.forEach(dance => {
        const dateTime = new Date(dance.dateTime).toLocaleString('en-us') ;
        innerHTML += `
        <li>
            <button id='edit_dance_btn' class="button primary">Edit Dance</button>
        </li>
        <li>
            <span>Date & Time</span>
            <span class='align-right'>${dateTime}</span>
        </li>
        <li >
            <span>Host</span>
            <span class="align-right">${dance.stakeHost}</span>
        </li>
        <li >
            <span>Location</span>
            <span class="align-right">${dance.location}</span>
        </li>
        <li >
            <span>Theme</span>
            <span class="align-right">${dance.theme}</span>
        </li>
        <li>
            <div class='blue-color-block'>_   <div>
        </li>
        `
    });

    scheduleElement.innerHTML = innerHTML;
}


createSchedule();
