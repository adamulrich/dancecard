
import { getLocalStorage, setLocalStorage, localStorageToken } from './utils.js';

import { createAuth0Client}  from '@auth0/auth0-spa-js';
import ExternalServices, { routeList } from "./external_services.mjs";
let accessToken = '';

function checkAccount() {

    // check local storage for account info
    const accountData = getLocalStorage()

    if (accountData) {
        window.location.href = 'main.html';

    } else {
        // stay on main page.
    }
}

checkAccount();

let auth0Client = null;
const fetchAuthConfig = () => fetch("/auth_config.json");

const configureClient = async () => {
    const response = await fetchAuthConfig();
    const config = await response.json();
    console.log(config);
    auth0Client = await createAuth0Client({
        domain: config.domain,
        clientId: config.clientId,
        authorizationParams: {
            redirect_uri: 'http://127.0.0.1:5173/sign_in.html'
          }
    });
};

window.onload = async () => {

    const query = window.location.search;

    await configureClient();

    
    if (query.includes('sign-out')) {
        logout();
    }


    updateUI();

    let isAuthenticated = await auth0Client.isAuthenticated();


    // check for the code and state parameters, this means that we are signed in.
    
    if (query.includes("code=") && query.includes("state=")) {

        const queryParams = new URLSearchParams(document.location.search);

        console.log(queryParams.get('code'));
        console.log(queryParams.get('state'));

        // Process the login state
        await auth0Client.handleRedirectCallback();


        isAuthenticated = await auth0Client.isAuthenticated();
        // if auth'ed, check to see if user has an account
        if (isAuthenticated) {
            let dbUserData = {};
            const authUserData = await auth0Client.getUser();
                
            const user = new ExternalServices();
            const userCheckResponse = await user.getData(`${routeList.user}/${authUserData.email}`)
            if (userCheckResponse != null) {
                // it exists, get the data
                dbUserData = userCheckResponse;
                setLocalStorage(dbUserData);
                window.location.href = 'main.html';
            } else {
                // doesn't exist, create account workflow.
                // write data to localStorage
                dbUserData = {
                    email: authUserData.email,
                    name: authUserData.name,
                    nickname: authUserData.nickname,
                    sub: authUserData.sub,
                }
                setLocalStorage(dbUserData);
                window.location.href = `create_account_stake_lookup.html`;
            }



        }
        // Use replaceState to redirect the user away and remove the querystring parameters
        window.history.replaceState({}, document.title, "/");
        updateUI();

    } else {
        // offer sign_in, save data to 

    }




};



const updateUI = async () => {

    const isAuthenticated = await auth0Client.isAuthenticated();


    document.getElementById("btn-logout").disabled = false; //!isAuthenticated;
    document.getElementById("btn-login").disabled = false; //isAuthenticated;

    // NEW - add logic to show/hide gated content after authentication
    if (isAuthenticated) {
        document.getElementById("gated-content").classList.remove("hidden");
        accessToken = await auth0Client.getTokenSilently();
        console.log(await auth0Client.getIdTokenClaims());
        console.log(await auth0Client.getUser());
        // const differentAudienceOptions = {
        //     authorizationParams: {
        //       audience: 'http://ldsdancecard.onrender.com',
        //       redirect_uri: 'http://127.0.0.1:5173/sign_in.html'
        //     }};
        // const token = await auth0Client.getTokenSilently(differentAudienceOptions);

        setLocalStorage(localStorageToken,accessToken);
        document.getElementById("ipt-access-token").innerHTML = accessToken;

        document.getElementById("ipt-user-profile").textContent = JSON.stringify(
            await auth0Client.getUser()
        );

    } else {
        document.getElementById("gated-content").classList.add("hidden");
    }
};

export async function login() {
    const isAuthenticated = await auth0Client.isAuthenticated();

    await auth0Client.loginWithRedirect({
        authorizationParams: {
            redirect_uri: window.location.href
        }
    });
}

export async function logout() {
    auth0Client.logout({
        logoutParams: {
            returnTo: window.location.origin
        }
    });
};

document.getElementById("btn-login").addEventListener('click', login);
document.getElementById("btn-logout").addEventListener('click', logout);
