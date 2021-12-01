const { createPrincipalView, createLoginView } = require("./main");
const { app, ipcMain, electron } = require("electron");


require('electron-reload')(__dirname);

app.allowRendererProcessReuse = true;
app.whenReady().then(createLoginView);

ipcMain.on("newPrincipalWindow", (event, arg) => {
    createPrincipalView();
  });

  
