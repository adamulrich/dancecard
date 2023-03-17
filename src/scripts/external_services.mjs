const baseURL = import.meta.env.VITE_CONTENT_SERVER;

export const routeList = {
    stake: '/stake',
    ward: '/ward',
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
    constructor(category) {
        this.category = category;
    }

    async getData(route) {
        const response = await fetch(baseURL + `${route}`);
        return await convertToJson(response);
    }

    async postData(route, data) {
        let res = {};
        let result = '';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        try {
            res = await fetch(baseURL + route, options).then();
            if (res.ok) {
                result = await res.json();
            } else {
            
            }
            
        } catch (error) {
            throw { name: 'servicesError', message: JSON.stringify(res) };
        };
        return result;
    }

    async putData(route, data, id) {
        let res = {};
        let result = '';
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        try {
            res = await fetch(`${baseURL}${route}/:${id}`, options).then();
            if (res.ok) {
                result = await res.json();
            } else {
            
            }
            
        } catch (error) {
            throw { name: 'servicesError', message: JSON.stringify(res) };
        };
        return result;
    }

    async deleteData(route, id) {
        let res = {};
        let result = '';
        const options = {
            method: 'DELETE'}
        try {
            res = await fetch(`${baseURL}${route}/:${id}`, options).then();
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
