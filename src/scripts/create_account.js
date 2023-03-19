import ExternalServices, { routeList } from './external_services.mjs';
import { getLocalStorage, setLocalStorage} from "./utils"; 



async function getDataForWard() {
    const stakeId = new URLSearchParams(window.location.search).get('stake-id');
    const regionId = new URLSearchParams(window.location.search).get('region-id');
    const wardId = new URLSearchParams(window.location.search).get('ward-id');

    const wardData = await new ExternalServices().getData(`${routeList.ward}/${wardId}`);

    const userAuthData = getLocalStorage();

    console.log(userAuthData);

    document.getElementById('region-span').innerText = wardData.regionName
    document.getElementById('stake-span').innerText = wardData.stakeName
    document.getElementById('ward-span').innerText = wardData.name
    document.getElementById('name').value = userAuthData.nickname;
    document.getElementById('email').value = userAuthData.email;
    document.getElementById('user-sub').value = userAuthData.sub
    document.getElementById('region-id').value = regionId;
    document.getElementById('stake-id').value = stakeId;
    document.getElementById('ward-id').value = wardId;
}  

async function createAccount(){
    const user = new ExternalServices();
    const newUser = 
        { 
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            regionId: document.getElementById('region-id').value,
            stakeId: document.getElementById('stake-id').value,
            userSub: document.getElementById('user-sub').value,
            wardId: document.getElementById('ward-id').value,
            phone:  document.getElementById('phone').value,
            parentName: document.getElementById('parent_name').value,
            parentPhone: document.getElementById('parent_phone').value,
            regionAdmin: false,
            cardIsSigned: false
        }

    const result = await user.postData(routeList.user, newUser);
    console.log(result);
    if (result.ok) {
        console.log("create_success");
        //success, write to localStorage
        setLocalStorage(newUser);
        // load main page
        //window.location.href = 'main.html';
    } else  {

    }
    
}


getDataForWard();

document.getElementById("create_account_btn").addEventListener('click', function(event)  {
    event.preventDefault();
    createAccount();
})


document.getElementById("cancel_btn").addEventListener('click', function(event)  {
    // cancel, remove localstorage, sign out
    setLocalStorage(null);
    window.location.href = 'sign_in.html?sign-out=1'
})
