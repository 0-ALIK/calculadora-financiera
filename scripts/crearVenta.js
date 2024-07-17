const fecha = document.getElementById('fecha');
const productoCodigo = document.getElementById('producto-codigo');
const cantidad = document.getElementById('cantidad');
const precio = document.getElementById('precio');
const credito = document.getElementById('credito');
const fechaCancelacion = document.getElementById('fecha-cancelacion');
const form = document.getElementById('form');

import { guardarEnLocalStorage, obtenerLocalStorage } from './funciones_helpers';

const productos = obtenerLocalStorage('productos');
const ventas = obtenerLocalStorage('ventas');

document.addEventListener('DOMContentLoaded', () => {

    // Llenar el select de productos
    productos.forEach(producto => {
        const option = document.createElement('option');
        option.value = producto.codigo;
        option.textContent = producto.descripcion;
        productoCodigo.appendChild(option);
    });
});

productoCodigo.addEventListener('change', () => {
    const producto = productos.find(producto => producto.codigo === Number(productoCodigo.value));
    precio.value = producto.precio;
});

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

form.addEventListener('submit', e => {
    e.preventDefault();

    if(fecha.value === '' || productoCodigo.value === '' || cantidad.value === '' || precio.value === '') {
        mostrarAlerta('Todos los campos son obligatorios', 'error');
        return;
    }

    if(credito.checked && fechaCancelacion.value === '') {
        mostrarAlerta('La fecha de cancelación es obligatoria', 'error');
        return;
    }

    const transaccionNumero = ventas.length === 0 ? 1 : Math.max(...ventas.map(venta => venta.transaccion)) + 1;

    const monto = Number(cantidad.value) * Number(precio.value);

    const date = new Date(fecha.value);
    const fechaFormateada = `${date.getMonth() + 1}\/${date.getDate()}\/${date.getFullYear()}`;

    const venta = {
        fecha: fechaFormateada,
        transaccion: transaccionNumero,
        producto: Number(productoCodigo.value),
        cantidad: Number(cantidad.value),
        precio: Number(precio.value),
        monto,
        se_otorga_credito: credito.checked ? 'sí' : 'no',
        abono_50: credito.checked ? monto / 2 : monto,
        fecha_cancelacion: credito.checked ? fechaCancelacion.value : '',
        cancelacion: 0
    };

    ventas.push(venta);

    guardarEnLocalStorage('ventas', ventas);
});