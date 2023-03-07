import {createMessage} from './utils.mjs';

async function createSchedule() {

    //get query params
    try {
        
        const stakeId = new URLSearchParams(window.location.search).get('stake-id');
        const regionId = new URLSearchParams(window.location.search).get('region-id');

        if (!stakeId || !regionId) {
            $(createMessage("Invalid url.")).appendTo($('body'));

        }

    } catch (error) {
        // no query params, direct to home page

        $(createMessage("Invalid url.")).appendTo($('body'));
        exit;
    }


    //load stake data 


    // display stake data


    // load schedule data


    // display schedule data

}


createSchedule();
