const oracledb = require("oracledb");
const {obtenerConn} = require('../bd/database2')
oracledb.outFormat = oracledb.OUT_FORMAT_ARRAY;

const consultarUsuario = async (parametros) => {
    conn = await obtenerConn();
    const sql = 'select username, password from usuario where username = :usuario and password = :password';
    const result = await conn.execute(sql,parametros) 
    return result.rows[0];
    
  };

  module.exports = {
    consultarUsuario
  };