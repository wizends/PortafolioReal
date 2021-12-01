const notifier = require('node-notifier');
const oracledb = require("oracledb");
const {obtenerConn} = require('../bd/database2')
oracledb.outFormat = oracledb.OUT_FORMAT_ARRAY;

const createMesa = async (mesa) => {
    try {
      const conn = await obtenerConn();
      sql = 'BEGIN sp_insertarMesa(:id,:garzon,:sillas,:zona,:id_garzon); END;';
      const result = await conn.execute(sql,mesa);
      console.log(result)
      conn.commit();
  
      // Notify the User
      notifier.notify({
        title: 'Siglo 21',
        message: 'Ingresaste una mesa!'
      });
  
      // Return the created mesa
      return mesa;
    } catch (error) {
      console.log(error);
    }
  };
  
  const getMesa = async () => {
    const conn = await obtenerConn();
    const results = await conn.execute("SELECT id,camarero,sillas,zona FROM mesa");
    return results.rows;
  };
  
  const deleteMesa = async (mesaId) => {
    const conn = await obtenerConn();
    const sql = "BEGIN sp_deletemesa(:id); END;"
    const result = await conn.execute(sql,mesaId);
    conn.commit();  
    notifier.notify({
      title: 'Siglo 21',
      message: 'Borraste una mesa!'
    });
    return result;
  };
  
  const getMesaById = async (mesaId) => {
    const conn = await obtenerConn();
    const sql = "select camarero, sillas, zona from mesa where id = :id"
    const result = await conn.execute(sql,mesaId);
    return result.rows[0];
  };
  const updateMesa = async (mesa) => {
    const conn = await obtenerConn();
    const sql = 'BEGIN sp_updateMesa(:id,:garzon,:sillas,:zona,:id_garzon); END;';
    const result = await conn.execute(sql,mesa);
    conn.commit();
    notifier.notify({
      title: 'Siglo 21',
      message: 'Hiciste cambios en las mesas!'
    });
    console.log(result)
  };


  module.exports = {
    createMesa,
    getMesa,
    getMesaById,
    deleteMesa,
    updateMesa
  };
  

  /*FIN MESAS*/