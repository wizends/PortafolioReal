const { createPrincipalView, createLoginView } = require("./main");
const { app, ipcMain } = require("electron");


require('./database');

require('electron-reload')(__dirname);

app.allowRendererProcessReuse = true;
app.whenReady().then(createLoginView);

ipcMain.on("newPrincipalWindow", (event, arg) => {
    createPrincipalView();
  });
