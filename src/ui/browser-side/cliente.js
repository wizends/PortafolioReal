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
    const asignacion =[
        bdCantidad = cantidad.value,
        bdmesaZona = mesaZona.value
    ]
    try {
        //const mesasDisponibles = await asignacionQuerys.consultaDisponibilidad(asignacion)
        cliente.className = "inv"
        mesas.className = "container animated fadeInRight vis"
    } catch (error) {
        
    }
})
seleccionar.addEventListener("click", async(e)=>{
    e.preventDefault()
    setTimeout(function(){
        mesaResultado.className = "container animated fadeInRight inv"
        cliente.className = "ontainer animated fadeInRight vis"
    },3000);
    //cliente.className = "container animated fadeInRight vis"
    mesas.className = "inv"
    mesaResultado.className = "container animated fadeInRight vis"


    notifier.notify({
        title: 'Siglo 21',
        message: 'Mesa ' + 2 + ' asignada correctamente!'
      });

})

