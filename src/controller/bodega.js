const notifier = require('node-notifier');
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
      notifier.notify({
        title: 'Siglo 21',
        message: 'Ingresaste un nuevo ingrediente!'
      });
  
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
    notifier.notify({
      title: 'Siglo 21',
      message: 'Borraste un ingrediente!'
    });
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
    conn.commit();
    notifier.notify({
      title: 'Siglo 21',
      message: 'Cambiaste un ingrediente!'
    });
    console.log(result)
  };
  module.exports = {
    createBodega,
    getBodega,
    deleteBodega,
    getbodegaBysku,
    updateBodega
  };