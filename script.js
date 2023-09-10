const $= (selector)=> document.querySelector(selector)
const $$=(selector=> document.querySelectorAll(selector))

const listaCategorias=[]

//FUNCION QUE AGREGA UNA CATEGORIA NUEVA 

const addCategoria=()=>{
    let newCategoria= $('#nombre-categoria').value
    listaCategorias.push(newCategoria)
    createList(listaCategorias)
    $('#categoriasForm').reset()
}

//FUNCION QUE CREA LA LISTA EN EL HTML

const createList=(lista)=>{
    $('#listaCategorias').innerHTML=[]
    lista.forEach(item=> {
        let liItem= $('#listaCategorias');
        liItem.innerHTML += `<div class="columns lista mt-4">
        <li class="column is-8 elemento-lista">${item}</li>
        <button type="button" id="btnEliminar" class="column btn-eliminar btn">Eliminar</button>
        <button type="button" id="btnEditar" class="column btn-editar btn">Editar</button>
    </div>`
    });
}

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
