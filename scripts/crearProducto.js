import { guardarEnLocalStorage, obtenerLocalStorage } from "./funciones_helpers";

const form = document.getElementById('form');
const descripcion = document.getElementById('descripcion'); 
const precio = document.getElementById('precio');
const costo = document.getElementById('costo');
const alerta = document.getElementById('alerta');

const productos = obtenerLocalStorage('productos');

const mostrarAlerta = (mensaje, tipo) => {
    const span = alerta.querySelector('span');
    span.textContent = mensaje;

    alerta.classList.add(`alert-${tipo}`);
    alerta.classList.remove('hidden');

    setTimeout(() => {
        alerta.classList.add('hidden');
        alerta.classList.remove(`alert-${tipo}`);
    }, 3000);
};

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if(descripcion.value === ''){
        mostrarAlerta('La descripción es obligatoria', 'error');
    }

    if(precio.value === ''){
        mostrarAlerta('El precio es obligatorio', 'error');
    }

    if(costo.value === ''){
        mostrarAlerta('El costo es obligatorio', 'error');
    }

    const codigo = productos.length === 0 ? 1 : Math.max(...productos.map(producto => producto.codigo)) + 1;

    const producto = {
        codigo,
        descripcion: descripcion.value,
        precio: parseFloat(precio.value),
        costo: parseFloat(costo.value)
    };

    productos.push(producto);

    guardarEnLocalStorage('productos', productos);

    mostrarAlerta('Producto creado correctamente', 'success');

    form.reset();
});