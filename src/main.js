const { BrowserWindow} = require("electron");

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
  childWindow.loadFile("src/ui/views/logged-on.html")
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

  mainWindow.loadFile("src/ui/views/login.html");
}
module.exports = {
  createPrincipalView,
  createLoginView
};
