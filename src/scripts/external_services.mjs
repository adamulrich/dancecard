const baseURL = import.meta.env.VITE_CONTENT_SERVER;
import { getCookie, getLocalStorage } from "./utils"; 

export const routeList = {
    stake: '/stake',
    ward: '/ward',
    wards: '/wards',
    user: '/user',
    region: '/region',
    schedule: '/schedule',
    futureSchedule: '/schedule/future'

}

async function convertToJson(res) {
    const result = await res.json();
    if (res.ok) {
        return result;
    } 

}

export default class ExternalServices {
    

    async getData(route) {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const response = await fetch(baseURL + `${route}`, options);
        if (response.ok) {
            return await convertToJson(response);
        } else {
            return null;
        }
    }

    async postData(route, data) {
        let res = {};
        let result = '';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            oidc: getLocalStorage()
        }
        try {
            console.log(baseURL + route);
            console.log(options);
            res = await fetch(baseURL + route, options);
            if (res.ok) {
                result = await res.json();
            } else {
                console.log(`error: ${res}`)
            }
            
        } catch (error) {
            console.log(error)
            throw { name: 'servicesError', message: JSON.stringify(error) };
        };
        return result;
    }

    async putData(route, data, id) {
        let res = {};
        let result = '';
        let uriId = encodeURIComponent(id);
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            oidc: getLocalStorage()
        }
        try {
            res = await fetch(`${baseURL}${route}/${uriId}`, options);
            if (res.ok) {
                result = await res.json();
            } else {
            
            }
            
        } catch (error) {
            throw { error };
        };
        return result;
    }

    async deleteData(route, id) {
        let res = {};
        let result = '';
        const options = {
            method: 'DELETE',
        }
        try {
            res = await fetch(`${baseURL}${route}/:${id}`, options);
            if (res.ok) {
                result = await res.json();
            } else {
            
            }
            
        } catch (error) {
            throw { name: 'servicesError', message: JSON.stringify(res) };
        };
        return result;
    }

    

}
