const notifier = require('node-notifier');
const oracledb = require("oracledb");
const {obtenerConn} = require('../bd/database2')
oracledb.outFormat = oracledb.OUT_FORMAT_ARRAY;

const createProveedor = async (proveedor) => {
    try {
      const conn = await obtenerConn();
      sql = 'BEGIN sp_insertarProveedor(:id,:pedido,:fecha,:fechaEntrega,:finanzaId); END;';
      const result = await conn.execute(sql,proveedor);
      console.log(result)
      conn.commit();
  
      // Notify the User
      notifier.notify({
        title: 'Siglo 21',
        message: 'Ingresaste un pedido al proveedor!'
      });
  
      // Return the created Proveedor
      return proveedor;
    } catch (error) {
      console.log(error);
    }
  };
  
  const getProveedor = async () => {
    const conn = await obtenerConn();
    const results = await conn.execute("select id, pedido, fecha_pedido, fecha_entrega from pedido_proveedor order by id asc");
    return results.rows;
  };
  
  const deleteProveedor = async (proveedorId) => {
    const conn = await obtenerConn();
    const sql = "BEGIN sp_deleteProveedor(:id); END;"
    const result = await conn.execute(sql,proveedorId);
    conn.commit();  
    return result;
  };
  
  const getProveedorById = async (proveedorId) => {
    const conn = await obtenerConn();
    const sql = "select pedido, fecha_pedido, fecha_entrega from pedido_proveedor where id = :id"
    const result = await conn.execute(sql,proveedorId);
    return result.rows[0];
  };
  const updateProveedor = async (proveedor) => {
    const conn = await obtenerConn();
    const sql = 'BEGIN sp_updateProveedor(:id,:pedido,:fecha,:fechaEntrega,:idFinanza); END;';
    const result = await conn.execute(sql,proveedor);
    conn.commit();
    console.log(result)
  };

  module.exports = {
    createProveedor,
    getProveedor,
    deleteProveedor,
    getProveedorById,
    updateProveedor
  }