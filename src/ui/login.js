const main = require("../main");
const { ipcRenderer } = require("electron");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        const user = document.querySelector("#user").value;
        const password = document.querySelector("#password").value;
        const consulta =  await main.consultarUsuario(user, password);
        if (consulta.password != password) {
          document.getElementById("mensaje").innerHTML = consulta.user;
        } else {
          ipcRenderer.send("newPrincipalWindow")
        }
    } catch (error) {
        const response = confirm(error);
    }
});


const navegacionUsuario = document.getElementById('btnInicio')
const navegacionBodega = document.getElementById('btnBodega')

const tablaBodega = document.getElementById('tablaBodega')
const tablaUsuario = document.getElementById('tablaUsuario')

navegacionUsuario.addEventListener('click', async function(event){
  if(tablaUsuario != null){
    tablaUsuario.className = "table table-hover vis"
    tablaBodega.className = "inv"
  }
})

navegacionBodega.addEventListener('click' , async function(event){
  if(tablaUsuario != null){
    tablaBodega.className = "table table-hover vis"
    tablaUsuario.className = "inv"
  }
})

