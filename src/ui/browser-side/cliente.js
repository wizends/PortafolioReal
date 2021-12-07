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
const volver = document.getElementById("btnVolver")

const asignacion = [];



formCliente.addEventListener("submit", async(e)=>{
    e.preventDefault()
    volver.innerHTML += `<a type="button" class="btn btn-primary" id="botonVolver">Volver</a>`
    const asignacion = [
        bdCantidad = parseInt(cantidad.value),
        bdmesaZona = mesaZona.value
    ]
    console.log(asignacion)
    try {
        const mesasDisponibles = await asignacionQuerys.consultaDisponibilidad(asignacion)
        cliente.className = "inv"
        console.log(mesasDisponibles)
        mesas.className = "row vis"
        mesas.innerHTML = ""
        mesasDisponibles.forEach((t) => {
            mesas.innerHTML += `<div id="carta" class="col animated fadeInRight card">
            <h2>Mesa ${t[0]}</h2>
            <h4>${t[3]}</h4>
            <a type="button" class="btn btn-primary" id="seleccionar" onClick= "seleccionarMesa('${t[0]}','${t[1]}','${t[3]}')" >Seleccionar</a>
        </div>`
        });
        
    } catch (error) {
        console.log(error)
    }
})

volver.addEventListener("click", (e)=>{
    const botonVolver = document.getElementById("botonVolver")
    cliente.className = "container animated fadeInRight vis card card-body"
    mesas.className = "inv"
    botonVolver.remove()
    formCliente.reset()
})


const seleccionarMesa = async(id,camarero,zona) => {
    console.log(id)
    console.log(camarero)
    console.log(zona)
    mesaResultado.innerHTML = `
    <div class="container animated fadeInRight vis card card-body">
            <h2>${id}</h2>
            <h4>${zona}</h4>
            <h5>Siga a ${camarero} hasta su mesa!</h5>
            <div class="spinner-border" role="status">
              </div>
        </div>
    `;
    const actualizar = await asignacionQuerys.actualizarEstado([id]);
    setTimeout(function(){
        mesaResultado.className = "container animated fadeInRight inv";
        cliente.className = "container animated fadeInRight vis";
    },5000);
    //cliente.className = "container animated fadeInRight vis"
    const carta = document.getElementById("carta");
    carta.remove();
   
}


