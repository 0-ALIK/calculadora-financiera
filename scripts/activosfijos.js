import { obtenerLocalStorage } from "./funciones_helpers";

// Valor inicial de años acumulados
let anosAcumulados = 3;

// Obtener los activos almacenados en localStorage o usar un arreglo vacío si no hay datos
let activosFijos = obtenerLocalStorage('activos') || [
    { nombre: "Mobiliario", precio: 10000 },
    { nombre: "Equipos de oficina", precio: 5000 },
    { nombre: "Vehículo", precio: 25000 }
];

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
            <p class="text-3xl font-semibold text-gray-200">${activo.nombre}</p>
            <p class="text-3xl font-semibold text-gray-200">${activo.precio}</p>
            <button onclick="eliminarActivo(${index})" class="btn btn-xs btn-outline btn-danger">Eliminar</button>
        `;
        listaActivos.appendChild(activoElement);

        // Calcular el valor de los activos fijos netos
        valorTotal += activo.precio - ((activo.precio / 10) * anosAcumulados);
    });

    // Actualiza el valor total
    valorTotalElement.textContent = `$${valorTotal}`;

    // Guardar los activos actualizados en localStorage
    localStorage.setItem('activos', JSON.stringify(activosFijos));
}

// Llama a la función para actualizar la UI al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    actualizarUI();
});

// Función para agregar un nuevo activo
function agregarActivo() {
    const nombreActivo = document.querySelector('.input-nombre-activo').value;
    const precioActivo = parseFloat(document.querySelector('.input-precio-activo').value);

    if (nombreActivo && !isNaN(precioActivo)) {
        // Añadir el nuevo activo al arreglo
        activosFijos.push({ nombre: nombreActivo, precio: precioActivo });

        // Guardar los activos actualizados en localStorage
        localStorage.setItem('activos', JSON.stringify(activosFijos));

        // Actualizar la lista de activos en la sección principal
        actualizarUI();

        // Limpiar los campos de entrada
        document.querySelector('.input-nombre-activo').value = '';
        document.querySelector('.input-precio-activo').value = '';
    } else {
        alert('Por favor, ingrese un nombre y un precio válidos.');
    }
}

// Función para eliminar un activo
function eliminarActivo(index) {
    // Eliminar el activo del arreglo
    activosFijos.splice(index, 1);

    // Guardar los activos actualizados en localStorage
    localStorage.setItem('activos', JSON.stringify(activosFijos));

    // Actualizar la lista de activos en la sección principal
    actualizarUI();
}

// Función para cambiar datos (aquí puedes implementar la lógica adicional según necesites)
function cambiarDatos() {
    const anosAcumuladosPrompt = prompt('Ingrese la cantidad de años acumulados:');
    const anosAcumuladosNumber = parseInt(anosAcumuladosPrompt);

    if (!isNaN(anosAcumuladosNumber)) {
        anosAcumulados = anosAcumuladosNumber;
        actualizarUI();
    } else {
        alert('Por favor, ingrese un número válido para los años acumulados.');
    }
}

// Función para obtener datos de localStorage
export function obtenerLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}
