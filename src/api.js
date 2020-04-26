import axios from 'axios';

export default axios.create({
    baseURL: `http://pizzatest.loc/api/`
});