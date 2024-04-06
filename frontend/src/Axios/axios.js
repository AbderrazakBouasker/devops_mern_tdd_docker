//const axios = require("axios");
import axios from 'axios';
const instance = axios.default.create({
    baseURL:"http://localhost:8000/api"
})
export default instance;
