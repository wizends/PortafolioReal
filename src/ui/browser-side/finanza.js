const notifier = require('node-notifier');
const cajaQuerys = require("../../controller/caja");


const cajaForm = document.querySelector("#cajaForm");
const idCaja = document.querySelector("#idCaja");
const codigoCaja = document.querySelector("#encargadoCaja");
const saldoInicialCaja = document.querySelector("#saldoInicialCaja");
const cajaList = document.querySelector("#caja");
const formCerrar = document.querySelector("#formCerrar");

const formatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0
  })

let caja = [];

let ediotCajaId;
let editingStatus = false;
const cerrarCaja = async (cajaId) => {
  formCaja.className = "inv";
  formCerrar.className = "vis card card-body";
  formCerrar.innerHTML += `<input type="number" id="saldoFinalCaja" placeholder="Saldo Final" step="any" class="form-control" /><a class="btn btn-secondary btn-sm" onClick="enviarCajaCerrada('${cajaId}')">Ingresar</a>`;
};
const enviarCajaCerrada = async (id) => {
  const saldoFinal = document.querySelector("#saldoFinalCaja");
  cerrar = [
    (cajaId = id),
    (fechaFinalCaja = today2),
    (saldoFinalCaja = parseInt(saldoFinal.value)),
  ];
  cajaQuerys.cerrarCaja(cerrar);
  getCaja();
  console.log(cerrar);
  formCaja.className = "animated fadeInRight vis";
  formCerrar.className = "inv";
};

let today2 = new Date();
let dia = today2.getDate();
let mes = today2.getMonth();
let year = today2.getFullYear();
let hh = today2.getHours();
let min = today2.getMinutes();
today2 = year + "-" + mes + "-" + dia + " " + hh + ":" + min;

cajaForm.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();

    const caja = [
      (cajaId = idCaja.value),
      (cajaFechaInicial = today2),
      (cajaFechaFinal = "Caja en proceso"),
      (cajaEstado = "Abierta"),
      (cajaSaldoInicial = parseInt(saldoInicialCaja.value)),
      (cajaSaldoFinal = 0),
      (cajaEncargado = codigoCaja.value),
    ];

    e.preventDefault();
    if (!editingStatus) {
      const savedCaja = await cajaQuerys.createCaja(caja);
      console.log(savedCaja);
    } else {
      caja.shift();
      caja.unshift(ediotCajaId);
      console.log(caja);
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
          <td>${formatter.format(t[4])}</td>
          <td>${formatter.format(t[5])}</td>
          <td>${t[6]}</td>
          <td><button class="btn btn-danger btn-sm" onclick="cerrarCaja('${t[0]}')">
          Cerrar Caja
        </button>
        </button></td>
        </tr>  
    `;
  });
}

const getCaja = async () => {
    caja = await cajaQuerys.getCaja();
    renderCaja(caja);
};
async function init() {
    getCaja();
}
  
init();

  