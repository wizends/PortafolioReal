const { BrowserWindow, Notification} = require("electron");
const { getConnection } = require("./database");

let window;

/*CLIENTE*/
const createCliente = async (cliente) => {
  try {
    const conn = await getConnection();
    cliente.id = parseFloat(cliente.id);
    const result = await conn.query("INSERT INTO cliente SET ?", cliente);
    cliente.id = result.insertid;

    // Notify the User
    new Notification({
      title: "Electron Mysql",
      body: "New Cliente Saved Successfully",
    }).show();

    // Return the created Cliente
    return cliente;
  } catch (error) {
    console.log(error);
  }
};
const getCliente = async () => {
  const conn = await getConnection();
  const results = await conn.query("SELECT * FROM cliente");
  return results;
};
const deleteCliente = async (id) => {
  const conn = await getConnection();
  const result = await conn.query("DELETE FROM cliente WHERE id = ?", id);
  return result;
};
const getClienteByid = async (id) => {
  const conn = await getConnection();
  const result = await conn.query("SELECT * FROM cliente WHERE id = ?", id);
  return result[0];
};
const updateCliente = async (id, cliente) => {
  const conn = await getConnection();
  const result = await conn.query("UPDATE cliente SET ? WHERE id = ?", [cliente,id,]);
  console.log(result)
};
/*FIN CLIENTE*/













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


const consultarUsuario = async (user, password) => {
    const conn = await getConnection();
    const result = await conn.query("SELECT * FROM user WHERE username = ? And password = ?", [user, password,]);
    return result[0];
};
const updateBodega = async (sku, bodega) => {
  const conn = await getConnection();
  const result = await conn.query("UPDATE bodega SET ? WHERE sku = ?", [bodega,sku,]);
  console.log(result)
};
/*FIN BODEGA*/
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

};
