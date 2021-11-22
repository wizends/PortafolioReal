const oracledb = require("oracledb");
const {obtenerConn} = require('../bd/database2')
oracledb.outFormat = oracledb.OUT_FORMAT_ARRAY;

const createBodega = async (bodega) => {
    try {
      const conn = await obtenerConn();
    
  
      const sql = 'BEGIN sp_insertarBodega(:sku,:marca,:stock,:detalle,:nombre,:id_ub); END;';
      console.log(bodega)
      conn.execute(sql,bodega);
      conn.commit();
  
  
      // Notify the User
      new Notification({
        title: "Electron Mysql",
        body: "New bodega Saved Successfully",
      }).show();
  
      // Return the created bodega
      return bodega;
    } catch (error) {
      console.log(error);
    }
  };
  
  const getBodega = async () => {
    const conn = await obtenerConn();
    const results = await conn.execute("SELECT sku,nombre,marca,stock,detalle FROM bodega");
    return results.rows;
  };
  
  const deleteBodega = async (sku) => {
    const conn = await obtenerConn();
    const result = await conn.execute("BEGIN sp_deleteBodega(:sku); END;", sku);
    conn.commit();
    return result;
  };
  
  const getbodegaBysku = async (sku) => {
    const conn = await obtenerConn();
    const result = await conn.execute("select nombre, marca, stock, detalle from bodega where sku = :sku", sku);
    return result.rows[0];
  };
  const updateBodega = async (bodega) => {
    const conn = await obtenerConn();
    const sql = 'BEGIN sp_updatebodega(:sku,:marca,:stock,:detalle,:nombre,:id_user); END;';
    const result = await conn.execute(sql,bodega);
    conn.commit;
    console.log(result)
  };
  module.exports = {
    createBodega,
    getBodega,
    deleteBodega,
    getbodegaBysku,
    updateBodega
  };