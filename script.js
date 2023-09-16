const $= (selector)=> document.querySelector(selector)
const $$=(selector=> document.querySelectorAll(selector))
const randomId = ()=> self.crypto.randomUUID()

//localStorage.clear()

//localStorage
const traerDatos=()=>{
    return JSON.parse(localStorage.getItem("datos"))
}

const subirDatos= (datos) => {
    localStorage.setItem("datos", JSON.stringify ({...traerDatos(), ...datos}))
}

document.addEventListener('DOMContentLoaded', () => {
    const navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

navbarBurgers.forEach( el => {
    el.addEventListener('click', () => {
        const target = el.dataset.target;
        const $target = document.getElementById(target);
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
    });
    });
});

const traerCategorias=()=>{
    if (traerDatos()){
        return traerDatos().categorias
    }
}

//categorias predefinidas
const categoriasLista= traerCategorias() || [
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
    }
]

//FUNCION QUE AGREGA UNA CATEGORIA NUEVA
const addCategoria=()=>{
    let nuevaCategoria= {
        id:randomId(),
        nombre:$('#nombre-categoria').value,
    }
    categoriasLista.push(nuevaCategoria)
    crearLista(categoriasLista)
    llenarSelect(categoriasLista)
    subirDatos({categorias: categoriasLista})
    actualizarVistas(traerDatos())
    $('#categoriasForm').reset()
}

//EVENTO CLICK PARA AGREGAR CATEGORIA
$('#btnCategoria').addEventListener('click',()=> addCategoria)

//FUNCION PARA LLENAR EL SELECT 
const llenarSelect = (categorias) =>{
    $$('.categoriasSelect').forEach((select)=>{
        select.innerHTML=''
        for(let {nombre, id} of categorias){
        select.innerHTML += `<option value="${id}" aria-label="${nombre}">${nombre}</option>`}
    })
}

//FUNCION QUE CREA LA LISTA EN EL HTML
const crearLista=(categorias)=>{
    $('#listaCategorias').innerHTML=[];
    for (let {id, nombre } of categorias) {
        $('#listaCategorias').innerHTML += `<div class="columns lista is flex mt-4">
        <li class="column is-9 elemento-lista"><p>${nombre}</p></li>
        <div class="column">
        <button type="button" onclick="mostrarEdicionDeCategoria('${id}')" id="${id}" class="column btn-editar btn">Editar</button>
        <button type="button" onclick="eliminarCategoria('${id}')" id="${id}" class="column btn-eliminar btn">Eliminar</button>
        </div>
        </div>`
    };
}

crearLista(categoriasLista)

//EVENTO CLICK PARA AGREGAR CATEGORIA
$('#btnCategoria').addEventListener('click', ()=> addCategoria())

//VISTA ***EDITAR CATEGORIA***
const mostrarVistaEditar = () => {
    $$('.btn-editar').forEach((btn) => {
        btn.addEventListener('click', () =>
            $('#vista-editar-categorias').classList.remove('is-hidden') &
            $('#vistaCategorias').classList.add('is-hidden')
        )
    })
}

//FUNCION PARA VOLVER A LA VISTA CATEGORIAS
const mostrarVistaCategorias = () => {
    $('#vista-editar-categorias').classList.add('is-hidden') &
    $('#vistaCategorias').classList.remove('is-hidden')
}

//CANCELAR VISTA ***EDITAR CATEGORIA***
$('#btnCancelarEditar').addEventListener('click', () => mostrarVistaCategorias())

//FUNCION ***OBTENER CATEGORIA***
const obtenerCategoria = (idCategoria, categoria) =>{
    return categoriasLista.find((categoria) => categoria.id == idCategoria)
}

//FUNCION PARA ***EDITAR CATEGORIAS***
const mostrarEdicionDeCategoria=(id)=>{
    mostrarVistaEditar()
    let categoriaAEditar= obtenerCategoria(id,traerCategorias())
    $('#editar-categoria-input').value = categoriaAEditar.nombre
    $('#btnEditarCategoria').addEventListener('click', ()=>edicionDeCategoria
    (categoriaAEditar.id))
    $('#btnEditarCategoria').addEventListener('click', ()=> mostrarVistaCategorias())
}

const edicionDeCategoria=(id)=>{
    let nuevaCategoria= {
        id: id,
        nombre: $('#editar-categoria-input').value,
    }
    let categoriasActualizadas= traerCategorias().map((categoria)=>
        categoria.id === id ? {...nuevaCategoria} :categoria
    )
    crearLista(categoriasActualizadas) 
    llenarSelect(categoriasActualizadas)
    subirDatos({categorias: categoriasActualizadas})
}

//FUNCION PARA ***ELIMINAR CATEGORIA***
const eliminarCategoria = (id) => {
    let categoriaAEliminar = obtenerCategoria(id, traerCategorias())
    $$('.btn-eliminar').forEach((btn) => {
        btn.addEventListener('click', () => borrarCategoria(categoriaAEliminar.id)
        )
    })
}

const borrarCategoria=(idEliminar)=>{
    let categoriasSinEliminar= traerCategorias().filter((categoria) => 
    categoria.id != idEliminar)
    crearLista(categoriasSinEliminar)
    llenarSelect(categoriasSinEliminar)
    subirDatos({categorias: categoriasSinEliminar})
}

console.log(categoriasLista)

//FUNCION INICIALIZAR
const actualizarVistas = () => {
    crearLista(categoriasLista);
    llenarSelect(categoriasLista);
};

actualizarVistas(traerDatos())
window.onload= actualizarVistas()

// EVENTO CAMBIAR SECCIONES- BALANCE-CATEGORIAS-REPORTES

const categorias = document.getElementById("vistaCategorias")
const balance = document.getElementById("seccion-balance")
const reportes = document.getElementById("vistaReportes")
const seccionNuevaOperacion =  document.getElementById("Seccion-NuevaOperacion")
const btnCategorias = document.getElementById("btn-categorias")
const btnBalance = document.getElementById("btn-balance")
const btnReportes= document.getElementById("btn-reportes")
const btnAhorradas = document.getElementById("btn-ahorradas")
const  nuevaOperacion = document.getElementById("btn-nuevaOperacion")

const openCategorias = () => {
    categorias.style.display = "flex"
    balance.style.display = "none"
    reportes.style.display="none"
}

btnCategorias.onclick = openCategorias

const openBalance = () => {
    balance.style.display = "flex"
    categorias.style.display = "none"
    reportes.style.display="none"
    seccionNuevaOperacion.style.display = "none";

}

btnBalance.onclick = openBalance

const openReportes= ()=>{
    reportes.style.display="flex"
    balance.style.display = "none"
    categorias.style.display = "none"
    seccionNuevaOperacion.style.display = "none";
}

const openAhorradas = () => {
        categorias.style.display = "none";
        seccionNuevaOperacion.style.display = "none";
        reportes.style.display="none"
}

btnReportes.onclick = openReportes

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