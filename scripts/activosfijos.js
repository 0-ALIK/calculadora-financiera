import { obtenerLocalStorage, guardarEnLocalStorage } from "./funciones_helpers";
import { activos } from "./base_datos";

// Valor inicial de años acumulados
let anosAcumulados = 3;

// Obtener los activos almacenados en localStorage o usar los valores iniciales si no hay datos
let activosFijos = obtenerLocalStorage('activos').length ? obtenerLocalStorage('activos') : activos;

// Función para actualizar la UI
function actualizarUI() {
    const listaActivos = document.querySelector('.lista-activos');
    const valorTotalElement = document.querySelector('.valor-total');

    // Limpia la lista de activos en la sección principal
    listaActivos.innerHTML = '';

    let valorTotal = 0;

    // Recorre los activos y crea los elementos HTML
    activosFijos.forEach((activo, index) => {
        const activoElement = document.createElement('article');
        activoElement.className = 'flex justify-between items-center';
        activoElement.innerHTML = `
            <p class="text-2xl font-semibold text-gray-200">${activo.descripcion}</p>
            <p class="text-2xl font-semibold text-gray-200">${activo.costo}</p>
            <div class="flex gap-2 justify-center ">
                <button onclick="editarActivo(${index})"   class="btn btn-xs btn-outline btn-primary">Editar</button>
                <button onclick="eliminarActivo(${index})" class="btn btn-xs btn-outline border-red-400 text-red-400">Eliminar</button>
            </div>
        `;
        listaActivos.appendChild(activoElement);
    });

    // Actualiza el valor total
    valorTotalElement.textContent = `$${valorTotalActivosNetos()}`;

    // Guardar los activos actualizados en localStorage
    guardarEnLocalStorage('activos', activosFijos);
}

export const  valorTotalActivosNetos = () => {
    let activosFijos = obtenerLocalStorage('activos').length ? obtenerLocalStorage('activos') : activos;
    let valorTotal = 0;
    activosFijos.forEach(activo => {
        valorTotal += activo.costo - ((activo.costo / 10) * anosAcumulados);
    });
    return valorTotal;

    guardarEnLocalStorage('afn', valorTotal);
}


// Llama a la función para actualizar la UI al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    actualizarUI();
});

// Función para agregar un nuevo activo
window.agregarActivo = function() {
    const descripcionActivo = document.querySelector('.input-descripcion-activo').value;
    const costoActivo = parseFloat(document.querySelector('.input-costo-activo').value);

    if (descripcionActivo && !isNaN(costoActivo)) {
        // Añadir el nuevo activo al arreglo
        activosFijos.push({ descripcion: descripcionActivo, costo: costoActivo });

        // Guardar los activos actualizados en localStorage
        guardarEnLocalStorage('activos', activosFijos);

        // Actualizar la lista de activos en la sección principal
        actualizarUI();

        // Limpiar los campos de entrada
        document.querySelector('.input-descripcion-activo').value = '';
        document.querySelector('.input-costo-activo').value = '';
    } else {
        alert('Por favor, ingrese un nombre y un precio válidos.');
    }
}

// Función para eliminar un activo
window.eliminarActivo = function(index) {
    // Eliminar el activo del arreglo
    activosFijos.splice(index, 1);

    // Guardar los activos actualizados en localStorage
    guardarEnLocalStorage('activos', activosFijos);

    // Actualizar la lista de activos en la sección principal
    actualizarUI();
}

// Función para editar un activo
window.editarActivo = function(index) {
    const nuevoDescripcion = prompt('Ingrese la nueva descripción del activo:', activosFijos[index].descripcion);
    const nuevoCosto = parseFloat(prompt('Ingrese el nuevo costo del activo:', activosFijos[index].costo));

    if (nuevoDescripcion && !isNaN(nuevoCosto)) {
        // Actualizar el activo en el arreglo
        activosFijos[index].descripcion = nuevoDescripcion;
        activosFijos[index].costo = nuevoCosto;

        // Guardar los activos actualizados en localStorage
        guardarEnLocalStorage('activos', activosFijos);

        // Actualizar la lista de activos en la sección principal
        actualizarUI();
    } else {
        alert('Por favor, ingrese una descripción y un costo válidos.');
    }
}

// Función para cambiar datos (aquí puedes implementar la lógica adicional según necesites)
window.cambiarDatos = function() {
    const anosAcumuladosPrompt = prompt('Ingrese la cantidad de años acumulados:');
    const anosAcumuladosNumber = parseInt(anosAcumuladosPrompt);

    if (!isNaN(anosAcumuladosNumber)) {
        anosAcumulados = anosAcumuladosNumber;
        actualizarUI();
    } else {
        alert('Por favor, ingrese un número válido para los años acumulados.');
    }
}
