const notifier = require('node-notifier');
const oracledb = require("oracledb");
const {obtenerConn} = require('../bd/database2')
oracledb.outFormat = oracledb.OUT_FORMAT_ARRAY;

  const getPedido = async () => {
    const conn = await obtenerConn();
    const results = await conn.execute("select * from Pedido where estado = 'Preparacion'");
    return results.rows;
  };
  
  const cerrarPedido = async (cerrar) => {
    const conn = await obtenerConn();
    const sql = "BEGIN sp_cerrarPedido(:id); END;"
    const result = await conn.execute(sql,cerrar);
    conn.commit();  
    return result;
  };


  module.exports = {
    getPedido,
    cerrarPedido
  }