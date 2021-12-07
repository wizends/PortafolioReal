const { createPrincipalView, createLoginView ,createBodegaView,createFinanzaView,createCocinaView,createSeleccionView,createClienteView} = require("./main");
const { app, ipcMain, electron } = require("electron");


require('electron-reload')(__dirname);

app.allowRendererProcessReuse = true;
app.whenReady().then(createSeleccionView);




ipcMain.on("newPrincipalWindow", (event, arg) => {
  createPrincipalView();
});
ipcMain.on("newBodegaWindow", (event, arg) => {
  createBodegaView();
});
ipcMain.on("newFinanzaWindow", (event, arg) => {
  createFinanzaView();
});

ipcMain.on("newCocinaWindow", (event, arg) => {
  createCocinaView();
});
ipcMain.on("newLoginWindow", (event, arg) => {
  createLoginView();
});
ipcMain.on("newClienteWindow", (event, arg) => {
  createClienteView();
});


  
