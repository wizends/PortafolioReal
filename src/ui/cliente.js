const { remote } = require("electron");
const main = require("../main");

const clienteForm = document.querySelector("#clienteForm");
const clienteNombre = document.querySelector("#clienteNombre");
const clienteApellido = document.querySelector("#apellido");
const clienteId = document.querySelector("#id");
const clienteRut = document.querySelector("#rut");
const clienteFecNac = document.querySelector("#fecnac");
const clienteEmail = document.querySelector("#email");
const btnCliente = document.querySelector("#btnCliente");
const clienteList = document.querySelector("#cliente");

let cliente = [];
let editingStatus = false;
let ediotClienteId;

const deleteCliente = async (id) => {
  const response = confirm("¿Estas seguro de que deseas borrar este elemento?");
  if (response) {
    await main.deleteCliente(id);
    await getCliente();
  }
  return;
};

const editCliente = async (id) => {
  const cliente = await main.getClienteByid(id);
  clienteNombre.value = cliente.nombre;
  clienteApellido.value = cliente.apellido;
  clienteRut.value = cliente.rut;
  clienteFecNac.value = cliente.fecnac;
  clienteEmail.value = cliente.email;

  editingStatus = true;
  ediotClienteId = id;
};

clienteForm.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();

    const cliente = {
      id: clienteId.value,
      nombre: clienteNombre.value,
      apellido: clienteApellido.value,
      rut: clienteRut.value,
      fecnac: clienteFecNac.value,
      email: clienteEmail.value
    };

    if (!editingStatus) {
      const savedCliente = await main.createCliente(cliente);
      console.log(savedCliente);
    } else {
      const clienteUpdated = await main.updateCliente(ediotClienteId, cliente);
      console.log(clienteUpdated);

      // Reset
      editingStatus = false;
      ediotClienteId = "";
    }

    clienteForm.reset();
    clienteNombre.focus();
    getCliente();
  } catch (error) {
    console.log(error);
  }
});

btnCliente.addEventListener("click", async (e) =>{
  
})

function renderCliente(tasks) {
  clienteList.innerHTML = "";
  tasks.forEach((t) => {
    clienteList.innerHTML += `
        <tr>
          <th scope="row">${t.id}</th>
          <td>${t.nombre}</td>
          <td>${t.apellido}</td>
          <td>${t.rut}</td>
          <td>${t.fecnac}</td>
          <td>${t.email}</td>
          <td><button class="btn btn-danger btn-sm" onclick="deleteCliente('${t.id}')">
          DELETE
        </button>
        <button class="btn btn-secondary btn-sm" onclick="editCliente('${t.id}')">
          EDIT 
        </button></td>
        </tr>  
    `;
  });
}

const getCliente = async () => {
  cliente = await main.getCliente();
  renderCliente(cliente);
};

async function init() {
  getCliente();
}

init();

