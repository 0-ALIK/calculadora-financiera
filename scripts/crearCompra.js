const fecha = document.getElementById('fecha');
const fechaCancelacion = document.getElementById('fecha-cancelacion');
const productoCodigo = document.getElementById('producto-codigo');
const cantidad = document.getElementById('cantidad');
const precio = document.getElementById('precio');
const total = document.getElementById('total');
const form = document.getElementById('form');

import { guardarEnLocalStorage, obtenerLocalStorage } from './funciones_helpers';

const productos = obtenerLocalStorage('productos');
const compras = obtenerLocalStorage('compras');

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
    precio.textContent = producto.precio;

    if(cantidad.value !== '') {
        total.textContent = Number(cantidad.value) * producto.precio;
    }
});

cantidad.addEventListener('input', () => {
    const producto = productos.find(producto => producto.codigo === Number(productoCodigo.value));
    total.textContent = Number(cantidad.value) * producto.precio;
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

    if(fecha.value === '' || productoCodigo.value === '' || cantidad.value === '' || precio.textContent === '' || fechaCancelacion.value === '') {
        mostrarAlerta('Todos los campos son obligatorios', 'error');
        return;
    }

    /* 
    {
    "fecha": "02\/14\/2022",
    "producto": 1004,
    "cantidad": 100,
    "costo_unitario": 1.75,
    "total": 175,
    "abono": 87.5,
    "fecha_cancelacion": "03\/01\/2022",
    "cancelacion": 87.5
    },
    */

    const totalCalc = Number(cantidad.value) * Number(precio.textContent);

    const compra = {
        fecha: fecha.value,
        producto: Number(productoCodigo.value),
        cantidad: Number(cantidad.value),
        costo_unitario: Number(precio.textContent),
        total: totalCalc,
        abono: totalCalc / 2,
        fecha_cancelacion: fechaCancelacion.value,
        cancelacion: totalCalc / 2
    };

    compras.push(compra);
    guardarEnLocalStorage('compras', compras);

    mostrarAlerta('Compra creada correctamente', 'exito');
    form.reset();
    total.textContent = '';
});