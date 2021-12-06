const notifier = require('node-notifier');
const oracledb = require("oracledb");
const {obtenerConn} = require('../bd/database2')
oracledb.outFormat = oracledb.OUT_FORMAT_ARRAY;

const consultaDisponibilidad = async(asignacion) =>{
    const conn = await obtenerConn();
    const sql = "select * from mesa where sillas = :cantidad and zona = :zona and estado ='Disponble'";
    const result = await conn.execute(sql,asignacion);
    console.log(result.rows)
    return result.rows
}

const actualizarEstado = async(id) =>{
    const conn = await obtenerConn();
    const sql = "BEGIN sp_updateEstadoMesa(:id); END;"
    await conn.execute(sql,id);
    conn.commit();
}

 module.exports = {
    consultaDisponibilidad,
    actualizarEstado
 }