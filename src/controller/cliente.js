const notifier = require('node-notifier');
const oracledb = require("oracledb");
const {obtenerConn} = require('../bd/database2')
oracledb.outFormat = oracledb.OUT_FORMAT_ARRAY;

const createCliente =  async (cliente) => {

    try {
      const conn = await obtenerConn();
      const sql = 'BEGIN sp_insertarCliente(:id,:nombre,:apellido,:rut,:email,:telefono); END;';
      conn.execute(sql,cliente);
      conn.commit();
      //Notificacion 
      notifier.notify({
        title: 'Siglo 21',
        message: 'Ingresaste un nuevo cliente!'
      });

          // Return the created Cliente
      return cliente;
      
    } catch (error) {
      console.log(error)
      
    }
  };
  const getCliente = async () => {
    const conn = await obtenerConn();
    const sql = "select * from cliente order by id_cliente asc";
    const results = await conn.execute(sql);
    console.log(results.rows);
    return results.rows;
   
  };
  const deleteCliente = async (id_cliente) => {
    const conn = await obtenerConn();
    const result = await conn.execute("BEGIN sp_deleteCliente(:id); END;", id_cliente);
    conn.commit();
    notifier.notify({
      title: 'Siglo 21',
      message: 'Borraste un cliente!'
    });
    return result;
  };
  const getClienteByid = async (id_cliente) => {
    const conn = await obtenerConn();
    const result = await conn.execute("select nombres, apellidos, rut, email, telefono  from cliente where id_cliente = :id", id_cliente);
    console.log(result.rows)
    return result.rows[0];
  };
  const updateCliente = async (cliente) => {
    const conn = await obtenerConn();
    const sql = 'BEGIN sp_updatecliente(:nombre,:apellido,:rut,:email,:id,:fecha_nac); END;';
    const result = await conn.execute(sql,cliente);
    conn.commit();
    console.log(result)
    notifier.notify({
      title: 'Siglo 21',
      message: 'Cambiaste un cliente!'
    });
    return cliente;
    
    //
  };
  

  module.exports = {
    createCliente,
    getCliente,
    deleteCliente,
    getClienteByid,
    updateCliente
  };
  

  /*FIN CLIENTE*/
  