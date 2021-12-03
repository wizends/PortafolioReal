/*Bodega CRUD*/
const notifier = require('node-notifier');
const bodegaQuerys = require("../../controller/bodega");
const platoQuerys = require("../../controller/plato")

const bodegaForm = document.querySelector("#bodegaForm");
const bodegaNombre = document.querySelector("#nombre");
const bodegaCategoria = document.querySelector("#categoria");
const bodegaSku = document.querySelector("#sku");
const bodegaMarca = document.querySelector("#marca");
const bodegaStock = document.querySelector("#stock");
const bodegaDetalle = document.querySelector("#detalle");
const bodegaDescription = document.querySelector("#description");
const BodegaList = document.querySelector("#bodega");

const navegacionBodega = document.getElementById("btnBodega");
const navegacionPlato = document.getElementById("btnPlato");
const tablaBodega = document.getElementById("tablaBodega");
const tablaPlato = document.getElementById("tablaPlato");
const formBodega = document.getElementById("formBodega");
const formPlato = document.getElementById("formPlato");


navegacionBodega.addEventListener("click", async function (event) {
    if (tablaBodega != null) {
      tablaBodega.className = "col-md-10 animated fadeInRight vis";
      formBodega.className = "col-md-10 animated fadeInRight vis";
      formPlato.className = "inv";
      tablaPlato.className = "inv";
    }
});

navegacionPlato.addEventListener("click", async function (event) {
    if (tablaPlato != null) {
      tablaPlato.className = "col-md-10 animated fadeInRight vis";
      formPlato.className = "col-md-10 animated fadeInRight vis";
      tablaBodega.className = "inv";
      formBodega.className = "inv";
  
    }
});

const formatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0
  })

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
      (sku = bodegaSku.value),
      (marca = bodegaMarca.value),
      (stock = parseInt(bodegaStock.value)),
      (detalle = bodegaDetalle.value),
      (nombre = bodegaNombre.value),
      (id_user = "1B"),
    ];
    if (!editingStatus) {
      const savedBodega = await bodegaQuerys.createBodega(bodega);
      console.log(savedBodega);
    } else {
      /*bodega.push(editBodega);
      bodega.shift();*/
      bodega.shift();
      bodega.unshift(editbodegaSku);
      const bodegaUpdated = await bodegaQuerys.updateBodega(bodega);
      console.log(bodega);
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

btnBodega.addEventListener("click", async (e) => {});

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

/*CRUD plato*/
const platoForm = document.querySelector("#platoForm");
const idPlato = document.querySelector("#idPlato");
const nombrePlato = document.querySelector("#nombrePlato");
const stockPlato = document.querySelector("#stockPlato");
const precioPlato = document.querySelector("#precioPlato");
const tipoPlato = document.querySelector("#tipoPlato");
const cocineroPlato = document.querySelector("#cocineroPlato");
const platoList = document.querySelector("#plato");
const orientacionPlato = document.querySelector("#orientacionPlato");

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
      (platoID = idPlato.value),
      (platoNombre = nombrePlato.value),
      (platoStock = parseInt(stockPlato.value)),
      (platoTipo = tipoPlato.value),
      (platoPrecio = parseInt(precioPlato.value)),
      (platoOrientacion = orientacionPlato.value),
      (platoCocinero = cocineroPlato.value),
    ];
    e.preventDefault();
    if (!editingStatus) {
      console.log(plato);
      const savedPlato = await platoQuerys.createPlato(plato);
      console.log(savedPlato);
    } else {
      plato.shift();
      plato.unshift(ediotPlatoId);
      console.log(plato);
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
          <td>${formatter.format(t[4])}</td>
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

const getBodega = async () => {
    bodega = await bodegaQuerys.getBodega();
    renderBodega(bodega);
};
const getPlato = async () => {
    plato = await platoQuerys.getPlato();
    renderPlato(plato);
};
async function init() {
    getBodega();
    getPlato();
};
  
init();