const axios = require("axios").create({
  baseURL: "http://10.100.115.153:2002"
})

axios.get(`/user/getUserInfo?userId=123`).then(res => {
  console.log(res.data)
})