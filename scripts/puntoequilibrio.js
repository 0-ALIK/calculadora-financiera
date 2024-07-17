import { obtenerLocalStorage } from "./funciones_helpers";

// Obtener los productos, inventario y ventas desde localStorage
const productos = obtenerLocalStorage('productos') || [
    { codigo: 1001, descripcion: "Ají chombo", costo: 2.00, precio: 5.50 },
    { codigo: 1002, descripcion: "Picante criollo", costo: 2.00, precio: 5.50 },
    { codigo: 1003, descripcion: "Culantro y aji chombo", costo: 2.05, precio: 5.55 },
    { codigo: 1004, descripcion: "Ají criollo", costo: 1.75, precio: 5.25 },
    { codigo: 1005, descripcion: "Culantro extremo", costo: 1.75, precio: 5.25 },
    { codigo: 1006, descripcion: "Entomatada criolla", costo: 2.00, precio: 5.50 },
    { codigo: 1007, descripcion: "Piña acaramelada", costo: 2.50, precio: 6.00 },
    { codigo: 1008, descripcion: "Explosión de mango", costo: 2.50, precio: 6.00 },
    { codigo: 1009, descripcion: "Ají y guineo", costo: 2.50, precio: 6.00 },
    { codigo: 1010, descripcion: "Manzana anaranjada", costo: 2.25, precio: 5.75 }
];

const inventario = obtenerLocalStorage('inventario');

const ventas = obtenerLocalStorage('ventas');

// Función para calcular la cantidad de cada producto en inventario
function calcularCantidadProducto(codigoProducto) {
    // Filtrar el inventario por el código del producto y encontrar el máximo valor de "inventario"
    const inventarioProducto = inventario.filter(item => item.producto === codigoProducto);
    if (inventarioProducto.length > 0) {
        const cantidadMasAlta = Math.max(...inventarioProducto.map(item => item.inventario));
        return cantidadMasAlta;
    } else {
        return 0; // Si no hay inventario registrado para el producto, retornar 0
    }
}

// Función para calcular la mezcla de ventas en porcentaje
function calcularMezclaVentas(codigoProducto) {
    const totalVentas = ventas.reduce((total, venta) => total + venta.cantidad, 0);
    const ventasProducto = ventas.filter(venta => venta.producto === codigoProducto).reduce((total, venta) => total + venta.cantidad, 0);
    return totalVentas ? (ventasProducto / totalVentas) * 100 : 0;
}

// Función para calcular el punto de equilibrio
function calcularPuntoEquilibrio(costoFijoTotal, mezclaVentas, precio, costoVariable) {
    const margenContribucion = precio - costoVariable;
    const puntoEquilibrioCantidad = (costoFijoTotal * mezclaVentas) / margenContribucion;
    const puntoEquilibrioIngresos = puntoEquilibrioCantidad * precio;
    return { puntoEquilibrioCantidad, puntoEquilibrioIngresos };
}

// Función para actualizar la tabla de productos
function actualizarTabla() {
    const tablaProductos = document.querySelector('.tabla-productos tbody');
    tablaProductos.innerHTML = '';

    const costoFijoTotal = 1000; // Ejemplo de costo fijo total, puede ajustarse según el caso
    const totalMezclaVentas = productos.reduce((total, producto) => total + calcularMezclaVentas(producto.codigo), 0);

    let totalPuntoEquilibrioCantidad = 0;
    let totalPuntoEquilibrioIngresos = 0;

    productos.forEach(producto => {
        const cantidad = calcularCantidadProducto(producto.codigo);
        const mezclaVentas = calcularMezclaVentas(producto.codigo);
        const proporcionMezcla = mezclaVentas / totalMezclaVentas;
        const { puntoEquilibrioCantidad, puntoEquilibrioIngresos } = calcularPuntoEquilibrio(costoFijoTotal, proporcionMezcla, producto.precio, producto.costo);

        totalPuntoEquilibrioCantidad += puntoEquilibrioCantidad;
        totalPuntoEquilibrioIngresos += puntoEquilibrioIngresos;

        const filaProducto = document.createElement('tr');
        filaProducto.innerHTML = `
            <td class="text-gray-200 p-2 text-center">${producto.codigo}</td>
            <td class="text-gray-200 p-2 text-center">${producto.descripcion}</td>
            <td class="text-gray-200 p-2 text-center">${producto.costo}</td>
            <td class="text-gray-200 p-2 text-center">${producto.precio}</td>
            <td class="text-gray-200 p-2 text-center">${cantidad}</td>
            <td class="text-gray-200 p-2 text-center">${mezclaVentas.toFixed(2)}%</td>
            <td class="text-gray-200 p-2 text-center">${puntoEquilibrioCantidad.toFixed(2)}</td>
            <td class="text-gray-200 p-2 text-center">${puntoEquilibrioIngresos.toFixed(2)}</td>
        `;
        tablaProductos.appendChild(filaProducto);
    });

    // Calcular indicadores mensuales
    const puntoEquilibrioCantidadMensual = totalPuntoEquilibrioCantidad / 12;
    const puntoEquilibrioIngresosMensual = totalPuntoEquilibrioIngresos / 12;

    // Actualizar los indicadores mensuales en la UI
    document.getElementById('punto-equilibrio-cantidad').textContent = puntoEquilibrioCantidadMensual.toFixed(2);
    document.getElementById('punto-equilibrio-ingresos').textContent = `$${puntoEquilibrioIngresosMensual.toFixed(2)}`;
}

// Llama a la función para actualizar la tabla al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    actualizarTabla();
});
