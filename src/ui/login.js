const main = require("../main");
const { ipcRenderer } = require("electron");
const notifier = require('node-notifier');

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
        const user = document.querySelector("#user").value;
        const password = document.querySelector("#password").value;
        const consulta =  await main.consultarUsuario(user, password);
        if(password != consulta.password){
          notifier.notify({
            title: 'Error',
            message: 'Campos incorrectos, llena nuevamente!'
          });
          
        }else {
          ipcRenderer.send("newPrincipalWindow")
        }
});