import ExternalServices, { routeList } from './external_services.mjs';


async function createWards() {

    const stakeId = new URLSearchParams(window.location.search).get('stake-id');
    const regionId = new URLSearchParams(window.location.search).get('region-id');
    const wards = new ExternalServices();
    const wardsJson = await wards.getData(`${routeList.wards}/stake/${stakeId}`);
    const data = { "header": {}, "template": "<%this.name%>",
                "data": wardsJson }

    let innerHTML = `<ul id="wards"
    data-role="list"
    data-show-search="true"
    data-cls-list="unstyled-list row flex-justify-center mt-4"
    data-cls-list-item="cell-sm-6 cell-md-4">
    `

    console.log(data);
    console.log(innerHTML);
    ;
    wardsJson.forEach(ward => {
        innerHTML += `
        <li >
            <a href="create_account.html?stake-id=${stakeId}&region-id=${regionId}&ward-id=${ward.wardId}">
                <h3 class="name">${ward.name}</h3>
            </a>
        </li>`
    });
    innerHTML += "</ul>"
    var content = $(innerHTML);
    content.appendTo($("#stake-lookup"));
    

}


createWards();
