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
        let inventarioIT = 0;
        let cantidadVendida = 0;
    
        ventas.forEach(venta => {
            if (venta && venta.cantidad) {
                cantidadVendida += venta.cantidad;
            }
        });
    
        // Sumar los costos de todos los productos
        inventario.forEach(inventario => {
            if (inventario && inventario.inventario_inicial) {
                inventarioIT += inventario.inventario_inicial;
            }
        });
        
        inventarioTotal = inventarioIT - cantidadVendida;

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
    
    elementoInventario.textContent = `$ ${inventario.toFixed(2)}`;
    elementoVentas.textContent = `$ ${ventas.toFixed(2)}`;
};

// Ejecutar la función para mostrar los valores cuando se cargue la página
document.addEventListener('DOMContentLoaded', mostrarValoresEnHTML);

    