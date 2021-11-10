const { BrowserWindow, Notification} = require("electron");
const oracledb = require("oracledb");
const {obtenerConn} = require('./database2')
oracledb.outFormat = oracledb.OUT_FORMAT_ARRAY;

/*CLIENTE*/
const createCliente =  async (cliente) => {

  try {
    const conn = await obtenerConn();
    const sql = 'BEGIN  sp_insertarCliente(:id,:nombre,:apellido,:rut,:fecha_nac,:email); END;';
    conn.execute(sql,cliente);
    conn.commit();
        // Return the created Cliente
    return cliente;
    
  } catch (error) {
    console.log(error);
  }
};
const getCliente = async () => {
  const conn = await obtenerConn();
  const sql = "select * from cliente";
  const results = await conn.execute(sql);
  console.log(results.rows);
  return results.rows;
 
};
const deleteCliente = async (id_cliente) => {
  const conn = await obtenerConn();
  const result = await conn.execute("DELETE FROM cliente WHERE id = ?", id_cliente);
  return result;
};
const getClienteByid = async (id_cliente) => {
  const conn = await obtenerConn();
  const result = await conn.execute("select nombres, apellidos, rut, TO_CHAR(TO_DATE(fecha_nac,'DD-MM-YYYY'),'yyyy-MM-dd') AS fecha, email  from cliente where id_cliente = :id", id_cliente);
  console.log(result.rows)
  return result.rows[0];
};
const updateCliente = async (id_cliente, cliente) => {
  const conn = await obtenerConn();
  const result = await conn.execute("UPDATE cliente SET :cliente WHERE id_cliente = :id_cliente", [cliente, id_cliente]);
  console.log(result)
};
/*FIN CLIENTE*/

/*LOGIN listo con sql*/
const consultarUsuario = async (parametros) => {
  conn = await obtenerConn();
  const sql = 'select username, password from usuario where username = :usuario and password = :password';
  const result = await conn.execute(sql,parametros) 
  return result.rows[0];
  
};
/*FIN LOGIN */



/*BODEGA*/
const createBodega = async (bodega) => {
  try {
    const conn = await getConnection();
    bodega.sku = parseFloat(bodega.sku);
    const result = await conn.query("INSERT INTO bodega SET ?", bodega);
    bodega.sku = result.insertsku;

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
  const conn = await getConnection();
  const results = await conn.query("SELECT * FROM bodega");
  return results;
};

const deleteBodega = async (sku) => {
  const conn = await getConnection();
  const result = await conn.query("DELETE FROM bodega WHERE sku = ?", sku);
  return result;
};

const getbodegaBysku = async (sku) => {
  const conn = await getConnection();
  const result = await conn.query("SELECT * FROM bodega WHERE sku = ?", sku);
  return result[0];
};
const updateBodega = async (sku, bodega) => {
  const conn = await getConnection();
  const result = await conn.query("UPDATE bodega SET ? WHERE sku = ?", [bodega,sku,]);
  console.log(result)
};
/*FIN BODEGA*/


/*MESAS*/
const createMesa = async (mesa) => {
  try {
    const conn = await getConnection();
    const result = await conn.query("INSERT INTO mesa SET ?", mesa);
    mesa.id = result.insertid;

    // Notify the User
    new Notification({
      title: "Electron Mysql",
      body: "New mesa Saved Successfully",
    }).show();

    // Return the created mesa
    return mesa;
  } catch (error) {
    console.log(error);
  }
};

const getMesa = async () => {
  const conn = await getConnection();
  const results = await conn.query("SELECT * FROM mesa");
  return results;
};

const deleteMesa = async (mesaId) => {
  const conn = await getConnection();
  const result = await conn.query("DELETE FROM mesa WHERE id = ?", mesaId);
  return result;
};

const getMesaById = async (mesaId) => {
  const conn = await getConnection();
  const result = await conn.query("SELECT * FROM mesa WHERE id = ?", mesaId);
  return result[0];
};
const updateMesa = async (mesaId, mesa) => {
  const conn = await getConnection();
  const result = await conn.query("UPDATE mesa SET ? WHERE id = ?", [mesa,mesaId,]);
  console.log(result)
};
/*FIN MESAS*/
function createPrincipalView() {
  childWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });
  childWindow.loadFile("src/ui/index.html")
  childWindow.once("ready-to-show", () => {
    childWindow.show();
  });
}

function createLoginView() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
  });

  mainWindow.loadFile("src/ui/login.html");
}
module.exports = {
  createPrincipalView,
  createLoginView,
  consultarUsuario,
  createBodega,
  getBodega,
  deleteBodega,
  getbodegaBysku,
  updateBodega,
  createCliente,
  getCliente,
  deleteCliente,
  getClienteByid,
  updateCliente,
  createMesa,
  getMesa,
  getMesaById,
  deleteMesa,
  updateMesa
};
