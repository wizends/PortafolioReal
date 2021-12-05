const notifier = require('node-notifier');
const oracledb = require("oracledb");
const {obtenerConn} = require('../bd/database2')
oracledb.outFormat = oracledb.OUT_FORMAT_ARRAY;

const consultaDisponibilidad = async(asignacion) =>{
    const conn = await obtenerConn();
    const sql = "select * from mesa where cantidad = :cantidad and zona = :zona";
    const result = conn.execute(sql,asignacion);
    return result.rows
}

 module.exports = {
     consultaDisponibilidad
 }