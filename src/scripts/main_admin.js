import ExternalServices, { routeList } from "./external_services.mjs";
import { getLocalStorage, setLocalStorage, } from "./utils"; 

async function loadData() {

    // get email from local storage
    const userData = getLocalStorage();

    // get data from db and load into form
    if (userData.regionId) {
        const region = new ExternalServices();
        const regionData = await region.getData(`${routeList.region}/${userData.regionId}`);
        
        const wardData = await region.getData(`${routeList.region}/${userData.regionId}/wards`);
        const stakeData = await region.getData(`${routeList.region}/${userData.regionId}/stakes`);
        

        let treeHTML = `<button id='edit_stakes_wards_btn' class="button primary">Edit Stakes/Wards</button><ul data-role="treeview">`;
        stakeData.forEach(stake => {
            treeHTML += `<li data-icon="<span class='mif-list'></span>" data-caption="${stake.name}"><ul>`

            wardData.forEach(ward => {
                if (ward.stakeId == stake.stakeId) {
                    treeHTML += `<li data-icon="<span class='mif-minus'></span>" data-caption="${ward.name}"></li>`
                }
            })
            treeHTML += `</ul>`
        });
        treeHTML += `</ul>`
        document.getElementById('stake-ward-tree').innerHTML = treeHTML;
        document.getElementById('region-name').innerHTML = `<b>region:</b>  ${regionData.name}`;
        document.getElementById('region-id').innerHTML = `<b>id:</b>  ${regionData.regionId}`;
        document.getElementById('region-password').innerHTML = `<b>signing pasword:</b>   ${regionData.signingPassword}`;
        document.getElementById('standards').innerHTML = regionData.standards;
    }

    
}


loadData()
