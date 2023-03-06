import axios from 'axios';

const API_URL = 'https://talktunebackend.stockidev.com/';
//const LOCAL_URL = 'http://localhost:8080/';
const user = 'admin';
const password = '8c94f8b586e0e3c2dc5241c6485fd7dafd1eb523b5188f8bb6fadf3cfe7b87c0';


class APIService {
    constructor() {
        this.api = axios.create({
            baseURL: API_URL,
            headers: {
                'Content-Type': 'application/json'
            },
            auth: {
                username: user,
                password: password
            }
        });
    }

    get(path, params) {
        return this.api.get(path, params);
    }

    post(path, data) {
        return this.api.post(path, data);
    }

    put(path, data) {
        return this.api.put(path, data);
    }

    delete(path) {
        return this.api.delete(path);
    }

    getAnalysis(text)  {
        //var sentiment = this.api.post('sentiment/short/eng', {message: text});
        var explanation = this.api.post('sentiment/long/eng', {message: text});
        return Promise.all([explanation]);
    }

    getRephrase(text, tone) {
        var rephrase = this.api.post('rephrase/eng', {message: text, tone: tone});
        return Promise.all([rephrase]);
    }

}


export default new APIService();