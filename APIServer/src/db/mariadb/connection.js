const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: "127.0.0.1",
    port: 3308,
    user: "root",
    password: "1234",
    database: "lunchdb",
    connectionLimit: 10,
    dateStrings: true
});

async function getDBConnection() {
    connection = await pool.getConnection();
    return connection;
}

module.exports = getDBConnection;