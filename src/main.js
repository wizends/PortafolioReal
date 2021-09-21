const { BrowserWindow, Notification } = require("electron");
const { getConnection } = require("./database");

let window;

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
  const result = await conn.query("UPDATE bodega SET ? WHERE sku = ?", [
    bodega,
    sku,
  ]);
  console.log(result)
};

function createWindow() {
  window = new BrowserWindow({
    wskuth: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  window.loadFile("src/ui/index.html");
}

module.exports = {
  createWindow,
  createBodega,
  getBodega,
  deleteBodega,
  getbodegaBysku,
  updateBodega
};
