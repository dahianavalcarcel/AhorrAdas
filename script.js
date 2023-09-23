//***************NAVBAR BURGER***********************
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

//**************SELECTORES UNIVERSALES***************

const $=(selector)=> document.querySelector(selector)
const $$=(selector=> document.querySelectorAll(selector))
const randomId = ()=> self.crypto.randomUUID()

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




//******************VISTAS******************

const openAhorradas = () => {
    $("#vistaCategorias").style.display = "none";
    $("#Seccion-NuevaOperacion").style.display = "none";
    $("#vistaReportes").style.display="none"
    $('#vista-editar-categorias').style.display='none'
    $("#Seccion-EditarOperacion").style.display = "none";
}
const openCategorias = () => {
    $("#seccion-balance").style.display = "none";
    $("#vistaCategorias").style.display = "flex";
    $("#Seccion-NuevaOperacion").style.display = "none";
    $("#vistaReportes").style.display="none"
    $('#vista-editar-categorias').style.display='none'
    $("#Seccion-EditarOperacion").style.display = "none";
}
const openBalance = () => {
    $("#seccion-balance").style.display = "flex";
    $("#vistaCategorias").style.display = "none";
    $("#Seccion-NuevaOperacion").style.display = "none";
    $("#vistaReportes").style.display="none"
    $('#vista-editar-categorias').style.display='none'
    $("#Seccion-EditarOperacion").style.display = "none";
}
const openReportes= ()=>{
    $("#seccion-balance").style.display = "none";
    $("#vistaCategorias").style.display = "none";
    $("#Seccion-NuevaOperacion").style.display = "none";
    $("#vistaReportes").style.display="flex"
    $('#vista-editar-categorias').style.display='none'
    $("#Seccion-EditarOperacion").style.display = "none";
}
const openNuevaOperacion = () => { 
    $("#seccion-balance").style.display = "none";
    $("#vistaCategorias").style.display = "none";
    $("#Seccion-NuevaOperacion").style.display = "flex";
    $("#vistaReportes").style.display="none"
    $('#vista-editar-categorias').style.display='none'
    $("#Seccion-EditarOperacion").style.display = "none";
}
const openEditarCategoria= ()=>{
    $("#seccion-balance").style.display = "none";
    $("#vistaCategorias").style.display = "none";
    $("#Seccion-NuevaOperacion").style.display = "none";
    $("#vistaReportes").style.display="none"
    $('#vista-editar-categorias').style.display='flex'
    $("#Seccion-EditarOperacion").style.display = "none";
}

$("#btn-categorias").onclick = openCategorias
$("#btn-balance").onclick = openBalance
$("#btn-reportes").onclick = openReportes
$("#btn-nuevaOperacion").onclick = openNuevaOperacion
$('#btnCancelarEditar').onclick= openCategorias
$('#boton-cancelar-nueva-operacion').onclick= openBalance
openAhorradas()

const mostrarVistaEditar = () => {
    $$('.btn-editar').forEach((btn) => {
        btn.addEventListener('click', () =>
            openEditarCategoria()
            )
    })
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

const inicializar=()=>{
    crearLista(categoriasLista)
    llenarSelect(categoriasLista)
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
    let nuevaLista= [...categoriasLista, nuevaCategoria]
    llenarSelect(nuevaLista)
    console.log(nuevaLista)
    subirDatos({categorias: nuevaLista})
    actualizarVistas(traerDatos())
    $('#categoriasForm').reset()
}
$('#btnCategoria').addEventListener('click', ()=> addCategoria())

//*************
//FUNCION ***OBTENER CATEGORIA***
const obtenerCategoria = (idCategoria, categoria) =>{
    return categoriasLista.find((categoria) => categoria.id == idCategoria)
}

//FUNCION PARA ***EDITAR CATEGORIAS***
const mostrarEdicionDeCategoria=(id)=>{
    mostrarVistaEditar()
    let categoriaAEditar= obtenerCategoria(id,traerCategorias())
    $('#editar-categoria-input').value = categoriaAEditar.nombre
    $('#btnEditarCategoria').addEventListener('click', ()=>
    edicionDeCategoria(categoriaAEditar.nombre, categoriaAEditar.id))
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

btnCategorias.onclick = openCategorias
btnBalance.onclick = openBalance
btnReportes.onclick = openReportes
btnAhorradas.onclick = openAhorradas
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

 // Llama a la función para mostrar las operaciones al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    mostrarOperaciones(operaciones);
});


$("#btn-editar-op").addEventListener('click', () => guardarCambiosOperacion())
$('#btn-cancelar-edicion').addEventListener('click', () => openBalance())

// Operaciones almacenadas en localStorage o inicializar un array vacío
let operaciones = JSON.parse(localStorage.getItem("operaciones")) || [];

// Función para guardar las operaciones en localStorage
const guardarOperacionesEnLocalStorage = () => {
    localStorage.setItem("operaciones", JSON.stringify(operaciones));
};


const btnAgregarOperacion = document.getElementById("boton-agregar-operacion");


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
    document.getElementById("input-fecha").valueAsDate = new Date();

    mostrarOperaciones(operaciones);
};


btnAgregarOperacion.onclick = agregarOperacion;


// Función para mostrar las operaciones en el HTML
const mostrarOperaciones = (array) => {
    const containerDescripcion = document.getElementById("valor-descripcion");
    containerDescripcion.innerHTML = ""
    const containerMonto = document.getElementById("valor-monto");
    containerMonto.innerHTML = ""
    const containerFecha = document.getElementById("valor-fecha");
    containerFecha.innerHTML = ""
    const containerCategoria = document.getElementById("valor-categoria");
    containerCategoria.innerHTML = ""
    const containerAcciones =  document.getElementById("valor-acciones");
    containerAcciones.innerHTML = ""
    

    array.forEach((elemento) => {
        organizarLista(containerDescripcion, elemento.descripcion);
        organizarLista(containerFecha, elemento.fecha);
        organizarLista(containerCategoria, elemento.categoria);

        // Formato especial para monto. 
        const monto = document.createElement("p");
        if (elemento.tipo === 'ganancia'){
            monto.innerHTML = `+$${elemento.monto}`
            monto.style.color = "hsl(153, 53%, 53%)"
        } else if (elemento.tipo === "gasto"){
            monto.innerHTML = `-$ ${elemento.monto}`;
            monto.style.color = "hsl(348, 86%, 61%)"
        }
        containerMonto.appendChild(monto)
        //
        
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

    openBalance()
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

const guardarCambiosOperacion = () => {
    const descripcion = document.getElementById("input-editar-descripcion").value;
    const monto = parseFloat(document.getElementById("input-editar-monto").value);
    const tipo = document.getElementById("select-tipo-editar-op").value;
    const fecha = document.getElementById("input-editar-fecha").value;
    const select = document.getElementById("select-categorias-editar-op");
    const categoria = select.options[select.selectedIndex].text;
  
    const operacionEditada = operaciones.find(op => op.id === operacionIdAEditar);

    if (operacionEditada) {
        operacionEditada.descripcion = descripcion;
        operacionEditada.monto = monto;
        operacionEditada.tipo = tipo;
        operacionEditada.fecha = fecha;
        operacionEditada.categoria = categoria;

        guardarOperacionesEnLocalStorage();
    }

const operacionesGuardadas = localStorage.getItem("operaciones");
if (operacionesGuardadas) {
    operaciones = JSON.parse(operacionesGuardadas);
   mostrarOperaciones(operaciones);
}

    document.getElementById("input-editar-descripcion").value = "";
    document.getElementById("input-editar-monto").value = "";
    document.getElementById("select-tipo-editar-op").value = "gasto";
    document.getElementById("select-categorias-editar-op").value = "";
    document.getElementById("input-editar-fecha").value = "";

    operacionIdAEditar = null;


    // Vuelve a mostrar la lista actualizada de operaciones
//    mostrarOperaciones();
};

const eliminarOperacion = (id) => {
    operaciones = operaciones.filter(elemento => elemento.id !== id);
    guardarOperacionesEnLocalStorage();
    mostrarOperaciones(operaciones);
}

const organizarLista = (div, propiedad) => {
    const element = document.createElement('p');
    element.style.fontWeight= '150';
    element.textContent = `${propiedad}`;
    div.appendChild(element);
}




const seccionSinOperaciones = document.getElementById("sin-operaciones");
const listadoOperaciones = document.getElementById("listado-operaciones");

if (operaciones.length > 0 ) {
    seccionSinOperaciones.style.display = "none";
}
else  {
    listadoOperaciones.style.display = "none";
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
  const balanceTotal = balanceGastosGanancias(operaciones, "ganancia") - balanceGastosGanancias(operaciones, "gasto")
  
  const balancesActualizados = () => {
    balanceGananciasTotales.innerHTML = `+$${balanceGastosGanancias(operaciones, "ganancia")}`
    balanceGastosTotales.innerHTML = `-$${balanceGastosGanancias(operaciones, "gasto")}`

    if(balanceTotal > 0 ) {
        balanceTotalesOperables.innerHTML = `+$${balanceTotal}`
        balanceTotalesOperables.style.color = "hsl(153, 53%, 53%)"
    }
    else if (balanceTotal < 0 ) {
        balanceTotalesOperables.innerHTML = `-$${balanceTotal}`
        balanceTotalesOperables.style.color ="hsl(348, 86%, 61%)"
    }
  }
  
  const balanceEnCero = () => {
    balanceGananciasTotales.innerHTML = `+$${0}`
    balanceGastosTotales.innerHTML = `-$${0}`
    balanceTotalesOperables.innerHTML = `$${0}`
  }
  
  balanceTotalCondicion = () => localStorage.getItem("operaciones") === "[]" ? balanceEnCero() : balancesActualizados()
  balanceTotalCondicion()





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


//******************REPORTES******************//
const resumen=()=> {
    const operacionesResumen= operaciones()
    const categoriasResumen= categoriasLista
}
const totalesPorCategoria= (operaciones) => {       
        let categoriaMayorGanancia= "";
        let categoriaMayorGasto="";
        let categoriaMayorBalance="";
        let montoMayorGanancia= 0;
        let montoMayorGasto= 0;
        let montoMayorBalance= 0;

        for (let {nombre, id} of categoriasLista){
            let operacionesPorCategoria = operaciones.filter((operacion)=> 
            operacion.categoria === nombre
            //console.log(nombre)
            )
            let gananciasTotalesPorCategoria= operacionesPorCategoria.filter((operacion) => operacion.tipo !== "gasto")
            let totalGanancia= gananciasTotalesPorCategoria.reduce((acum, ganancia) => 
                acum + ganancia.monto
            , 0)

            if(categoriaMayorGanancia === "" && montoMayorGanancia=== 0){
                categoriaMayorGanancia = nombre
                montoMayorGanancia = totalGanancia
            }else if (totalGanancia > montoMayorGanancia){
                categoriaMayorGanancia = nombre
                montoMayorGanancia = totalGanancia
            }

            let gastosTotalesPorCategoria= operacionesPorCategoria.filter((operacion) => operacion.tipo === "gasto")
            let totalGasto= gastosTotalesPorCategoria.reduce((acum, gasto) => 
                acum - gasto.monto
            , 0)

            if(categoriaMayorGasto === "" && montoMayorGasto===0){
                categoriaMayorGasto = nombre
                montoMayorGasto = totalGanancia
            }else if (montoMayorGasto > totalGasto){
                categoriaMayorGasto = nombre
                montoMayorGasto = totalGasto
            }

            let totalBalance= (totalGanancia) + (totalGasto)

            if(categoriaMayorBalance === " " && montoMayorBalance=== 0){
                categoriaMayorBalance = nombre
                montoMayorBalance = totalBalance
            }else if(totalGanancia > montoMayorBalance){
                categoriaMayorBalance = nombre,
                montoMayorBalance = totalBalance

        }

        //console.log(categoriaMayorBalance, montoMayorBalance)

        $('#categoriaMayorGanancia').innerHTML=`<span class="elemento-lista is-center">${categoriaMayorGanancia}</span>`
        $('#montoMayorGanancia').innerHTML=`$${montoMayorGanancia}`
        $('#categoriaMayorGasto').innerHTML=`<span class="elemento-lista is-center">${categoriaMayorGasto}</span>`
        $('#montoMayorGasto').innerHTML=`$${montoMayorGasto}`
        $('#categoriaMayorBalance').innerHTML=`<span class="elemento-lista is-center">${categoriaMayorBalance}</span>`
        $('#montoMayorBalance').innerHTML=`$${montoMayorBalance}`
        }
}
totalesPorCategoria(operaciones)

const totalesPorMes= (operaciones) => {   
    const meses= [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]    
    let mesMayorGanancia= "";
    let mesMayorGasto="";
    let montoMesMayorGanancia= 0;
    let montoMesMayorGasto= 0;
    for (let mesNume of meses){
        
        const operacionesPorMes = operaciones.filter((operacion)=>
        new Date(operacion.fecha).getMonth() + 1 === mesNume
        )
        let gananciasTotalesPorMes= operacionesPorMes.filter((operacion) => operacion.tipo !== "gasto")
        let totalGanancia= gananciasTotalesPorMes.reduce((acum, ganancia) => 
            acum + ganancia.monto
        , 0)
        if(mesMayorGanancia === " " && montoMesMayorGanancia=== 0){
                mesMayorGanancia = mesNume
                montoMesMayorGanancia = totalGanancia
            }else if(totalGanancia > montoMesMayorGanancia){
                mesMayorGanancia = mesNume,
                montoMesMayorGanancia = totalGanancia
            }
        let gastosTotalesPorMes= operacionesPorMes.filter((operacion) => operacion.tipo === "gasto")
        let totalGasto= gastosTotalesPorMes.reduce((acum, gasto) => 
            acum - gasto.monto
        , 0)
        if(mesMayorGasto === "" && montoMesMayorGasto===0){
            mesMayorGasto = mesNume
            montoMesMayorGasto = totalGasto
        }else if(totalGasto < montoMesMayorGasto){
            mesMayorGasto = mesNume
            montoMesMayorGasto = totalGasto
        }
}

    $('#mesMayorGanancia').innerHTML=`<span class="elemento-lista is-center">${mesMayorGanancia}</span`
    $('#montoMesMayorGanancia').innerHTML=`$${montoMesMayorGanancia}`
    $('#mesMayorGasto').innerHTML=`<span class="elemento-lista is-center">${mesMayorGasto}</span>`
    $('#montoMesMayorGasto').innerHTML=`$${montoMesMayorGasto}`
}
totalesPorMes(operaciones)

const reportesPorCategoria=(operaciones)=>{
    for (let categoria of categoriasLista){
        //console.log(categoria)
        let operacionesIncluyeCategoria = operaciones.filter((operacion) => (operacion.categoria) === categoria.nombre)
        console.log(operacionesIncluyeCategoria)
        }
    }


reportesPorCategoria(operaciones)






//******************Filtros******************//


const formularioFiltros = document.getElementById("formulario-filtros");
const inputDateFiltro = document.getElementById("input-date");
const botonOcultarFiltros = document.getElementById("boton-cambiar-filtros");
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
    console.log(filtracionPorCategoria);
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
  console.log(arrayFiltradoTipo);
    mostrarOperaciones(arrayFiltradoTipo)
}

selectCategoriasDeFiltros.onchange = () => {
  const arrayFiltradoCategoria = filtrosPorCategoria()
    mostrarOperaciones(arrayFiltradoCategoria)

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

mostrarOperaciones(ordenarMasRecientes(operaciones))

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


window.onload= ()=> inicializar()
