const { remote } = require("electron");
const main = remote.require("./main");

const bodegaForm = document.querySelector("#bodegaForm");
const bodegaNombre = document.querySelector("#nombre");
const bodegaCategoria = document.querySelector("#categoria");
const bodegaSku = document.querySelector("#sku");
const bodegaMarca = document.querySelector("#marca");
const bodegaStock = document.querySelector("#stock");
const bodegaDetalle = document.querySelector("#detalle");

const bodegaDescription = document.querySelector("#description");
const BodegaList = document.querySelector("#bodega");

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

const getBodega = async () => {
  bodega = await main.getBodega();
  renderBodega(bodega);
};

async function init() {
  getBodega();
}

init();
