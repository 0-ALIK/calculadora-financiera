import { inventario, productos } from "./base_datos";
import { ventas } from "./base_datos";
import { obtenerLocalStorage } from "./funciones_helpers";

const costos_operaciondata = obtenerLocalStorage('costos_operacion');
const comprasdata = obtenerLocalStorage('compras');

const inventariodata = obtenerLocalStorage('inventario');

    const calcularInventario = () => {
        // Obtener los productos desde el localStorage
        const inventariosdata = obtenerLocalStorage('inventario') || [];
        let inventarioTotal = 0;
    
        // Sumar los costos de todos los productos
        inventario.forEach(inventario => {
            if (inventario && inventario.costo_por_prod) {
                inventarioTotal += inventario.costo_por_prod;
            }
        });
    
        return inventarioTotal;
    };
    
   
   // Calcular las ventas
const calcularVentas = () => {
    const ventasdata = obtenerLocalStorage('ventas') || [];
    let ventasTotal = 0;

    ventas.forEach(venta => {
        if (venta && venta.monto) {
            ventasTotal += venta.monto;
        }
    });

    return ventasTotal;
};

// Función para mostrar los valores en el HTML
const mostrarValoresEnHTML = () => {
    const inventario = calcularInventario();
    const ventas = calcularVentas();
    
    const elementoInventario = document.getElementById('valor-inventario');
    const elementoVentas = document.getElementById('valor-ventas');
    
    elementoInventario.textContent = `El valor total del inventario es: $${inventario.toFixed(2)}`;
    elementoVentas.textContent = `El valor total de las ventas es: $${ventas.toFixed(2)}`;
};

// Ejecutar la función para mostrar los valores cuando se cargue la página
document.addEventListener('DOMContentLoaded', mostrarValoresEnHTML);

    