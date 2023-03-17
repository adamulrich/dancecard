import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { localStorageKey } from './constants'
import { createAuth0Client } from '@auth0/auth0-spa-js';

function checkAccount() {
    
    // check local storage for account info
    const accountData = getLocalStorage(localStorageKey);

    if (accountData) {
        // load the account data

    } else {
        // no data, offer login
    }
}

checkAccount();

let auth0Client = null;
const fetchAuthConfig = () => fetch("/auth_config.json");

const configureClient = async () => {
    const response = await fetchAuthConfig();
    const config = await response.json();
    console.log(config);
    auth0Client = await auth0.createAuth0Client({
      domain: config.domain,
      clientId: config.clientId
    });
  };

  window.onload = async () => {

    await configureClient();
  
    updateUI();
  
    const isAuthenticated = await auth0Client.isAuthenticated();
  
    if (isAuthenticated) {
      // show the gated content
      return;
    }
  
    // NEW - check for the code and state parameters
    const query = window.location.search;
    if (query.includes("code=") && query.includes("state=")) {
  
      // Process the login state
      await auth0Client.handleRedirectCallback();
      
      updateUI();
  
      // Use replaceState to redirect the user away and remove the querystring parameters
      window.history.replaceState({}, document.title, "/");
    }
  };
  
  const updateUI = async () => { 
    const isAuthenticated = await auth0Client.isAuthenticated();
  
      document.getElementById("btn-logout").disabled = false;  !isAuthenticated;
      document.getElementById("btn-login").disabled = false;  isAuthenticated;
    
    // NEW - add logic to show/hide gated content after authentication
    if (isAuthenticated) {
      document.getElementById("gated-content").classList.remove("hidden");
  
      document.getElementById(
        "ipt-access-token"
      ).innerHTML = await auth0Client.getTokenSilently();
  
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
