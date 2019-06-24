const interfaces = require('os').networkInterfaces();
const production = false;

module.exports = {
    dbs: 'mongodb://localhost/blogDB',
    production,
    server: {
        //启动服务地址
        get host() {
            let ip = '';
            for (let devName in interfaces) {
                interfaces[devName].forEach(item => {
                    if (item.family === 'IPv4' && item.address !== '127.0.0.1') {
                        ip = item.address;
                    }
                })
            }
            return production ? '1wei.cc' : ip;
        },
        //端口
        get port() {
            return 1999
        },
        //远程地址
        get address() {
            return `${production?'https':'http'}://${this.host}:${this.port}`
        }
    }
}