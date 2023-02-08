// Variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners(){
    // Captura el evento "Agregar al Carrito"
    listaCursos.addEventListener('click', agregarCurso);
}

/* ------- FUNCIONES --------*/ 

// Extrae el contenedor html del curso
function agregarCurso(e){
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

// Lee el HTML y extrae la información del curso
function leerDatosCurso(curso){
   
    console.log(curso);

    // Crear objeto con el contenido del curso
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // Validar existencia en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if(existe){

        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; // Retorna la cantidad objeto actualizado
            }else{
                return curso;// Retorna los objetos no duplicados
            }
        });

        articulosCarrito = [...cursos];

    }else{
        // Agregar elementos al arreglo del carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    
    
    console.log(articulosCarrito);
    carritoHTML();

}

// Mostrar la informacion en el carrito de compras
function carritoHTML(){

    // Limpiar el HTML
    limpiarHTML();

    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach( curso =>{
        console.log(curso);
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src=${imagen} width="110">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </td>
        `;
        
        //Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    })
}

// Elimina los cursos del HTML
function limpiarHTML(){
    // Forma Lenta
    // contenedorCarrito.innerHTML = ''; 

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }

}