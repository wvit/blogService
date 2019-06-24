const Axios = require('axios');
const {
    address
} = require('../config/serverConfig').server;

const axios = Axios.create({
    baseURL: address,
    headers: {
        Authorization: '03835a5448b4f71f079f1e2c53f1ff17'
    }
})

axios.get('/app/getBlogs?page=1&pageSize=10').then(res => {
    console.log(res.data)
})