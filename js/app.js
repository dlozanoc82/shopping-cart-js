// Variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners(){
    
    // Captura el evento "Agregar al Carrito"
    listaCursos.addEventListener('click', agregarCurso);

    // Elimina cursos del carrito
    carrito.addEventListener('click', elminarCurso)

    // Vaciar carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

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

// Elimina el curso del Carrito
function elminarCurso(e){
    
    if(e.target.classList.contains('borrar-curso')){

        const cursoId = e.target.getAttribute('data-id');
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        carritoHTML();

    }

}

// Vaciar carrito
function vaciarCarrito(){
    articulosCarrito = [];
    carritoHTML();
}

// Lee el HTML y extrae la información del curso
function leerDatosCurso(curso){
   
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

        articulosCarrito = [...cursos]; // Actualiza elementos al arreglo del carrito

    }else{
        articulosCarrito = [...articulosCarrito, infoCurso]; // Agregar elementos al arreglo del carrito
    }
    
    carritoHTML();
}

// Mostrar la informacion en el carrito de compras
function carritoHTML(){

    // Limpiar el HTML
    limpiarHTML();

    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach( curso =>{

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

