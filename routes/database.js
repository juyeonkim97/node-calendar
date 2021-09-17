const mysql = require('mysql2');
const dotenv=require('dotenv')
dotenv.config() //이걸 써야 dotenv를 쓸 수 있음

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: 3306,
    database: 'node_db',
    charset: 'utf8mb4'
});

function handleDisconnect() {
    pool.getConnection(function (err) {
        if (err) {
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000);
        }
    });

    pool.on('error', function (err) {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            return handleDisconnect();
        } else {
            throw err;
        }
    });
}

handleDisconnect();

module.exports = pool;