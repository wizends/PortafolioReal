const notifier = require('node-notifier');
const oracledb = require("oracledb");
const {obtenerConn} = require('../bd/database2')
oracledb.outFormat = oracledb.OUT_FORMAT_ARRAY;

const createCaja = async (caja) => {
    try {
      const conn = await obtenerConn();
      sql = 'BEGIN sp_insertarCaja(:id,:fechaInicio,:fechaFinal,:saldoInicial,:saldoFinal,:encargado,:finanzaId); END;';
      const result = await conn.execute(sql,caja);
      console.log(result)
      conn.commit();
  
      // Notify the User
      notifier.notify({
        title: 'Siglo 21',
        message: 'Caja abierta!'
      });
  
      // Return the created Caja
      return caja;
    } catch (error) {
      console.log(error);
    }
  };
  
  const getCaja = async () => {
    const conn = await obtenerConn();
    const results = await conn.execute("select * from caja");
    return results.rows;
  };
  
  const cerrarCaja = async (cerrar) => {
    const conn = await obtenerConn();
    const sql = "BEGIN sp_cerrarCaja(:id,:fechaFinal,:saldoFinal); END;"
    const result = await conn.execute(sql,cerrar);
    conn.commit();  
    return result;
  };
  
  const getCajaById = async (cajaId) => {
    const conn = await obtenerConn();
    const sql = "select nombre, stock, tipo, precio, menu_id, cocina_id from caja where id = :id"
    const result = await conn.execute(sql,cajaId);
    return result.rows[0];
  };
  const updateCaja = async (caja) => {
    const conn = await obtenerConn();
    const sql = 'BEGIN sp_updateCaja(:id,:nombre,:stock,:tipo,:precio,:menuid,:cocinaid); END;';
    const result = await conn.execute(sql,caja);
    conn.commit();
    console.log(result)
  };

  const getNombreFinanza = async (codigo) =>{
    const conn = await obtenerConn();
    const sql = "select nombre||' '||apellido from finanza where id = :id"
    const result = await conn.execute(sql,codigo);
    console.log(result.rows[0])
    return result.rows[0];
    
  }

  module.exports = {
    createCaja,
    getCaja,
    cerrarCaja,
    getCajaById,
    updateCaja,
    getNombreFinanza
  }