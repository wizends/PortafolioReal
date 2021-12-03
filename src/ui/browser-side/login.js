const loginQuerys = require('../../controller/login')
const { ipcRenderer } = require("electron");
const notifier = require('node-notifier');



loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
        const username = document.querySelector("#user").value;
        const password = document.querySelector("#password").value;
        const parametros = [username, password]
        const consulta = await loginQuerys.consultarUsuario(parametros);
        const comprobarUser = consulta[2]
        console.log(comprobarUser) 
        try {
          parametros[1] != consulta[1]
          if (comprobarUser == 'Administrador') {
            ipcRenderer.send("newPrincipalWindow");
          }
          if (comprobarUser == 'Bodega') {
            ipcRenderer.send("newBodegaWindow");
          }
          if (comprobarUser == 'Finanza') {
            ipcRenderer.send("newFinanzaWindow");
          }
          if (comprobarUser == 'Cocina') {
            ipcRenderer.send("newCocinaWindow");
          }
        } catch (error) {
          notifier.notify({
            title: 'Error',
            message: 'Campos incorrectos, llena nuevamente!'
          });
        }
  
});