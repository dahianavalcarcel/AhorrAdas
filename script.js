//**************SELECTORES UNIVERSALES***************

const $=(selector)=> document.querySelector(selector)
const $$=(selector=> document.querySelectorAll(selector))
const randomId = ()=> self.crypto.randomUUID()

//***************NAVBAR BURGER***********************
document.addEventListener('DOMContentLoaded', () => {
    const navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

navbarBurgers.forEach( (element) => {
    element.addEventListener('click', () => {
        const target = element.dataset.target;
        const $target = document.getElementById(target);
        element.classList.toggle('is-active');
        $target.classList.toggle('is-active');
    });
    });
});

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

//******************VISTAS******************
const openAhorradas = () => {
    $("#seccion-balance").classList.add('is-active');
}

const openCategorias = () => {
    $("#vistaCategorias").classList.remove('is-hidden');
    $("#vistaCategorias").classList.add('is-active');
    $("#seccion-balance").classList.add('is-hidden');
    $("#vistaReportes").classList.add('is-hidden');
    $("#Seccion-NuevaOperacion").classList.add('is-hidden');
    $("#vista-editar-categorias").classList.add('is-hidden');
    $("#Seccion-EditarOperacion").classList.add('is-hidden');

}
const openBalance = () => {
    $("#seccion-balance").classList.remove('is-hidden');
    $("#seccion-balance").classList.add('is-active');
    $("#vistaCategorias").classList.add('is-hidden');
    $("#vistaReportes").classList.add('is-hidden');
    $("#Seccion-NuevaOperacion").classList.add('is-hidden');
    $("#vista-editar-categorias").classList.add('is-hidden');
    $("#Seccion-EditarOperacion").classList.add('is-hidden');
}
const openReportes= ()=>{
    $("#vistaReportes").classList.remove('is-hidden');
    $("#vistaReportes").classList.add('is-active');
    $("#vistaCategorias").classList.add('is-hidden');
    $("#seccion-balance").classList.add('is-hidden');
    $("#Seccion-NuevaOperacion").classList.add('is-hidden');
    $("#vista-editar-categorias").classList.add('is-hidden');
    $("#Seccion-EditarOperacion").classList.add('is-hidden');
}
const openNuevaOperacion = () => {
    $("#Seccion-NuevaOperacion").classList.remove('is-hidden');
    $("#Seccion-NuevaOperacion").classList.add('is-active');
    $("#vistaCategorias").classList.add('is-hidden');
    $("#seccion-balance").classList.add('is-hidden');
    $("#vistaReportes").classList.add('is-hidden');
    $("#vista-editar-categorias").classList.add('is-hidden');
    $("#Seccion-EditarOperacion").classList.add('is-hidden');
}
const openEditarCategoria= ()=>{
    $("#vista-editar-categorias").classList.remove('is-hidden');
    $("#vista-editar-categorias").classList.add('is-active');
    $("#vistaCategorias").classList.add('is-hidden');
    $("#seccion-balance").classList.add('is-hidden');
    $("#vistaReportes").classList.add('is-hidden');
    $("#Seccion-NuevaOperacion").classList.add('is-hidden');
    $("#Seccion-EditarOperacion").classList.add('is-hidden');
}
const openEditarOperacion=()=>{
    $("#Seccion-EditarOperacion").classList.remove('is-hidden');
    $("#Seccion-EditarOperacion").classList.add('is-active');
    $("#vistaCategorias").classList.add('is-hidden');
    $("#seccion-balance").classList.add('is-hidden');
    $("#vistaReportes").classList.add('is-hidden');
    $("#Seccion-NuevaOperacion").classList.add('is-hidden');
    $("#vista-editar-categorias").classList.add('is-hidden');
}

$("#btn-categorias").onclick = openCategorias
$("#btn-balance").onclick = openBalance
$("#btn-reportes").onclick = openReportes
$("#btn-nuevaOperacion").onclick = openNuevaOperacion
$('#btnCancelarEditar').onclick= openCategorias
$('#boton-cancelar-nueva-operacion').onclick= openBalance


const mostrarVistaEditar = () => {
    $$('.btn-editar').forEach((btn) => {
        btn.onclick = openEditarCategoria
    })
}

//INICIALIZAR
const inicializar=()=>{
    crearLista(categoriasLista)
    llenarSelect(categoriasLista)
    openAhorradas()
}

//FUNCION ACTUALIZAR VISTAS
const actualizarVistas = (datos) => {
    crearLista(datos.categorias);
    llenarSelect(datos.categorias);
};

//*****************localStorage************************

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

//******************CATEGORIAS******************

//***categorias predefinidas y local Storage****
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

//FUNCION QUE ***CREA LA LISTA EN EL HTML***
const crearLista=(categorias)=>{
    $('#listaCategorias').innerHTML='';
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

//FUNCION PARA ***LLENAR EL SELECT***
const llenarSelect = (categorias) =>{
    $$('.categoriasSelect').forEach((select)=>{
        select.innerHTML='<option value="todasCategorias">Todas</option>'
        for(let {nombre, id} of categorias){
        select.innerHTML += `<option value="${id}" aria-label="${nombre}">${nombre}</option>`}
    })
}

//FUNCION ***OBTENER CATEGORIA***
const obtenerCategoria = (idCategoria, categoria) =>{
    return categoriasLista.find((categoria) => categoria.id == idCategoria)
}

//FUNCION QUE ***AGREGA UNA CATEGORIA NUEVA***
const addCategoria=()=>{
    let nuevaCategoria= {
        id:randomId(),
        nombre:$('#nombre-categoria').value,
    }
    categoriasLista.push(nuevaCategoria)
    subirDatos({categorias: [...categoriasLista]})
    actualizarVistas(traerDatos())
    $('#categoriasForm').reset()
}
$('#btnCategoria').addEventListener('click', addCategoria)

//FUNCION PARA ***EDITAR CATEGORIAS***
const mostrarEdicionDeCategoria=(id)=>{
    mostrarVistaEditar()
    let categoriaAEditar= obtenerCategoria(id, categoriasLista)
    $('#editar-categoria-input').value = categoriaAEditar.nombre
    $('#btnEditarCategoria').addEventListener('click', ()=>edicionDeCategoria
    (categoriaAEditar.nombre, categoriaAEditar.id))
}
const edicionDeCategoria=(nombre, id)=>{
    let nuevaCategoria= {
        id: id,
        nombre: $('#editar-categoria-input').value,
    }
    let categoriasActualizadas = categoriasLista.map((categoria) =>
        categoria.nombre === nombre ? { ...nuevaCategoria } : categoria
    )
    categoriasLista = categoriasActualizadas
    subirDatos({ categorias: [...categoriasActualizadas] })
    actualizarVistas(traerDatos())
    openCategorias()
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
    let categoriasSinEliminar= categoriasLista.filter((categoria) =>
    categoria.id != idEliminar)
    categoriasLista=categoriasSinEliminar
    subirDatos({categorias: [...categoriasSinEliminar]})
    actualizarVistas(traerDatos())
}

//***************************************************

//EVENTO CAMBIAR SECCIONES- BALANCE-CATEGORIAS-REPORTES

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

 // Llama a la función para mostrar las operaciones al cargar la página
document.addEventListener('DOMContentLoaded', () => {
        mostrarOperaciones(operaciones);
});
// Operaciones almacenadas en localStorage o inicializar un array vacío
let operaciones = JSON.parse(localStorage.getItem("operaciones")) || [];

// Función para guardar las operaciones en localStorage
const guardarOperacionesEnLocalStorage = (array) => {
    localStorage.setItem("operaciones", JSON.stringify(array));
};
let operacionIdAEditar = null;
const btnAgregarOperacion = document.getElementById("boton-agregar-operacion");

// Obtener valores del formulario y agregar una nueva operación
const agregarOperacion = () => {
    const descripcion = document.getElementById("input-descripcion").value;
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
    guardarOperacionesEnLocalStorage(operaciones); // Guardar en localStorage

    document.getElementById("input-descripcion").value = "";
    document.getElementById("input-monto").value = "";
    document.getElementById("select-tipo-op").value = "gasto";
    document.getElementById("select-categorias-op").value = "";
    document.getElementById("input-fecha").value = "";

    mostrarOperaciones(operaciones);
};

btnAgregarOperacion.onclick = agregarOperacion;


// Función para mostrar las operaciones en el HTML
const mostrarOperaciones = (array) => {
    const containerDescripcion = document.getElementById("valor-descripcion");
    const containerCategoria = document.getElementById("valor-categoria");
    const containerAcciones =  document.getElementById("valor-acciones");
    const containerMonto = document.getElementById("valor-monto");
    const containerFecha = document.getElementById("valor-fecha");
    containerDescripcion.innerHTML = "";
    containerCategoria.innerHTML = "";
    containerAcciones.innerHTML = "";
    containerMonto.innerHTML = "";
    containerFecha.innerHTML = "";

    array.forEach((elemento) => {
        organizarLista(containerDescripcion, elemento.descripcion);
        organizarLista(containerCategoria, elemento.categoria);
        organizarLista(containerFecha, elemento.fecha);

        const monto = document.createElement("p");
        if (elemento.tipo === 'ganancia'){
            monto.innerHTML = `+$${elemento.monto}`
            monto.style.color = "hsl(153, 53%, 53%)"
            monto.style.margin = "30px";
            
        } else if (elemento.tipo === "gasto"){
            monto.innerHTML = `-$ ${elemento.monto}`;
            monto.style.color = "hsl(348, 86%, 61%)"
            monto.style.margin = "25px";
        }
        containerMonto.appendChild(monto);

        const btnEditar = document.createElement("button");
        btnEditar.onclick = () => editarOperacion(elemento.id);
        btnEditar.textContent = "Editar";
        btnEditar.classList.add('btn-editar')
        btnEditar.style.border = 'none';
        btnEditar.style.padding = '5px';
        btnEditar.style.marginTop = '16px';
        
        
        const btnEliminar = document.createElement("button");
        btnEliminar.onclick = () => eliminarOperacion(elemento.id);
        btnEliminar.textContent = "Eliminar";
        btnEliminar.classList.add('btn-eliminar')
        btnEliminar.style.border= 'none';
        btnEliminar.style.marginBottom = '16px';
        btnEliminar.style.fontSize = '12px';


        const divAcciones = document.createElement("div");
        divAcciones.appendChild(btnEditar);
        divAcciones.appendChild(btnEliminar);
        containerAcciones.appendChild(divAcciones);
    });
    actualizarBalance(array)
    actualizarReportes(array)
    actualizarVistaOperaciones()
    balanceTotalCondicion()
    openBalance()
};


$("#btn-editar-op").addEventListener('click', () => guardarCambiosOperacion())
$('#btn-cancelar-edicion').addEventListener('click', () => openBalance())

const editarOperacion = (id) => {
    openEditarOperacion()

    const opAEditar = operaciones.find(op => op.id === id);

    document.getElementById("input-editar-descripcion").value = opAEditar.descripcion;
    document.getElementById("input-editar-monto").value = opAEditar.monto;
    document.getElementById("select-tipo-editar-op").value = opAEditar.tipo;
    document.getElementById("input-editar-fecha").value = opAEditar.fecha;
    const select = document.getElementById("select-categorias-editar-op");
    const categoria = select.options[select.selectedIndex];
    categoria.text = opAEditar.categoria;

    operacionIdAEditar = id;
}

const guardarCambiosOperacion = () => {
    const descripcion = document.getElementById("input-editar-descripcion").value;
    const monto = parseFloat(document.getElementById("input-editar-monto").value);
    const tipo = document.getElementById("select-tipo-editar-op").value;
    const fecha = document.getElementById("input-editar-fecha").value;
    const select = document.getElementById("select-categorias-editar-op");
    const categoria = select.options[select.selectedIndex].text;

    const operacionEditada = operaciones.find(op => op.id === operacionIdAEditar)

    if (operacionEditada) {
        operacionEditada.descripcion = descripcion;
        operacionEditada.monto = monto;
        operacionEditada.tipo = tipo;
        operacionEditada.fecha = fecha;
        operacionEditada.categoria = categoria;

        guardarOperacionesEnLocalStorage(operaciones);
    }
    operacionIdAEditar = null;
    mostrarOperaciones(operaciones);
};

const eliminarOperacion = (id) => {
    operaciones = operaciones.filter(elemento => elemento.id !== id);
    guardarOperacionesEnLocalStorage(operaciones);
    mostrarOperaciones(operaciones);
}

const organizarLista = (div, propiedad) => {
    const element = document.createElement('p');
    element.style.fontWeight= '150';
    element.style.margin= '30px';
    element.textContent = `${propiedad}`;
    div.appendChild(element);
}

const seccionSinOperaciones = document.getElementById("sin-operaciones");
const listadoOperaciones = document.getElementById("listado-operaciones");


const actualizarVistaOperaciones = () => {
    if (operaciones.length > 0 ) {
        seccionSinOperaciones.style.display = "none";
        listadoOperaciones.style.display = "block"
    }
    else  {
        listadoOperaciones.style.display = "none";
        seccionSinOperaciones.style.display = "block"
    }
}


//******************BALANCE******************

const balanceGananciasTotales = document.getElementById("balance-ganancias-totales");
const balanceTotalesOperables = document.getElementById("balance-totales-operables");
const balanceGastosTotales = document.getElementById("balance-gastos-totales");

const balanceGastosGanancias = (array, tipo) => {

    const filtroOp = array.filter((elemento) => {
      return elemento.tipo === tipo && elemento
    })
    const reduceGastos = filtroOp.reduce((acc, elemento) => {
      return acc + Number(elemento.monto)
    }, 0)

    return reduceGastos
  }
  let balanceTotal;

  const actualizarBalance = () => {
    if (!operaciones || !operaciones[0]){
        return "No hay Operaciones"
    }
    else{
        balanceTotal = balanceGastosGanancias(operaciones, "ganancia") - balanceGastosGanancias(operaciones, "gasto");
        return balanceTotal
    }
  }


  const balancesActualizados = () => {
    balanceGananciasTotales.innerHTML = `+$${balanceGastosGanancias(operaciones, "ganancia")}`
    balanceGastosTotales.innerHTML = `-$${balanceGastosGanancias(operaciones, "gasto")}`

    if (balanceTotal > 0) {
        balanceTotalesOperables.innerHTML = `+$${balanceTotal}`
        balanceTotalesOperables.style.color = "hsl(153, 53%, 53%)"
    }
    else if (balanceTotal < 0) {
        balanceTotalesOperables.innerHTML = `-$${Math.abs(balanceTotal)}`
        balanceTotalesOperables.style.color = "hsl(348, 86%, 61%)"
    }
    else {
        // Manejo para el caso de balanceTotal igual a 0
        balanceTotalesOperables.innerHTML = `$${balanceTotal}`
        balanceTotalesOperables.style.color = "inherit" // Restaurar el color predeterminado
    }
}


  const balanceEnCero = () => {
    balanceGananciasTotales.innerHTML = `+$${0}`
    balanceGastosTotales.innerHTML = `-$${0}`
    balanceTotalesOperables.innerHTML = `$${0}`
  }

  balanceTotalCondicion = () => localStorage.getItem("operaciones") === "[]" ? balanceEnCero() : balancesActualizados()
  balanceTotalCondicion()


//******************REPORTES******************//

const totalesPorCategoria= (operaciones) => {
    $('#listaTotalesPorCategoria').innerHTML= `<div class="columns lista is-flex">
    <h3 class="column is-center is-3">Categoría:</h3>
    <h3 class="column is-center is-3">Ganancias:</h3>
    <h3 class="column is-center is-3">Gastos:</h3>
    <h3 class="column is-center is-3">Balance:</h3>
    </div>`

    let categoriaMayorGanancia= "";
    let categoriaMayorGasto="";
    let categoriaMayorBalance="";
    let montoMayorGanancia= 0;
    let montoMayorGasto= 0;
    let montoMayorBalance= 0;

    for (let { nombre, id } of categoriasLista) {
        let operacionesPorCategoria = operaciones.filter((operacion) =>
            operacion.categoria === nombre
        )
        let gananciasTotalesPorCategoria = operacionesPorCategoria.filter((operacion) => operacion.tipo !== "gasto")
        let totalGanancia = gananciasTotalesPorCategoria.reduce((acum, ganancia) =>
            acum + ganancia.monto
            , 0)

        if (categoriaMayorGanancia === "" && montoMayorGanancia === 0) {
            categoriaMayorGanancia = nombre
            montoMayorGanancia = totalGanancia
        } else if (totalGanancia > montoMayorGanancia) {
            categoriaMayorGanancia = nombre
            montoMayorGanancia = totalGanancia
        }

        let gastosTotalesPorCategoria = operacionesPorCategoria.filter((operacion) => operacion.tipo === "gasto")
        let totalGasto = gastosTotalesPorCategoria.reduce((acum, gasto) =>
            acum - gasto.monto
            , 0)

        if (categoriaMayorGasto === "" && montoMayorGasto === 0) {
            categoriaMayorGasto = nombre
            montoMayorGasto = totalGasto
        } else if (montoMayorGasto > totalGasto) {
            categoriaMayorGasto = nombre
            montoMayorGasto = totalGasto
        }

        let totalBalance = (totalGanancia) + (totalGasto)

        if (categoriaMayorBalance === " " && montoMayorBalance === 0) {
            categoriaMayorBalance = nombre
            montoMayorBalance = totalBalance
        } else if (totalGanancia > montoMayorBalance) {
            categoriaMayorBalance = nombre,
                montoMayorBalance = totalBalance

        }

        if (totalGanancia != 0 || totalGasto != 0) {
            $('#listaTotalesPorCategoria').innerHTML += `
            <div class="columns lista is-flex">
            <p class="column is-3 elemento-lista is-center">${nombre}</p>
            <p class="column is-3 is-center is-green" id="totalGanancia">$${totalGanancia}</p>
            <p class="column is-3 is-center is-red" id="totalGasto">$${totalGasto}</p>
            <p class="column is-3 is-center">$${totalBalance}</p>
            </div>`
        }


        $('#categoriaMayorGanancia').innerHTML = `<span class="elemento-lista is-center">${categoriaMayorGanancia}</span>`
        $('#montoMayorGanancia').innerHTML = `<span class="is-center is-green">$${montoMayorGanancia}</span>`
        $('#categoriaMayorGasto').innerHTML = `<span class="elemento-lista is-center">${categoriaMayorGasto}</span>`
        $('#montoMayorGasto').innerHTML = `<span class="is-center is-red">$${montoMayorGasto}</span>`
        $('#categoriaMayorBalance').innerHTML = `<span class="elemento-lista is-center">${categoriaMayorBalance}</span>`
        $('#montoMayorBalance').innerHTML = `<span class="is-center">$${montoMayorBalance}</span>`
    }
    
}

//totalesPorCategoria(operaciones)

const totalesPorMes = (operaciones) => {
    $('#listaTotalesMes').innerHTML = `<div class="columns lista is-flex">
    <h3 class="column is-center is-3">Mes:</h3>
    <h3 class="column is-center is-3">Ganancias:</h3>
    <h3 class="column is-center is-3">Gastos:</h3>
    <h3 class="column is-center is-3">Balance:</h3>
    </div>`
    const meses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    let mesMayorGanancia = "";
    let mesMayorGasto = "";
    let montoMesMayorGanancia = 0;
    let montoMesMayorGasto = 0;
    for (let mesNume of meses) {

        const operacionesPorMes = operaciones.filter((operacion) =>
            new Date(operacion.fecha).getMonth() + 1 === mesNume
        )
        let gananciasTotalesPorMes = operacionesPorMes.filter((operacion) => operacion.tipo !== "gasto")
        let totalGanancia = gananciasTotalesPorMes.reduce((acum, ganancia) =>
            acum + ganancia.monto
            , 0)
        if (mesMayorGanancia === " " && montoMesMayorGanancia === 0) {
            mesMayorGanancia = mesNume
            montoMesMayorGanancia = totalGanancia
        } else if (totalGanancia > montoMesMayorGanancia) {
            mesMayorGanancia = mesNume,
                montoMesMayorGanancia = totalGanancia
        }
        let gastosTotalesPorMes = operacionesPorMes.filter((operacion) => operacion.tipo === "gasto")
        let totalGasto = gastosTotalesPorMes.reduce((acum, gasto) =>
            acum - gasto.monto
            , 0)
        if (mesMayorGasto === "" && montoMesMayorGasto === 0) {
            mesMayorGasto = mesNume
            montoMesMayorGasto = totalGasto
        } else if (totalGasto < montoMesMayorGasto) {
            mesMayorGasto = mesNume
            montoMesMayorGasto = totalGasto
        }

        let totalBalance= (totalGanancia) + (totalGasto)

        if(totalGanancia != 0 || totalGasto != 0){
        $('#listaTotalesMes').innerHTML += `
        <div class="columns lista is-flex">
        <p class="column is-3 is-center elemento-lista">${mesNume}</p>
        <p class="column is-3 is-center is-green">$${totalGanancia}</p>
        <p class="column is-3 is-center is-red">$${totalGasto}</p>
        <p class="column is-3 is-center">$${totalBalance}</p>
        </div>`
        }

        $('#mesMayorGanancia').innerHTML = `<span class="elemento-lista is-center">${mesMayorGanancia}</span>`
        $('#montoMesMayorGanancia').innerHTML = `<span class="is-center is-green">$${montoMesMayorGanancia}</span>`
        $('#mesMayorGasto').innerHTML = `<span class="elemento-lista is-center">${mesMayorGasto}</span>`
        $('#montoMesMayorGasto').innerHTML = `<span class="is-center is-red">$${montoMesMayorGasto}</span>`
    }
}

const actualizarReportes=(op)=>{
    const gananciasOp= op.filter((operacion) => operacion.tipo !== "gasto")
    const gastosOp=op.filter((operacion) => operacion.tipo === "gasto")
    if(gananciasOp.length === 0 || gastosOp.length === 0){
        $('#sinReportes').classList.remove('is-hidden')
        $('#sinReportes').classList.add('is-active')
        $('#conReportes').classList.add('is-hidden')
    }else if(gananciasOp.length >= 1 || gastosOp.length >= 1){
        $('#sinReportes').classList.remove('is-active')
        $('#sinReportes').classList.add('is-hidden')
        $('#conReportes').classList.remove('is-hidden')
        totalesPorCategoria(op);
        totalesPorMes(op);
    }
}

actualizarReportes(operaciones)

//******************Filtros******************//

const inputDateFiltro = document.getElementById("input-date");
const contenedorFiltros = document.getElementById("cambiar-filtros");
const filtrosTipo = document.getElementById("filtros-tipo");
const selectOrdenarPor = document.getElementById("ordenar-por");
const selectCategoriasDeFiltros = document.getElementById("select-filtro-categorias");

let arrayFiltrado = [...operaciones]

const filtrosPorTipo = () => {
  const filtroTipo = filtrosTipo.value
  const filtracionPorTipo = operaciones.filter((operacion) => {
      if (filtroTipo.toLowerCase() === "todos") {
          return operacion
        }
        return operacion.tipo === filtroTipo
    })
  return filtracionPorTipo
}
const filtrosPorCategoria = () => {
    const filtracionPorCategoria = selectCategoriasDeFiltros.options[selectCategoriasDeFiltros.selectedIndex].text;
  const filtrado = operaciones.filter((operacion) => {
    if (filtracionPorCategoria.toLowerCase() === "todas") {
      return operaciones
    }
    return operacion.categoria === filtracionPorCategoria
  })
  return filtrado
}

filtrosTipo.onchange = () => {
    const arrayFiltradoTipo = filtrosPorTipo()
    mostrarOperaciones(arrayFiltradoTipo)
}

selectCategoriasDeFiltros.onchange = () => {
    const arrayFiltradoCategoria = filtrosPorCategoria()
    mostrarOperaciones(arrayFiltradoCategoria);
}

// FILTRO POR FECHA

const filtradoPorFecha = (array) => {
  inputDateFiltro.oninput = () => {
    const arrayFiltrado = array.filter((elemento) => {
      return new Date(elemento.fecha) > new Date(inputDateFiltro.value)
    })
    mostrarOperaciones(arrayFiltrado)
  }
}
filtradoPorFecha(operaciones)

/////////////////// ORDENAR POR ////////////////////

// MÁS Y MENOS RECIENTE

const ordenarMasRecientes = (array) => {
  const fechasOrdenadas = array.sort((a, b) => {
    return new Date(b.fecha) - new Date(a.fecha)
  })
  return fechasOrdenadas
}

const ordenarMenosRecientes = (array) => {
  const fechasOrdenadas = array.sort((a, b) => {
    return new Date(a.fecha) - new Date(b.fecha)
  })
  return fechasOrdenadas
}

const masYMenosRecientes = () => {
  if (selectOrdenarPor.value === "mas-reciente") {
  mostrarOperaciones(ordenarMasRecientes(operaciones))
  }
  else if (selectOrdenarPor.value === "menos-reciente") {
   mostrarOperaciones(ordenarMenosRecientes(operaciones))
  }
}

// MENOR MONTO

const arrayOrdenadoMenorMonto = [...operaciones].sort((a, b) => {
  return a.monto - b.monto
})

// MAYOR MONTO

const arrayOrdenadoMayorMonto = [...operaciones].sort((a, b) => {
  return b.monto - a.monto
})

const mayorMenorMonto = () => {
  if (selectOrdenarPor.value === "mayor-monto") {
    mostrarOperaciones(arrayOrdenadoMayorMonto)
  }
  else if (selectOrdenarPor.value === "menor-monto") {
    mostrarOperaciones(arrayOrdenadoMenorMonto)
  }
}

// ORDENAR A/Z Y Z/A

const arrayOrdenadoA = [...operaciones].sort((a, b) => {
  if (a.descripcion.toLowerCase() < b.descripcion.toLowerCase()) {
    return -1
  }
})

const arrayOrdenadoZ = [...operaciones].sort((a, b) => {
  if (a.descripcion.toLowerCase() > b.descripcion.toLowerCase()) {
    return -1
  }
})

const ordenarAlfabeticamente = () => {
  if (selectOrdenarPor.value === "a-z") {
   mostrarOperaciones(arrayOrdenadoA)
  }
  else if (selectOrdenarPor.value === "z-a") {
    mostrarOperaciones(arrayOrdenadoZ)
  }
}

const selectOrdenarPorAHTML = () => {
  selectOrdenarPor.oninput = () => {
    masYMenosRecientes()
    mayorMenorMonto()
    ordenarAlfabeticamente()
  }
}

selectOrdenarPorAHTML()


window.onload= inicializar

