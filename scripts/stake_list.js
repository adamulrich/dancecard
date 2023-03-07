import Data from './getJson.mjs';



async function createStakes() {

    const stakesJson = await new Data('stake').getData();
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
            <a href="schedule.html?stake-id=${stake.id}&region-id=${stake.regionId}">
                <h3 class="name">${stake.name}</h3>
            </a>
        </li>`
    });
    innerHTML += "</ul>"
    var content = $(innerHTML);
    content.appendTo($("#stake-list"));
    

}


createStakes();