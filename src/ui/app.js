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
const navegacionMesas = document.getElementById('btnMesa')

const tablaBodega = document.getElementById('tablaBodega')
const tablaCliente = document.getElementById('tablaCliente')
const tablaMesa = document.getElementById('tablaMesa')
const formBodega = document.getElementById('formBodega')
const formCliente = document.getElementById('formCliente')
const formMesa = document.getElementById('formMesa')

navegacionCliente.addEventListener('click', async function(event){
  if(tablaCliente != null){
    tablaCliente.className = "vis"
    formCliente.className = "animated fadeInLeft vis"
    tablaBodega.className = "inv"
    formBodega.className = "inv"
    tablaMesa.className = "inv"
    formMesa.className = "inv"
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
  clienteNombre.value = cliente.nombres;
  clienteApellido.value = cliente.apellidos;
  clienteRut.value = cliente.rut;
  clienteFecNac.value = cliente.fecha_nac;
  clienteEmail.value = cliente.email;

  editingStatus = true;
  ediotClienteId = id;
};

clienteForm.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();

    const cliente = {
      id: clienteId.value,
      nombres: clienteNombre.value,
      apellidos: clienteApellido.value,
      rut: clienteRut.value,
      fecha_nac: clienteFecNac.value,
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
function renderCliente(tasks) {
  clienteList.innerHTML = "";
  tasks.forEach((t) => {
    clienteList.innerHTML += `
        <tr>
          <th scope="row">${t.id}</th>
          <td>${t.nombres}</td>
          <td>${t.apellidos}</td>
          <td>${t.rut}</td>
          <td>${t.fecha_nac}</td>
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

/*FIN CLIENTE CRUD*/


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
    await main.deleteMesa(mesaId);
    await getMesa();
  }
  return;
};

const editMesa = async (mesaId) => {
  const mesa = await main.getMesaById(mesaId);
  mesaCamarero.value = mesa.camarero;
  mesaSillas.value = mesa.sillas;
  mesaZonas.value = mesa.zona;

  editingStatus = true;
  ediotMesaId = mesaId;
};

mesaForm.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();

    const mesa = {
      id: mesaId.value,
      camarero: mesaCamarero.value,
      sillas: mesaSillas.value,
      zona: mesaZonas.value,
    };

    if (!editingStatus) {
      const savedMesa = await main.createMesa(mesa);
      console.log(savedMesa);
    } else {
      const mesaUpdated = await main.updateMesa(ediotMesaId, mesa);
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
          <th scope="row">${t.id}</th>
          <td>${t.camarero}</td>
          <td>${t.sillas}</td>
          <td>${t.zona}</td>
          <td><button class="btn btn-danger btn-sm" onclick="deleteMesa('${t.id}')">
          DELETE
        </button>
        <button class="btn btn-secondary btn-sm" onclick="editMesa('${t.id}')">
          EDIT 
        </button></td>
        </tr>  
    `;
  });
}

/* FIN MESA CRUD*/

const getCliente = async () => {
  cliente = await main.getCliente();
  renderCliente(cliente);
};

const getBodega = async () => {
  bodega = await main.getBodega();
  renderBodega(bodega);
};

const getMesa = async () =>{
  mesa = await main.getMesa();
  renderMesa(mesa);
}

async function init() {
  getBodega();
  getCliente();
  getMesa();
}

init();