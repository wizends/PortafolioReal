const oracledb = require("oracledb");
const {obtenerConn} = require('../bd/database2')
oracledb.outFormat = oracledb.OUT_FORMAT_ARRAY;

const createPlato = async (plato) => {
    try {
      const conn = await obtenerConn();
      sql = 'BEGIN sp_insertarPlato(:id,:nombre,:stock,:tipo,:precio,:orientacion,:menuid,:cocinaid); END;';
      const result = await conn.execute(sql,plato);
      console.log(result)
      conn.commit();
  
      // Notify the User
      new Notification({
        title: "Electron Mysql",
        body: "New Plato Saved Successfully",
      }).show();
  
      // Return the created Plato
      return plato;
    } catch (error) {
      console.log(error);
    }
  };
  
  const getPlato = async () => {
    const conn = await obtenerConn();
    const results = await conn.execute("select id, nombre, stock, tipo, precio from plato");
    return results.rows;
  };
  
  const deletePlato = async (platoId) => {
    const conn = await obtenerConn();
    const sql = "BEGIN sp_deletePlato(:id); END;"
    const result = await conn.execute(sql,platoId);
    conn.commit();  
    return result;
  };
  
  const getPlatoById = async (platoId) => {
    const conn = await obtenerConn();
    const sql = "select nombre, stock, tipo, precio from Plato where id = :id"
    const result = await conn.execute(sql,platoId);
    return result.rows[0];
  };
  const updatePlato = async (plato) => {
    const conn = await obtenerConn();
    const sql = 'BEGIN sp_updatePlato(:id,:nombre,:stock,:tipo,:precio ); END;';
    const result = await conn.execute(sql,plato);
    conn.commit();
    console.log(result)
  };

  module.exports = {
    createPlato,
    getPlato,
    deletePlato,
    getPlatoById,
    updatePlato
  }