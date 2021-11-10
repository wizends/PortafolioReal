const main = require("../main");
const { ipcRenderer } = require("electron");
const notifier = require('node-notifier');

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
        const username = document.querySelector("#user").value;
        const password = document.querySelector("#password").value;
        const parametros = [username, password]
        const consulta = await main.consultarUsuario(parametros);
        try {
          parametros[1] != consulta[1]
          ipcRenderer.send("newPrincipalWindow")
        } catch (error) {
          notifier.notify({
            title: 'Error',
            message: 'Campos incorrectos, llena nuevamente!'
          });
        }
        /*
        if(parametros[1] != consulta[1]){
          notifier.notify({
            title: 'Error',
            message: 'Campos incorrectos, llena nuevamente!'
          });
          
          
        }else {
          ipcRenderer.send("newPrincipalWindow")
        }*/
});