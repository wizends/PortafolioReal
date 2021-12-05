const asignacionQuerys = require("../../controller/asignar")
const notifier = require('node-notifier');

const cliente = document.getElementById("cliente")
const formCliente = document.getElementById("formCliente")
const nombre = document.getElementById("nombre")
const apellido = document.getElementById("apellido")
const mesaZona = document.getElementById("mesaZona")
const cantidad = document.getElementById("cantidad")
const mesas = document.getElementById("mesas")
const seleccionar = document.getElementById("seleccionar")
const mesaResultado = document.getElementById("mesaResultado")


const asignacion = [];



formCliente.addEventListener("submit", async(e)=>{
    e.preventDefault()
    const asignacion = [
        bdCantidad = parseInt(cantidad.value),
        bdmesaZona = mesaZona.value
    ]
    console.log(asignacion)
    try {
        const mesasDisponibles = await asignacionQuerys.consultaDisponibilidad(asignacion)
        cliente.className = "inv"
        console.log(mesasDisponibles)
        mesas.innerHTML = ""
        mesasDisponibles.forEach((t) => {
            mesas.innerHTML = `<div id="carta" class="container animated fadeInRight vis card card-body">
            <h2>Mesa ${t[0]}</h2>
            <h4>${t[3]}</h4>
            <a type="button" class="btn btn-primary" id="seleccionar" onClick= "seleccionarMesa('${t[0]}')" >Seleccionar</a>
        </div>`
          });
        
    } catch (error) {
        console.log(error)
    }
})
const seleccionarMesa = async(id) => {

    const actualizar = await asignacionQuerys.actualizarEstado([id]);
    setTimeout(function(){
        mesaResultado.className = "container animated fadeInRight inv";
        cliente.className = "container animated fadeInRight vis";
    },5000);
    //cliente.className = "container animated fadeInRight vis"
    const carta = document.getElementById("carta");
    carta.remove();
    mesaResultado.className = "container animated fadeInRight vis";
}


