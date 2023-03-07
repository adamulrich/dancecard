function convertToJson(res) {
    if (res.ok) {
        return res.json();
    }
}

export default class Data {
    constructor(entity) {
        this.entity = entity;
        this.path = `../json/${this.entity}.json`;
    }
    getData() {
        return fetch(this.path)
            .then(convertToJson)
            .then((data) => data);

    }
}