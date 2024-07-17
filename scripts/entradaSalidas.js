import { obtenerLocalStorage } from "./funciones_helpers";
import { productos } from "./base_datos";

// Obtener los datos almacenados en Local Storage
const compras = obtenerLocalStorage('compras').length ? obtenerLocalStorage('compras') : [];
const ventas = obtenerLocalStorage('ventas').length ? obtenerLocalStorage('ventas') : [];

// Función para obtener la descripción del producto
function obtenerDescripcionProducto(codigo) {
    const producto = productos.find(p => p.codigo === codigo);
    return producto ? producto.descripcion : 'Producto desconocido';
}

// Función para actualizar la UI
function actualizarUI() {
    // Actualizar tabla de compras
    const tablaComprasBody = document.querySelector('.tabla-compras tbody');
    tablaComprasBody.innerHTML = '';

    compras.slice(-10).forEach(compra => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${compra.fecha}</td>
            <td>${obtenerDescripcionProducto(compra.producto)}</td>
            <td>${compra.cantidad}</td>
            <td>${compra.costo_unitario.toFixed(2)}</td>
            <td>${compra.total.toFixed(2)}</td>
            <td>${compra.abono.toFixed(2)}</td>
            <td>${compra.fecha_cancelacion}</td>
            <td>${compra.cancelacion.toFixed(2)}</td>
        `;
        tablaComprasBody.appendChild(fila);
    });

    // Actualizar tabla de ventas
    const tablaVentasBody = document.querySelector('.tabla-ventas tbody');
    tablaVentasBody.innerHTML = '';

    ventas.slice(-10).forEach(venta => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${venta.fecha}</td>
            <td>${venta.transaccion}</td>
            <td>${obtenerDescripcionProducto(venta.producto)}</td>
            <td>${venta.cantidad}</td>
            <td>${venta.precio.toFixed(2)}</td>
            <td>${venta.monto.toFixed(2)}</td>
            <td>${venta.se_otorga_credito}</td>
            <td>${venta.abono_50.toFixed(2)}</td>

        `;
        tablaVentasBody.appendChild(fila);
    });
}

// Llama a la función para actualizar la UI al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    actualizarUI();
});
