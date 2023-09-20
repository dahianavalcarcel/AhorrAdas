//****NAVBAR BURGER*****
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

//****SELECTORES UNIVERSALES****

const $= (selector)=> document.querySelector(selector)
const $$=(selector=> document.querySelectorAll(selector))
const randomId = ()=> self.crypto.randomUUID()

//****localStorage*****

//localStorage.clear()

const traerDatos=()=>{
    return JSON.parse(localStorage.getItem("datos"))
}

const subirDatos= (datos) => {
    localStorage.setItem("datos", JSON.stringify ({...traerDatos(), ...datos}))
}

const traerCategorias=()=>{
    if (traerDatos()){
        return traerDatos().categorias
    }
}

//***categorias predefinidas****
let categoriasLista= traerCategorias() || [
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

//FUNCION QUE CREA LA LISTA EN EL HTML
const crearLista=(categorias)=>{
    $('#listaCategorias').innerHTML=[];
    for (let {id, nombre } of categorias) {
        $('#listaCategorias').innerHTML += `<div class="columns lista is-flex mt-4">
        <li class="column is-9 elemento-lista"><p>${nombre}</p></li>
        <div class="column is-flex">
        <button type="button" onclick="mostrarEdicionDeCategoria('${id}')" id="${id}" class="column btn-editar btn">Editar</button>
        <button type="button" onclick="eliminarCategoria('${id}')" id="${id}" class="column btn-eliminar btn">Eliminar</button>
        </div>
        </div>`
    };
}

//FUNCION PARA LLENAR EL SELECT 
const llenarSelect = (categorias) =>{
    $$('.categoriasSelect').forEach((select)=>{
        select.innerHTML=''
        for(let {nombre, id} of categorias){
        select.innerHTML += `<option value="${id}" aria-label="${nombre}">${nombre}</option>`}
    })
}

crearLista(categoriasLista)
llenarSelect(categoriasLista)

//FUNCION INICIALIZAR
const actualizarVistas = (datos) => {
    crearLista(datos.categorias);
    llenarSelect(datos.categorias);
};

//*************

//FUNCION QUE AGREGA UNA CATEGORIA NUEVA
const addCategoria=()=>{
    let nuevaCategoria= {
        id:randomId(),
        nombre:$('#nombre-categoria').value,
    }
    let nuevaLista= [...categoriasLista, nuevaCategoria]
    crearLista(nuevaLista)
    llenarSelect(nuevaLista)
    subirDatos({categorias: [...nuevaLista]})
    actualizarVistas(traerDatos())
    $('#categoriasForm').reset()
}
$('#btnCategoria').addEventListener('click', ()=> addCategoria())

//*************

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
    actualizarVistas(traerDatos())
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
    actualizarVistas(traerDatos())
}

// EVENTO CAMBIAR SECCIONES- BALANCE-CATEGORIAS-REPORTES

const categorias = document.getElementById("vistaCategorias")
const balance = document.getElementById("seccion-balance")
const reportes = document.getElementById("vistaReportes")
const seccionNuevaOperacion =  document.getElementById("Seccion-NuevaOperacion")
const btnCategorias = document.getElementById("btn-categorias")
const btnBalance = document.getElementById("btn-balance")
const btnReportes= document.getElementById("btn-reportes")
const btnAhorradas = document.getElementById("btn-ahorradas")
const nuevaOperacion = document.getElementById("btn-nuevaOperacion");
const seccionEditarOp = document.getElementById("Seccion-EditarOperacion");



const openCategorias = () => {
    categorias.style.display = "flex"
    balance.style.display = "none"
    reportes.style.display="none"
    seccionEditarOp.style.display = "none";
}

btnCategorias.onclick = openCategorias

const openBalance = () => {
    balance.style.display = "flex"
    categorias.style.display = "none"
    reportes.style.display="none"
    seccionNuevaOperacion.style.display = "none";
    seccionEditarOp.style.display = "none";
}

btnBalance.onclick = openBalance

const openReportes= ()=>{
    reportes.style.display="flex"
    balance.style.display = "none"
    categorias.style.display = "none"
    seccionNuevaOperacion.style.display = "none";
    seccionEditarOp.style.display = "none";
}

const openAhorradas = () => {
        categorias.style.display = "none";
        seccionNuevaOperacion.style.display = "none";
        reportes.style.display="none"
        seccionEditarOp.style.display = "none";
}

btnReportes.onclick = openReportes

btnAhorradas.onclick = openAhorradas()


const openNuevaOperacion = () => { 
    balance.style.display = "none";
    seccionNuevaOperacion.style.display = "flex";
    seccionEditarOp.style.display = "none";
}
nuevaOperacion.onclick = openNuevaOperacion


//  EVENTO VISTA DE FILTROS
const btnFiltros =  document.getElementById("btn-filtros");
const filtros    = document.getElementById("formulario-filtros");

const openFiltros = () => {
    if(btnFiltros.innerHTML === "Ocultar Filtros"){
        filtros.style.display = "none";
        btnFiltros.innerHTML = "Mostrar Filtros";
    }
    else if (btnFiltros.innerHTML === "Mostrar Filtros") {
        filtros.style.display = "flex";
        btnFiltros.innerHTML = "Ocultar Filtros";
        
    }
}

btnFiltros.onclick = openFiltros



 ///FORMULARIO OPERACIONES///

 $("#btn-editar-op").addEventListener('click', () => guardarCambiosOperacion())
$('#btn-cancelar-edicion').addEventListener('click', () => openBalance())

// Operaciones almacenadas en localStorage o inicializar un array vacío
let operaciones = JSON.parse(localStorage.getItem("operaciones")) || [];

// Función para guardar las operaciones en localStorage
const guardarOperacionesEnLocalStorage = () => {
    localStorage.setItem("operaciones", JSON.stringify(operaciones));
};


// Obtener valores del formulario y agregar una nueva operación
const agregarOperacion = () => {
    const descripcion = document.getElementById("input-descripción").value;
    const monto = parseFloat(document.getElementById("input-monto").value);
    const tipo = document.getElementById("select-tipo-op").value;
    const fecha = document.getElementById("input-fecha").value;
    const select = document.getElementById("select-categorias-op");
    const categoria = select.options[select.selectedIndex].text;

    const nuevaOperacion = {
        id: randomId(),
        descripcion,
        monto,
        tipo,
        categoria,
        fecha,
    };

    operaciones.push(nuevaOperacion); 
    guardarOperacionesEnLocalStorage(); // Guardar en localStorage

    document.getElementById("input-descripción").value = "";
    document.getElementById("input-monto").value = "";
    document.getElementById("select-tipo-op").value = "gasto";
    document.getElementById("select-categorias-op").value = "";
    document.getElementById("input-fecha").value = "";

    mostrarOperaciones();
};

const btnAgregarOperacion = document.getElementById("boton-agregar-operacion");
btnAgregarOperacion.onclick = agregarOperacion;


// Función para mostrar las operaciones en el HTML
const mostrarOperaciones = () => {
    const containerDescripcion = document.getElementById("valor-descripcion");
    const containerMonto = document.getElementById("valor-monto");
    const containerFecha = document.getElementById("valor-fecha");
    const containerCategoria = document.getElementById("valor-categoria");
    const containerAcciones =  document.getElementById("valor-acciones");
    

    operaciones.forEach((elemento) => {
        organizarLista(containerDescripcion, elemento.descripcion);
        organizarLista(containerMonto, elemento.monto);
        organizarLista(containerFecha, elemento.fecha);
        organizarLista(containerCategoria, elemento.categoria);
        
        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.onclick = () => editarOperacion(elemento.id);
        btnEditar.style.border = 'none';
        btnEditar.style.padding = '3px';
        
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.style.border= 'none';

        btnEliminar.onclick = () => eliminarOperacion(elemento.id);

        // Agregar los botones al div de acciones
        const divAcciones = document.createElement("div");
        divAcciones.appendChild(btnEditar);
        divAcciones.appendChild(btnEliminar);

        containerAcciones.appendChild(divAcciones);
    });
};
let operacionIdAEditar = null;

const editarOperacion = (id) => {
    balance.style.display = "none";
    seccionEditarOp.style.display = "flex";
    
    const opAEditar = operaciones.find(op => op.id === id);

    document.getElementById("input-editar-descripción").value = opAEditar.descripcion;
    document.getElementById("input-editar-monto").value = opAEditar.monto;
    document.getElementById("select-tipo-editar-op").value = opAEditar.tipo;
    document.getElementById("input-editar-fecha").value = opAEditar.fecha;
    const select = document.getElementById("select-categorias-editar-op");
    const categoria = select.options[select.selectedIndex];
    categoria.text = opAEditar.categoria;

    operacionIdAEditar = id;
}
console.log("operacion", operacionIdAEditar);

const guardarCambiosOperacion = () => {
    if (operacionIdAEditar === null) {
        return; // Si no hay operación para editar, no hagas nada
    }

    const descripcion = document.getElementById("input-editar-descripcion").value;
    const monto = parseFloat(document.getElementById("input-editar-monto").value);
    const tipo = document.getElementById("select-tipo-editar-op").value;
    const fecha = document.getElementById("input-editar-fecha").value;
    const select = document.getElementById("select-categorias-editar-op");
    const categoria = select.options[select.selectedIndex].text;
  
    // Busca la operación en el array por su ID y actualiza sus propiedades
    const operacionEditada = operaciones.find(op => op.id === operacionIdAEditar);

    if (operacionEditada) {
        operacionEditada.descripcion = descripcion;
        operacionEditada.monto = monto;
        operacionEditada.tipo = tipo;
        operacionEditada.fecha = fecha;
        operacionEditada.categoria = categoria;
    }
    
    balance.style.display = "flex";
    seccionEditarOp.style.display = "none";

    // Guarda los cambios en localStorage
    guardarOperacionesEnLocalStorage();

    // Limpia los campos del formulario de edición
    document.getElementById("input-editar-descripcion").value = "";
    document.getElementById("input-editar-monto").value = "";
    document.getElementById("select-tipo-editar-op").value = "gasto";
    document.getElementById("select-categorias-editar-op").value = "";
    document.getElementById("input-editar-fecha").value = "";

    // Limpia la variable global operacionIdAEditar
    operacionIdAEditar = null;

    // Vuelve a mostrar la lista actualizada de operaciones
    mostrarOperaciones();
};



const eliminarOperacion = (id) => {
    operaciones= operaciones.filter(elemento => elemento.id !== id);
    guardarOperacionesEnLocalStorage();
    mostrarOperaciones();
}


const organizarLista = (div, propiedad) => {
    const element = document.createElement('p');
    element.style.fontWeight= '150';
    element.textContent = `${propiedad}`;
    div.appendChild(element);
}


// Llama a la función para mostrar las operaciones al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    mostrarOperaciones();
});


const seccionSinOperaciones = document.getElementById("sin-operaciones");
const listadoOperaciones = document.getElementById("listado-operaciones");

if (operaciones.length > 0 ) {
    seccionSinOperaciones.style.display = "none";
}
else  {
    listadoOperaciones.style.display = "none";
}





//***MODOS****
const cambiarModo = () =>{
    if ($('#bodyContainer').getAttribute('data-theme') === 'light'){
        $('#bodyContainer').setAttribute('data-theme','dark');
        $("#modeBtn").innerHTML = '🌕'
    }else if($('#bodyContainer').getAttribute('data-theme') === 'dark'){
        $('#bodyContainer').setAttribute('data-theme','light')
        $("#modeBtn").innerHTML = '🌑'
    }
}

$('#modeBtn').addEventListener('click', cambiarModo)

window.onload= actualizarVistas(traerDatos())
