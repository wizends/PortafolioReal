const { remote } = require("electron");
const main = require("../main");

const bodegaForm = document.querySelector("#bodegaForm");
const bodegaNombre = document.querySelector("#nombre");
const bodegaCategoria = document.querySelector("#categoria");
const bodegaSku = document.querySelector("#sku");
const bodegaMarca = document.querySelector("#marca");
const bodegaStock = document.querySelector("#stock");
const bodegaDetalle = document.querySelector("#detalle");
const btnBodega = document.querySelector("#btnBodega");
const bodegaDescription = document.querySelector("#description");
const BodegaList = document.querySelector("#bodega");


/*NAVEGACION*/
const navegacionCliente = document.getElementById('btnInicio')
const navegacionBodega = document.getElementById('btnBodega')

const tablaBodega = document.getElementById('tablaBodega')
const tablaCliente = document.getElementById('tablaCliente')
const formBodega = document.getElementById('formBodega')
const formCliente = document.getElementById('formCliente')

navegacionCliente.addEventListener('click', async function(event){
  if(tablaCliente != null){
    tablaCliente.className = "vis"
    formCliente.className = "animated fadeInLeft vis"
    tablaBodega.className = "inv"
    formBodega.className = "inv"
  }
})

navegacionBodega.addEventListener('click' , async function(event){
  if(tablaBodega != null){
    tablaBodega.className = "vis"
    formBodega.className = "animated fadeInLeft vis"
    tablaCliente.className = "inv"
    formCliente.className = "inv"
  }
})
/*FIN NAVEGACION*/

/*Bodega CRUD*/
let bodega = [];
let editingStatus = false;
let editbodegaSku;

const deleteBodega = async (sku) => {
  const response = confirm("¿Estas seguro de que deseas borrar este elemento?");
  if (response) {
    await main.deleteBodega(sku);
    await getBodega();
  }
  return;
};

const editBodega = async (sku) => {
  const bodega = await main.getbodegaBysku(sku);
  bodegaNombre.value = bodega.nombre;
  bodegaCategoria.value = bodega.categoria;
  bodegaMarca.value = bodega.marca;
  bodegaStock.value = bodega.stock;
  bodegaDetalle.value = bodega.detalle;

  editingStatus = true;
  editbodegaSku = sku;
};

bodegaForm.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();

    const bodega = {
      sku: bodegaSku.value,
      nombre: bodegaNombre.value,
      categoria: bodegaCategoria.value,
      marca: bodegaMarca.value,
      stock: bodegaStock.value,
      detalle: bodegaDetalle.value
    };

    if (!editingStatus) {
      const savedBodega = await main.createBodega(bodega);
      console.log(savedBodega);
    } else {
      const bodegaUpdated = await main.updateBodega(editbodegaSku, bodega);
      console.log(bodegaUpdated);

      // Reset
      editingStatus = false;
      editbodegaSku = "";
    }

    bodegaForm.reset();
    bodegaNombre.focus();
    getBodega();
  } catch (error) {
    console.log(error);
  }
});

btnBodega.addEventListener("click", async (e) =>{
  
})

function renderBodega(tasks) {
  BodegaList.innerHTML = "";
  tasks.forEach((t) => {
    BodegaList.innerHTML += `
        <tr>
          <th scope="row">${t.sku}</th>
          <td>${t.nombre}</td>
          <td>${t.categoria}</td>
          <td>${t.marca}</td>
          <td>${t.stock}</td>
          <td>${t.detalle}</td>
          <td><button class="btn btn-danger btn-sm" onclick="deleteBodega('${t.sku}')">
          DELETE
        </button>
        <button class="btn btn-secondary btn-sm" onclick="editBodega('${t.sku}')">
          EDIT 
        </button></td>
        </tr>  
    `;
  });
}


/*FIN BODEGA CRUD */




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
      id: "123"/*clienteId.value*/,
      nombre:"ricardo" /*clienteNombre.value*/,
      apellido:"perez"/*clienteApellido.value*/ ,
      rut: "19634503-5"/*clienteRut.value*/,
      fecnac: clienteFecNac.value,
      email:"ricardo@gmail.com" /*clienteEmail.value*/
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

const getBodega = async () => {
  bodega = await main.getBodega();
  renderBodega(bodega);
};

async function init() {
  getBodega();
  getCliente();
}

init();