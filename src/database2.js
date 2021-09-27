const sql = require("mssql");


const connection = sql.connectToDatabase({
    user: 'DESKTOP-8RVDL32',
    password: '91948931',
    server: 'localhost',
    database: 'siglo21',
    options: {
        instanceName: 'DEV17'
        , encrypt: false
    }
  });

function connectToDatabase() {
  return connection;
}

module.exports = { connectToDatabase };