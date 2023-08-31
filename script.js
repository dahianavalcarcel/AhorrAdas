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
        liItem.innerHTML += `<li>${item}</li>`
    });
}

//FUNCION QUE ELIMINA UN ITEM DE LA CATEGORIA 
// const deleteItem= (item)=>{
//     const categoriaIndex= listaCategorias.indexOf(item)
//     listaCategorias.splice(categoriaIndex, 1)
//     return createList(listaCategorias)
// }

//EVENTO CLICK PARA AGREGAR CATEGORIA
$('#btnCategoria').addEventListener('click', addCategoria)
