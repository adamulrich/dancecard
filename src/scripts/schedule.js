import { createMessage } from './utils.mjs';
import ExternalServices, { routeList } from './external_services.mjs';

let stakeId = 0;
let regionId = 0;

async function createSchedule() {

    //get query params
    try {
        
        stakeId = new URLSearchParams(window.location.search).get('stake-id');
        regionId = new URLSearchParams(window.location.search).get('region-id');

        if (!stakeId || !regionId) {
            $(createMessage("Invalid url.")).appendTo($('body'));

        }

    } catch (error) {
        // no query params, direct to home page

        $(createMessage("Invalid url.")).appendTo($('body'));
        exit;
    }


    //load stake data 
    const stake = new ExternalServices(routeList.stake);
    const stakeJson = await stake.getData(`${routeList.stake}/${stakeId}` );
    const region = await stake.getData(`${routeList.region}/${regionId}`);
    
    
    // display stake data
    document.getElementById('stake-name').innerText = stakeJson.name;
    document.getElementById('region-name').innerText = region.name;


    // load schedule data
    const schedule = await stake.getData(`${routeList.futureSchedule}/${regionId}`);
    console.log(schedule);

    // display schedule data
    const scheduleElement = document.getElementById('schedule');

    let innerHTML = '';

    schedule.forEach(dance => {
        const dateTime = new Date(dance.dateTime).toLocaleString('en-us') ;
        innerHTML += `
        <li >
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
