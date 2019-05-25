const interfaces = require('os').networkInterfaces();
const production = false;

module.exports = {
    dbs: 'mongodb://localhost/blogDB',
    server: {
        get host() {
            let address = '';
            for (let devName in interfaces) {
                interfaces[devName].forEach(item => {
                    if (item.family === 'IPv4' && item.address !== '127.0.0.1') {
                        address = item.address;
                    }
                })
            }
            return production ? '172.27.16.14' : address
        },
        get port() {
            return 1999
        }
    },
    redis: {
        get host() {
            return '127.0.0.1'
        },
        get port() {
            return 6379
        }
    },
}