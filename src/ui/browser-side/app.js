const main = require("../../main");
const platoQuerys = require('../../controller/plato')
const clienteQuerys = require('../../controller/cliente')
const mesaQuerys = require('../../controller/mesa')
const bodegaQuerys = require('../../controller/bodega')

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
const navegacionMesas = document.getElementById('btnMesa')
const navegacionPlato = document.getElementById('btnPlato')

const tablaBodega = document.getElementById('tablaBodega')
const tablaCliente = document.getElementById('tablaCliente')
const tablaMesa = document.getElementById('tablaMesa')
const tablaPlato = document.getElementById('tablaPlato')
const formBodega = document.getElementById('formBodega')
const formCliente = document.getElementById('formCliente')
const formMesa = document.getElementById('formMesa')
const formPlato = document.getElementById('formPlato')

navegacionCliente.addEventListener('click', async function(event){
  if(tablaCliente != null){
    tablaCliente.className = "vis"
    formCliente.className = "animated fadeInLeft vis"
    tablaBodega.className = "inv"
    formBodega.className = "inv"
    tablaMesa.className = "inv"
    formMesa.className = "inv"
    formPlato.className = "inv"
    tablaPlato.className = "inv"
  }
});

navegacionBodega.addEventListener('click' , async function(event){
  if(tablaBodega != null){
    tablaBodega.className = "vis"
    formBodega.className = "animated fadeInLeft vis"
    tablaCliente.className = "inv"
    formCliente.className = "inv"
    tablaMesa.className = "inv"
    formMesa.className = "inv"
    formPlato.className = "inv"
    tablaPlato.className = "inv"
  }
});

navegacionMesas.addEventListener('click', async function(event){
  if(tablaMesa != null){
    tablaMesa.className = "vis"
    formMesa.className = "animated fadeInLeft vis"
    tablaCliente.className = "inv"
    formCliente.className = "inv"
    tablaBodega.className = "inv"
    formBodega.className = "inv"
    formPlato.className = "inv"
    tablaPlato.className = "inv"
  }
})
navegacionPlato.addEventListener('click', async function(event){
  if(tablaPlato != null){
    tablaPlato.className = "vis"
    formPlato.className = "animated fadeInLeft vis"
    tablaMesa.className = "inv"
    formMesa.className = "inv"
    tablaCliente.className = "inv"
    formCliente.className = "inv"
    tablaBodega.className = "inv"
    formBodega.className = "inv"
  }
})
/*FIN NAVEGACION*/

/*CLIENTE CRUD */


const clienteForm = document.querySelector("#clienteForm");
const clienteNombre = document.querySelector("#clienteNombre");
const clienteApellido = document.querySelector("#apellido");
const clienteId = document.querySelector("#idCliente");
const clienteRut = document.querySelector("#rut");
const clienteFecNac = document.querySelector("#fecnac");
const clienteEmail = document.querySelector("#email");
const btnCliente = document.querySelector("#btnCliente");
const clienteList = document.querySelector("#cliente");

let cliente = [];

let ediotClienteId;

const deleteCliente = async (id_cliente) => {
  const response = confirm("¿Estas seguro de que deseas borrar este elemento?");
  if (response) {
    await clienteQuerys.deleteCliente([id_cliente]);
    await getCliente();
  }
  return;
};

const editCliente = async (id_cliente) => {
  const cliente = await clienteQuerys.getClienteByid([id_cliente]);
 
  clienteNombre.value =  cliente[0];
  clienteApellido.value = cliente[1];
  clienteRut.value = cliente[2];
  clienteFecNac.value = cliente[3];
  clienteEmail.value = cliente[4];

  editingStatus = true;
  ediotClienteId = id_cliente;
  
  
};

clienteForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const cliente = [
      id_cliente =clienteId.value ,
      nombres = clienteNombre.value ,
      apellidos = clienteApellido.value ,
      rut = clienteRut.value ,
      fecha_nac = clienteFecNac.value ,
      email = clienteEmail.value 
    ] 
    e.preventDefault();

    if (!editingStatus) {
      const savedCliente = await clienteQuerys.createCliente(cliente);
      console.log(savedCliente);
    } else {
      cliente.push(ediotClienteId);
      cliente.shift();
      const clienteUpdated = await clienteQuerys.updateCliente(cliente);
      console.log(clienteUpdated);
      

      // Reset
      editingStatus = false;
      ediotClienteId = "";
    }

    clienteForm.reset();
    clienteNombre.focus();
    getCliente();

  }
  catch (error) {
    console.log(error);
  }
});

function renderCliente(tasks) {
  clienteList.innerHTML = "";
  tasks.forEach((t) => {
    clienteList.innerHTML += `
        <tr>
          <th scope="row">${t[0]}</th>
          <td>${t[1]}</td>
          <td>${t[2]}</td>
          <td>${t[3]}</td> 
          <td>${t[4]}</td>
          <td>${t[5]}</td>
          <td><button class="btn btn-danger btn-sm" onclick="deleteCliente('${t[0]}')">
          DELETE
        </button>
        <button class="btn btn-secondary btn-sm" onclick="editCliente('${t[0]}')">
          EDIT 
        </button></td>
        </tr>  
    `;
  });
}
/*FIN CLIENTE CRUD*/



/*Bodega CRUD*/
let bodega = [];
let editingStatus = false;
let editbodegaSku;

const deleteBodega = async (sku) => {
  const response = confirm("¿Estas seguro de que deseas borrar este elemento?");
  if (response) {
    await bodegaQuerys.deleteBodega([sku]);
    await getBodega();
  }
  return;
};

const editBodega = async (sku) => {
  const bodega = await bodegaQuerys.getbodegaBysku([sku]);
  bodegaNombre.value = bodega[0];
  bodegaMarca.value = bodega[1];
  bodegaStock.value = bodega[2];
  bodegaDetalle.value = bodega[3];

  editingStatus = true;
  editbodegaSku = sku;
};

bodegaForm.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();

    const bodega = [
      sku = bodegaSku.value,
      marca = bodegaMarca.value,
      stock = parseInt(bodegaStock.value),
      detalle = bodegaDetalle.value,
      nombre = bodegaNombre.value,
      id_user = "1B"
    ];
    if (!editingStatus) {
      const savedBodega = await bodegaQuerys.createBodega(bodega);
      console.log(savedBodega);
    } else {
      /*bodega.push(editBodega);
      bodega.shift();*/
      bodega.shift();
      bodega.unshift(editbodegaSku)
      const bodegaUpdated = await bodegaQuerys.updateBodega(bodega);
      console.log(bodega)
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
          <th scope="row">${t[0]}</th>
          <td>${t[1]}</td>
          <td>${t[2]}</td>
          <td>${t[3]}</td>
          <td>${t[4]}</td>
          <td><button class="btn btn-danger btn-sm" onclick="deleteBodega('${t[0]}')">
          DELETE
        </button>
        <button class="btn btn-secondary btn-sm" onclick="editBodega('${t[0]}')">
          EDIT 
        </button></td>
        </tr>  
    `;
  });
}


/*FIN BODEGA CRUD */





/*MESA CRUD*/
const mesaForm = document.querySelector("#mesaForm");
const mesaCamarero = document.querySelector("#camarero");
const mesaSillas = document.querySelector("#numSillas");
const mesaId = document.querySelector("#idMesa");
const mesaZonas = document.querySelector("#mesaZona");
const btnMesa = document.querySelector("#btnMesa");
const mesaList = document.querySelector("#mesa");

let mesa = [];

let ediotMesaId;

const deleteMesa = async (mesaId) => {
  const response = confirm("¿Estas seguro de que deseas borrar este elemento?");
  if (response) {
    await mesaQuerys.deleteMesa([mesaId]);
    await getMesa();
  }
  return;
};

const editMesa = async (mesaId) => {
  const mesa = await mesaQuerys.getMesaById([mesaId]);
  mesaCamarero.value = mesa[0];
  mesaSillas.value = parseInt(mesa[1]);
  mesaZonas.value = mesa[2];
  
  editingStatus = true;
  ediotMesaId = mesaId;
};

mesaForm.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();

    const mesa = [
      id = mesaId.value,
      camarero = mesaCamarero.value,
      sillas = mesaSillas.value,
      zona = mesaZonas.value,
      id_garzon = '1G'
    ];

    if (!editingStatus) {
      const savedMesa = await mesaQuerys.createMesa(mesa);
      console.log(savedMesa);
    } else {
      mesa.shift();
      mesa.unshift(ediotMesaId)
      console.log(mesa)
      const mesaUpdated = await mesaQuerys.updateMesa(mesa);
      console.log(mesaUpdated);

      // Reset
      editingStatus = false;
      ediotMesaId = "";
    }

    mesaForm.reset();
    mesaId.focus();
    getMesa();
  } catch (error) {
    console.log(error);
  }
});
function renderMesa(tasks) {
  mesaList.innerHTML = "";
  tasks.forEach((t) => {
    mesaList.innerHTML += `
        <tr>
          <th scope="row">${t[0]}</th>
          <td>${t[1]}</td>
          <td>${t[2]}</td>
          <td>${t[3]}</td>
          <td><button class="btn btn-danger btn-sm" onclick="deleteMesa('${t[0]}')">
          DELETE
        </button>
        <button class="btn btn-secondary btn-sm" onclick="editMesa('${t[0]}')">
          EDIT 
        </button></td>
        </tr>  
    `;
  });
}

/* FIN MESA CRUD*/


/*CRUD plato*/
const platoForm = document.querySelector("#platoForm");
const idPlato = document.querySelector("#idPlato");
const nombrePlato = document.querySelector("#nombrePlato");
const stockPlato = document.querySelector("#stockPlato");
const precioPlato = document.querySelector("#precioPlato");
const tipoPlato = document.querySelector("#tipoPlato");
const cocineroPlato = document.querySelector("#cocineroPlato");
const platoList = document.querySelector("#plato");
const orientacionPlato = document.querySelector("#orientacionPlato")

let plato = [];

let ediotPlatoId;

const deletePlato = async (platoId) => {
  const response = confirm("¿Estas seguro de que deseas borrar este elemento?");
  if (response) {
    await platoQuerys.deleteplato([platoId]);
    await getplato();
  }
  return;
};

const editPlato = async (platoId) => {
  const plato = await platoQuerys.getplatoById([platoId]);
  platoCamarero.value = plato[0];
  platoSillas.value = parseInt(plato[1]);
  platoZonas.value = plato[2];
  
  editingStatus = true;
  ediotplatoId = platoId;
};

platoForm.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();
    
    const plato = [
      platoID = idPlato.value,
      platoNombre = nombrePlato.value,
      platoStock = parseInt(stockPlato.value),
      platoTipo = tipoPlato.value,
      platoPrecio = parseInt(precioPlato.value),
      platoOrientacion = orientacionPlato.value,
      platoCocinero = cocineroPlato.value
    ];

    if (!editingStatus) {
      const savedPlato = await platoQuerys.createPlato(plato);
      console.log(savedPlato);
    } else {
      plato.shift();
      plato.unshift(ediotPlatoId)
      console.log(plato)
      const platoUpdated = await platoQuerys.updatePlato(plato);
      console.log(platoUpdated);

      // Reset
      editingStatus = false;
      ediotplatoId = "";
    }

    platoForm.reset();
    idPlato.focus();
    getPlato();
  } catch (error) {
    console.log(error);
  }
});
function renderPlato(tasks) {
  platoList.innerHTML = "";
  tasks.forEach((t) => {
    platoList.innerHTML += `
        <tr>
          <th scope="row">${t[0]}</th>
          <td>${t[1]}</td>
          <td>${t[2]}</td>
          <td>${t[3]}</td>
          <td>${t[4]}</td>
          <td><button class="btn btn-danger btn-sm" onclick="deletePlato('${t[0]}')">
          DELETE
        </button>
        <button class="btn btn-secondary btn-sm" onclick="editPlato('${t[0]}')">
          EDIT 
        </button></td>
        </tr>  
    `;
  });
}

/*
FIN CRUD plato 
 */


const getCliente = async () => {
  cliente = await clienteQuerys.getCliente();
  renderCliente(cliente);
};

const getBodega = async () => {
  bodega = await bodegaQuerys.getBodega();
  renderBodega(bodega);
};

const getMesa = async () =>{
  mesa = await mesaQuerys.getMesa();
  renderMesa(mesa);
}
const getPlato = async () =>{
  plato = await platoQuerys.getPlato();
  renderPlato(plato);
}


async function init() {
  getBodega();
  getCliente();
  getMesa();
  getPlato();
}

init();