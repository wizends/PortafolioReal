const { BrowserWindow, app} = require("electron");

function createBodegaView() {
  bodegaWindow = new BrowserWindow({
    simpleFullscreen: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });
  bodegaWindow.loadFile("src/ui/views/bodega.html")
  bodegaWindow.once("ready-to-show", () => {
    bodegaWindow.show();
  });
}

function createClienteView() {
  clienteWindow = new BrowserWindow({
    simpleFullscreen: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });
  clienteWindow.loadFile("src/ui/views/cliente.html")
  clienteWindow.once("ready-to-show", () => {
    clienteWindow.show();
  });
}


function createFinanzaView() {
  finanzaWindow = new BrowserWindow({
    simpleFullscreen: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });
  finanzaWindow.loadFile("src/ui/views/finanza.html")
  finanzaWindow.once("ready-to-show", () => {
    finanzaWindow.show();
  });
}

function createCocinaView() {
  CocinaWindow = new BrowserWindow({
    simpleFullscreen: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });
  CocinaWindow.loadFile("src/ui/views/cocina.html")
  CocinaWindow.once("ready-to-show", () => {
    CocinaWindow.show();
  });
}


function createPrincipalView() {
  childWindow = new BrowserWindow({
    simpleFullscreen: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });
  childWindow.loadFile("src/ui/views/logged-on.html")
  childWindow.once("ready-to-show", () => {
  childWindow.show();
  });
}

function createLoginView() {
  loginWindow = new BrowserWindow({
    simpleFullscreen: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });
  loginWindow.loadFile("src/ui/views/login.html")
  loginWindow.once("ready-to-show", () => {
  loginWindow.show();  
  });
}

function createSeleccionView() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
  });
  mainWindow.loadFile("src/ui/views/seleccion.html");
  mainWindow.on('close', () => {
    app.quit();
  })
}
module.exports = {
  createPrincipalView,
  createLoginView,
  createCocinaView,
  createBodegaView,
  createFinanzaView,
  createSeleccionView,
  createClienteView
};
