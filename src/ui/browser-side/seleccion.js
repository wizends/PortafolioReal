const { ipcRenderer } = require("electron");

const admin = document.querySelector('#btnAdmin')
const cliente = document.querySelector('#btnCliente')

admin.addEventListener('click', async (e) =>{
    ipcRenderer.send("newLoginWindow");
    
})

cliente.addEventListener('click', async (e) =>{
    ipcRenderer.send("newClienteWindow");
    
})