const main = require("../../main");
const platoQuerys = require('../../controller/plato')
const clienteQuerys = require('../../controller/cliente')
const mesaQuerys = require('../../controller/mesa')
const bodegaQuerys = require('../../controller/bodega')
const ProveedorQuerys = require('../../controller/proveedores')
const cajaQuerys = require('../../controller/caja')

const bodegaForm = document.querySelector("#bodegaForm");
const bodegaNombre = document.querySelector("#nombre");
const bodegaCategoria = document.querySelector("#categoria");
const bodegaSku = document.querySelector("#sku");
const bodegaMarca = document.querySelector("#marca");
const bodegaStock = document.querySelector("#stock");
const bodegaDetalle = document.querySelector("#detalle");
const bodegaDescription = document.querySelector("#description");
const BodegaList = document.querySelector("#bodega");

/*NAVEGACION*/
const navegacionCliente = document.getElementById('btnInicio')
const navegacionBodega = document.getElementById('btnBodega')
const navegacionMesas = document.getElementById('btnMesa')
const navegacionPlato = document.getElementById('btnPlato')
const navegacionProveedor = document.getElementById('btnProveedor')
const navegacionCaja = document.getElementById('btnCaja')
const navegacionInforme = document.getElementById('btnInforme')

const tablaBodega = document.getElementById('tablaBodega')
const tablaCliente = document.getElementById('tablaCliente')
const tablaMesa = document.getElementById('tablaMesa')
const tablaPlato = document.getElementById('tablaPlato')
const tablaProveedor = document.getElementById('tablaProveedor')
const tablaCaja = document.getElementById('tablaCaja')

const contenidoInforme = document.getElementById('contenidoInforme')


const formBodega = document.getElementById('formBodega')
const formCliente = document.getElementById('formCliente')
const formMesa = document.getElementById('formMesa')
const formPlato = document.getElementById('formPlato')
const formProveedor = document.getElementById('formProveedor')
const formCaja = document.getElementById('formCaja')

navegacionCliente.addEventListener('click', async function(event){
  if(tablaCliente != null){
    tablaCliente.className = "col-md-10 animated fadeInLeft vis"
    formCliente.className = "col-md-10 animated fadeInLeft vis"
    tablaBodega.className = "inv"
    formBodega.className = "inv"
    tablaMesa.className = "inv"
    formMesa.className = "inv"
    formPlato.className = "inv"
    tablaPlato.className = "inv"
    tablaProveedor.className = "inv"
    formProveedor.className = "inv"
    formCaja.className = "inv"
    tablaCaja.className = "inv"
  }
});

navegacionBodega.addEventListener('click' , async function(event){
  if(tablaBodega != null){
    tablaBodega.className = "col-md-10 animated fadeInLeft vis"
    formBodega.className = "col-md-10 animated fadeInLeft vis"
    tablaCliente.className = "inv"
    formCliente.className = "inv"
    tablaMesa.className = "inv"
    formMesa.className = "inv"
    formPlato.className = "inv"
    tablaPlato.className = "inv"
    tablaProveedor.className = "inv"
    formProveedor.className = "inv"
    formCaja.className = "inv"
    tablaCaja.className = "inv"
  }
});

navegacionMesas.addEventListener('click', async function(event){
  if(tablaMesa != null){
    tablaMesa.className = "col-md-10 animated fadeInLeft vis"
    formMesa.className = "col-md-10 animated fadeInLeft vis"
    tablaCliente.className = "inv"
    formCliente.className = "inv"
    tablaBodega.className = "inv"
    formBodega.className = "inv"
    formPlato.className = "inv"
    tablaPlato.className = "inv"
    tablaProveedor.className = "inv"
    formProveedor.className = "inv"
    formCaja.className = "inv"
    tablaCaja.className = "inv"

  }
})
navegacionPlato.addEventListener('click', async function(event){
  if(tablaPlato != null){
    tablaPlato.className = "col-md-10 animated fadeInLeft vis"
    formPlato.className = "col-md-10 animated fadeInLeft vis"
    tablaMesa.className = "inv"
    formMesa.className = "inv"
    tablaCliente.className = "inv"
    formCliente.className = "inv"
    tablaBodega.className = "inv"
    formBodega.className = "inv"
    tablaProveedor.className = "inv"
    formProveedor.className = "inv"
    formCaja.className = "inv"
    tablaCaja.className = "inv"
  }
})

navegacionProveedor.addEventListener('click', async function(event){
  if(tablaPlato != null){
    tablaPlato.className = "inv"
    formPlato.className = "inv"
    tablaMesa.className = "inv"
    formMesa.className = "inv"
    tablaCliente.className = "inv"
    formCliente.className = "inv"
    tablaBodega.className = "inv"
    formBodega.className = "inv"
    tablaProveedor.className = "col-md-10 animated fadeInLeft vis"
    formProveedor.className = " animated fadeInLeft vis"
    formCaja.className = "inv"
    tablaCaja.className = "inv"
  }
})
navegacionCaja.addEventListener('click', async function(event){
  if(tablaPlato != null){
    formCaja.className = "animated fadeInLeft vis"
    tablaCaja.className = "col-md-10 animated fadeInLeft vis"
    tablaPlato.className = "inv"
    formPlato.className = "inv"
    tablaMesa.className = "inv"
    formMesa.className = "inv"
    tablaCliente.className = "inv"
    formCliente.className = "inv"
    tablaBodega.className = "inv"
    formBodega.className = "inv"
    tablaProveedor.className = "inv"
    formProveedor.className = "inv"

  }
})

navegacionInforme.addEventListener('click', async function(event){
  if(tablaPlato != null){
    tablaPlato.className = "inv"
    formPlato.className = "inv"
    tablaMesa.className = "inv"
    formMesa.className = "inv"
    tablaCliente.className = "inv"
    formCliente.className = "inv"
    tablaBodega.className = "inv"
    formBodega.className = "inv"
    tablaProveedor.className = "inv"
    formProveedor.className = "inv"
    formCaja.className = "inv"
    tablaCaja.className = "inv"
    contenidoInforme.className = "col-md-10 animated fadeInLeft vis"
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
    await platoQuerys.deletePlato([platoId]);
    await getPlato();
  }
  return;
};

const editPlato = async (platoId) => {
  const plato = await platoQuerys.getPlatoById([platoId]);
  nombrePlato.value = plato[0];
  stockPlato.value = parseInt(plato[1]);
  tipoPlato.value = plato[2];
  precioPlato.value = plato[3];
  orientacionPlato.value = plato[4];
  cocineroPlato.value = plato[5];
  
  editingStatus = true;
  ediotPlatoId = platoId;
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
    e.preventDefault();
    if (!editingStatus) {
      console.log(plato)
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
      ediotPlatoId = "";
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

/*CRUD Proveedor*/
const proveedorForm = document.querySelector("#proveedorForm");
const idProveedor = document.querySelector("#idProveedor");
const pedidoProveedor = document.querySelector("#pedidoProveedor");
const cantidadProveedor = document.querySelector("#cantidadProveedor");
const ProveedorList = document.querySelector("#Proveedor");
const agregarPedido = document.querySelector("#agregarPedido");
const contenidoCreado = document.querySelector("#contenidoCreado");
const ProveedorFechaEntrega = document.querySelector("#proveedorFechaEntrega");
const botonActualizar = document.querySelector("#botonActualizar")

let proveedor = [];

let ediotProveedorId;

const deleteProveedor = async (proveedorId) => {
  const response = confirm("¿Estas seguro de que deseas borrar este elemento?");
  if (response) {
    await ProveedorQuerys.deleteProveedor([proveedorId]);
    await getProveedor();
  }
  return;
};

const editProveedor = async (proveedorId) => {
  const proveedor = await ProveedorQuerys.getProveedorById([proveedorId]);

  contenidoCreado.value = proveedor[0];
  ProveedorFechaEntrega.value = proveedor[2];  
  editingStatus = true;
  ediotProveedorId = proveedorId;
};
let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1; //January is 0!
let yyyy = today.getFullYear();
if (dd < 10) {
  dd = '0' + dd;
}
if (mm < 10) {
  mm = '0' + mm;
}
today = yyyy + '-' + mm + '-' + dd;

proveedorForm.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();
    
    pedidoFinal = contenidoCreado.value.split(',')
    pedidoFinal.filter(String)
    const proveedor = [
      proveedorID = idProveedor.value,
      proveedorPedido = contenidoCreado.value,
      proveedorFecha = today,
      proveedorFechaEntrega = ProveedorFechaEntrega.value,
      proveedorFinanza = "1F"
    ];
    
    e.preventDefault();
    if (!editingStatus) {
      const savedProveedor = await ProveedorQuerys.createProveedor(proveedor);
      console.log(savedProveedor);
    } else {
      proveedor.unshift(ediotProveedorId)
      const proveedorFinal = proveedor.filter(String)
      
      console.log(proveedorFinal)
      const ProveedorUpdated = await ProveedorQuerys.updateProveedor(proveedorFinal);
      console.log(ProveedorUpdated);
      

      // Reset
      editingStatus = false;
      ediotProveedorId = "";
    }
    proveedorForm.reset();
    idProveedor.focus();
    getProveedor();
  } catch (error) {
    console.log(error);
  }
});


let pedidoFinal = [];
agregarPedido.addEventListener('click', async(e) =>{
  e.preventDefault();
  

  if (pedidoProveedor.value == "" || cantidadProveedor.value == "()") {
    const response = confirm("No hay elementos");
  }else{
    contenidoCreado.value += pedidoProveedor.value + "("+cantidadProveedor.value+"),"
    pedidoFinal = contenidoCreado.value.split(',')
  pedidoFinal.pop();
  }
  pedidoFinal.filter(String)
  pedidoProveedor.value = "";
  cantidadProveedor.value = "";
  console.log(pedidoFinal)
  

})

botonActualizar.addEventListener('click', async(e) =>{
  pedidoFinal = contenidoCreado.value.split(',')
  console.log(pedidoFinal.filter(String))
})




function renderProveedor(tasks) {
  ProveedorList.innerHTML = "";
  tasks.forEach((t) => {
    ProveedorList.innerHTML += `
        <tr>
          <th scope="row">${t[0]}</th>
          <td>${t[1]}</td>
          <td>${t[2]}</td>
          <td>${t[3]}</td>
          <td><button class="btn btn-danger btn-sm" onclick="deleteProveedor('${t[0]}')">
          DELETE
        </button>
        <button class="btn btn-secondary btn-sm" onclick="editProveedor('${t[0]}')">
          EDIT 
        </button></td>
        </tr>  
    `;
  });
}

/*
FIN CRUD Proveedor 
 */

/*CRUD Caja*/
const cajaForm = document.querySelector("#cajaForm");
const idCaja = document.querySelector("#idCaja");
const codigoCaja = document.querySelector("#encargadoCaja");
const saldoInicialCaja = document.querySelector("#saldoInicialCaja");
const cajaList = document.querySelector("#caja");
const formCerrar = document.querySelector("#formCerrar");


let caja = [];

let ediotCajaId;

const cerrarCaja = async (cajaId) => {
  formCaja.className = "inv"
  formCerrar.className = "vis card card-body"
  formCerrar.innerHTML += `<input type="number" id="saldoFinalCaja" placeholder="Saldo Final" step="any" class="form-control" /><a class="btn btn-secondary btn-sm" onClick="enviarCajaCerrada('${cajaId}')">Ingresar</a>`
};
const enviarCajaCerrada = async(id) =>{
  const saldoFinal = document.querySelector("#saldoFinalCaja");
  cerrar = [
    cajaId = id,
    fechaFinalCaja = today2,
    saldoFinalCaja = parseInt(saldoFinal.value)
  ]
  cajaQuerys.cerrarCaja(cerrar);
  getCaja();
  console.log(cerrar)
  formCaja.className = "animated fadeInLeft vis"
  formCerrar.className = "inv"
}


let today2 = new Date();
    let dia = today2.getDate();
    let mes = today2.getMonth();
    let year = today2.getFullYear();
    let hh = today2.getHours();
    let min = today2.getMinutes();
    today2 = year + '-' + mes + '-' + dia + ' ' + hh + ':' + min;


cajaForm.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();
    
    
    const caja = [
      cajaId = idCaja.value,
      cajaFechaInicial = today2,
      cajaFechaFinal = "Caja en proceso",
      cajaEstado = "Abierta",
      cajaSaldoInicial = parseInt(saldoInicialCaja.value),
      cajaSaldoFinal = 0,
      cajaEncargado = codigoCaja.value
    ];
    
    e.preventDefault();
    if (!editingStatus) {
      const savedCaja = await cajaQuerys.createCaja(caja);
      console.log(savedCaja);
    } else {
      caja.shift();
      caja.unshift(ediotCajaId)
      console.log(caja)
      const cajaUpdated = await cajaQuerys.updateCaja(caja);
      console.log(cajaUpdated);

      // Reset
      editingStatus = false;
      ediotCajaId = "";
    }

    cajaForm.reset();
    idCaja.focus();
    getCaja();
  } catch (error) {
    console.log(error);
  }
});
function renderCaja(tasks) {
  cajaList.innerHTML = "";
  tasks.forEach((t) => {
    cajaList.innerHTML += `
        <tr>
          <th scope="row">${t[0]}</th>
          <td>${t[1]}</td>
          <td>${t[2]}</td>
          <td>${t[3]}</td>
          <td>${t[4]}</td>
          <td>${t[5]}</td>
          <td>${t[6]}</td>
          <td><button class="btn btn-danger btn-sm" onclick="cerrarCaja('${t[0]}')">
          Cerrar Caja
        </button>
        </button></td>
        </tr>  
    `;
  });
}

/*
FIN CRUD Caja 


 /*Informes*/ 
 

/*Fin de los informes*/

const getCaja = async () =>{
  caja = await cajaQuerys.getCaja();
  renderCaja(caja);
}

const getProveedor = async () =>{
  proveedor = await ProveedorQuerys.getProveedor();
  renderProveedor(proveedor);
}

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
  getCaja();
  getBodega();
  getCliente();
  getMesa();
  getPlato();
  getProveedor();
}

init();