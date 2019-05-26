const interfaces = require('os').networkInterfaces();
const production = true;

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
            return production ? '132.232.114.236' : address
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