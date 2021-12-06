const loginQuerys = require('../../controller/login')
const { ipcRenderer } = require("electron");
const notifier = require('node-notifier');



loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
        const username = document.querySelector("#user").value;
        const password = document.querySelector("#password").value;
        const parametros = [username, password]
        const consulta = await loginQuerys.consultarUsuario(parametros);
        const comprobarUser = consulta[2];
        console.log(consulta[1])
        //try {
          if (parametros[1] == consulta[1]) {
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
          }else{
            notifier.notify({
              title: "Siglo 21",
              message: "Campos incorrectos!",
            });
          }
          
         
        /*} catch (error) {
          console.log(error)
        }*/
  
});