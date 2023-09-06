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