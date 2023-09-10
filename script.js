const $= (selector)=> document.querySelector(selector)
const $$=(selector=> document.querySelectorAll(selector))
const randomId = ()=> self.crypto.randomUUID()

//localStorage
const traerDatos=()=>{
    return JSON.parse(localStorage.getItem("datos"))
}

const traerCategorias=()=>{
    if (traerDatos()){
        return traerDatos().categorias
    }
}

//categorias predefinidas
let categorias= traerCategorias() || [
    {
        id:randomId(), 
        nombre: 'Servicios'
    },
    {
        id:randomId(), 
        nombre: 'Comida'
    },
    {
        id:randomId(), 
        nombre: 'Salidas'
    },
    {
        id:randomId(), 
        nombre: 'Transporte'
    },
    {
        id:randomId(), 
        nombre: 'Educación'
    },
    {
        id:randomId(), 
        nombre: 'Trabajo'
    },
]

//FUNCION QUE AGREGA UNA CATEGORIA NUEVA
const addCategoria=()=>{
    let nuevaCategoria= {
        id:randomId(),
        nombre:$('#nombre-categoria').value,
    }
    categorias.push(nuevaCategoria)
    createList(categorias)
    $('#categoriasForm').reset()
}

//FUNCION PARA LLENAR EL SELECT 
const llenarSelect = (categorias) =>{
    $$('.categoriasSelect').forEach((select)=>{
        for(let {nombre, id} of categorias){
        select.innerHTML += `<option value="${id}" aria-label="${nombre}">${nombre}</option>`}
    })
}
llenarSelect(categorias)

//FUNCION QUE CREA LA LISTA EN EL HTML
const createList=(lista)=>{
    $('#listaCategorias').innerHTML=[]
    lista.forEach(item=> {
        console.log(item.nombre)
        let liItem= $('#listaCategorias');
        liItem.innerHTML += `<div class="columns lista mt-4">
        <li class="column is-8 elemento-lista">${item.nombre}</li>
        <button type="button" id="btnEliminar" class="column btn-eliminar btn">Eliminar</button>
        <button type="button" id="btnEditar" class="column btn-editar btn">Editar</button>
    </div>`
    });
}
createList(categorias)

//EVENTO CLICK PARA AGREGAR CATEGORIA

$('#btnCategoria').addEventListener('click', addCategoria)



// EVENTO CAMBIAR SECCIONES- BALANCE-CATEGORIAS-REPORTES

const categorias = document.getElementById("vistaCategorias")
const balance = document.getElementById("seccion-balance")
const seccionNuevaOperacion =  document.getElementById("Seccion-NuevaOperacion")
const btnCategorias = document.getElementById("btn-categorias")
const btnBalance = document.getElementById("btn-balance")
const btnAhorradas = document.getElementById("btn-ahorradas")
const  nuevaOperacion = document.getElementById("btn-nuevaOperacion")

const openCategorias = () => {
    categorias.style.display = "flex"
    balance.style.display = "none"
}

btnCategorias.onclick = openCategorias

const openBalance = () => {
    balance.style.display = "flex"
    categorias.style.display = "none"
    seccionNuevaOperacion.style.display = "none";

}

btnBalance.onclick = openBalance


const openAhorradas = () => {
        categorias.style.display = "none";
        seccionNuevaOperacion.style.display = "none";
}

btnAhorradas.onclick = openAhorradas()


const openNuevaOperacion = () => { 
    balance.style.display = "none";
    seccionNuevaOperacion.style.display = "flex";
}
nuevaOperacion.onclick = openNuevaOperacion




//  EVENTO VISTA DE FILTROS

const btnFiltros =  document.getElementById("btn-filtros");
const filtros    = document.getElementById("formulario-filtros");

const openFiltros = () => {
    console.log("HICIMOS CLICK EN Filtros");
    console.log( btnFiltros);
    if(btnFiltros.innerHTML === "Ocultar Filtros"){
        console.log("oculto los filtros");
        filtros.style.display = "none";
        btnFiltros.innerHTML = "Mostrar Filtros";
    }
    else if (btnFiltros.innerHTML === "Mostrar Filtros") {
        console.log("mostramos los filtros");
        filtros.style.display = "flex";
        btnFiltros.innerHTML = "Ocultar Filtros";
        
    }
}

btnFiltros.onclick = openFiltros

// EVENTO BOTON NUEVA OPERACIÓN
