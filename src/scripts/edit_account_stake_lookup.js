import ExternalServices, { routeList } from './external_services.mjs';


async function createStakes() {

    const stake = new ExternalServices();
    const stakesJson = await stake.getData(routeList.stake);
    const data = { "header": {}, "template": "<%this.name%>",
                "data": stakesJson }

    let innerHTML = `<ul id="stakes"
    data-role="list"
    data-show-search="true"
    data-cls-list="unstyled-list row flex-justify-center mt-4"
    data-cls-list-item="cell-sm-6 cell-md-4">
    `

    console.log(data);
    console.log(innerHTML);
    ;
    stakesJson.forEach(stake => {
        innerHTML += `
        <li >
            <a href="edit_account_ward_lookup.html?stake-id=${stake.stakeId}&region-id=${stake.regionId}">
                <h3 class="name">${stake.name}</h3>
            </a>
        </li>`
    });
    innerHTML += "</ul>"
    var content = $(innerHTML);
    content.appendTo($("#stake-lookup"));
    

}


createStakes();
