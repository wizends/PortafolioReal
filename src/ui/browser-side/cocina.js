const notifier = require('node-notifier');
const pedidoQuerys = require("../../controller/cocina");

const pedidoList = document.querySelector("#cocina");

const enviarPedidoCerrado = async (id) => {
  pedidoQuerys.cerrarPedido([id]);
  getPedido();
  notifier.notify({
    title: 'Siglo 21',
    message: 'Pedido terminado y enviado al cliente!'
  }); 
};


function renderPedido(tasks) {
  
  pedidoList.innerHTML = "";
  tasks.forEach((t) => {
    pedidoList.innerHTML += `
        <tr>
          <th scope="row">${t[0]}</th>
          <td>${t[1]}</td>
          <td>${t[2]}</td>
          <td><button class="btn btn-danger btn-sm" onclick="enviarPedidoCerrado(${t[0]})">
          Cerrar Pedido
        </button>
        </button></td>
        </tr>  
    `;
  });
}

const getPedido = async () => {
    pedido = await pedidoQuerys.getPedido();
    renderPedido(pedido);
};
async function init() {
    getPedido();
}
  
init();