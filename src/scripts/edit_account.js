import ExternalServices, { routeList } from "./external_services.mjs";
import { getLocalStorage, setLocalStorage, deleteLocalStorage } from './utils.js';

async function loadData() {

    // get email from local storage
    const userData = getLocalStorage();

    // get data from db and load into form
    if (userData.email) {
        const user = new ExternalServices();
        const accountData = await user.getData(`${routeList.user}/${userData.email}`);
        console.log(JSON.stringify(accountData));
        const regionData = await user.getData(`${routeList.region}/${accountData.regionId}`);
        //console.log(accountData);

        const query = window.location.search;
        if (query.includes('stake-id')) {
            accountData.stakeId = new URLSearchParams(window.location.search).get('stake-id');
            accountData.regionId = new URLSearchParams(window.location.search).get('region-id');
            accountData.wardId = new URLSearchParams(window.location.search).get('ward-id');

            const wardData = await new ExternalServices().getData(`${routeList.ward}/${accountData.wardId}`);
            console.log(wardData);
            accountData.wardName = wardData.name;
            accountData.regionName = wardData.regionName;
            accountData.stakeName = wardData.stakeName;
        
        }


        document.getElementById('name').value = accountData.name;
        document.getElementById('email').value = accountData.email;
        document.getElementById('phone').value = accountData.phone;
        document.getElementById('parent_name').value = accountData.parentName;
        document.getElementById('parent_phone').value = accountData.parentPhone;
        document.getElementById('ward-span').innerText = accountData.wardName;
        document.getElementById('stake-span').innerText = accountData.stakeName;
        document.getElementById('region-span').innerText = regionData.name;
        document.getElementById('stake-id').value = accountData.stakeId;
        document.getElementById('ward-id').value = accountData.wardId;
        document.getElementById('region-id').value = accountData.regionId;
        document.getElementById('user-sub').value = accountData.userSub;
        document.getElementById('card-is-signed').value = accountData.cardIsSigned;
        document.getElementById('region-admin').value = accountData.regionAdmin;
    }

    
}


async function editAccount() {
    

    const user = new ExternalServices();
    const newUser = 
        { 
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            regionId: document.getElementById('region-id').value,
            stakeId: document.getElementById('stake-id').value,
            userSub: document.getElementById('user-sub').value,
            wardId: document.getElementById('ward-id').value,
            phone: document.getElementById('phone').value,
            parentName: document.getElementById('parent_name').value,
            parentPhone: document.getElementById('parent_phone').value,
            cardIsSigned: document.getElementById('card-is-signed').value,
            regionAdmin: document.getElementById('region-admin').value
    }

    console.log(newUser);
    const wardData = await new ExternalServices().getData(`${routeList.ward}/${newUser.wardId}`);

    try {
        const result = await user.putData(routeList.user, newUser, newUser.email);
        console.log(`update_success: ${result}`);
        
        //success, write to localStorage with name data
        newUser.regionName = wardData.regionName;
        newUser.stakeName = wardData.stakeName;
        newUser.wardName = wardData.name;
        
        setLocalStorage(newUser);
        // load main page
        window.location.href = 'main.html';
    }
    catch (e){
     console.log(e)   
    }
    
}


document.getElementById("edit_account_btn").addEventListener('click', function(event)  {
    event.preventDefault();
    editAccount();
})


document.getElementById("cancel_btn").addEventListener('click', function(event)  {
    event.preventDefault();
    window.location.href = 'main.html'
})

document.getElementById("change-ward").addEventListener('click', function(event)  {
    event.preventDefault();
    window.location.href = 'edit_user_select_stake.html'
})






loadData()
