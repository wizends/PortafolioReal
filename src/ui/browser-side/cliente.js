/*CRUD Caja*/
const cajaForm = document.querySelector("#cajaForm");
const idCaja = document.querySelector("#idCaja");
const nombreCaja = document.querySelector("#nombreCaja");
const stockCaja = document.querySelector("#stockCaja");
const precioCaja = document.querySelector("#precioCaja");
const tipoCaja = document.querySelector("#tipoCaja");
const cocineroCaja = document.querySelector("#cocineroCaja");
const cajaList = document.querySelector("#caja");
const orientacionCaja = document.querySelector("#orientacionCaja")

let caja = [];

let ediotCajaId;

const deleteCaja = async (cajaId) => {
  const response = confirm("¿Estas seguro de que deseas borrar este elemento?");
  if (response) {
    await cajaQuerys.deleteCaja([cajaId]);
    await getCaja();
  }
  return;
};

const editCaja = async (cajaId) => {
  const caja = await cajaQuerys.getCajaById([cajaId]);
  nombreCaja.value = caja[0];
  stockCaja.value = parseInt(caja[1]);
  tipoCaja.value = caja[2];
  precioCaja.value = caja[3];
  orientacionCaja.value = caja[4];
  cocineroCaja.value = caja[5];
  
  editingStatus = true;
  ediotCajaId = cajaId;
};

cajaForm.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();
    
    const caja = [
      cajaID = idCaja.value,
      cajaNombre = nombreCaja.value,
      cajaStock = parseInt(stockCaja.value),
      cajaTipo = tipoCaja.value,
      cajaPrecio = parseInt(precioCaja.value),
      cajaOrientacion = orientacionCaja.value,
      cajaCocinero = cocineroCaja.value
    ];
    e.preventDefault();
    if (!editingStatus) {
      console.log(caja)
      const savedCaja = await cajaQuerys.createCaja(caja);
      console.log(savedCaja);
    } else {
      Caja.shift();
      Caja.unshift(ediotCajaId)
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
          <td><button class="btn btn-danger btn-sm" onclick="deleteCaja('${t[0]}')">
          DELETE
        </button>
        <button class="btn btn-secondary btn-sm" onclick="editCaja('${t[0]}')">
          EDIT 
        </button></td>
        </tr>  
    `;
  });
}

/*
FIN CRUD Caja 
 */