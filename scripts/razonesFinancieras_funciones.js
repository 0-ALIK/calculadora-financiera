import { obtenerLocalStorage } from './funciones_helpers.js';

const productos = obtenerLocalStorage('productos');
const costos_operacion = obtenerLocalStorage('costos_operacion');
const compras = obtenerLocalStorage('compras');
const ventas = obtenerLocalStorage('ventas');
const inventario = obtenerLocalStorage('inventario');
const activos = obtenerLocalStorage('activos');

// Activos corrientes
export const obtenerActivosCorrientes = () => {
    const total_inventario = inventario.reduce((total, item) => total + item.costo_por_prod, 0);
    const cuentas_por_cobrar = ventas
        .filter(venta => venta.se_otorga_credito === 'sí' /* && venta.cancelacion === 0 */)
        .reduce((total, venta) => total + (venta.monto /* - venta.abono_50 */ - venta.cancelacion), 0);

    return Number(total_inventario + cuentas_por_cobrar);
};

// Pasivos corrientes
export const obtenerPasivosCorrientes = () => {
    const cuentas_por_pagar = compras.reduce((total, compra) => total + (compra.total - compra.abono), 0);
    return Number(cuentas_por_pagar);
};

// Inventario
export const obtenerInventarioTotal = () => {
    let inventario_final = {};

    inventario.forEach(item => {
        inventario_final[item.producto] = item.inventario_inicial;
    });

    compras.forEach(compra => {
        if(inventario_final[compra.producto] !== undefined) {
            inventario_final[compra.producto] += compra.cantidad;
        }
    });

    ventas.forEach(venta => {
        if(inventario_final[venta.producto] !== undefined) {
            inventario_final[venta.producto] -= venta.cantidad;
        }
    });

    const total_inventario = Object.values(inventario_final).reduce((total, cantidad) => total + cantidad, 0);

    return [inventario_final, total_inventario];
};

// Costo de bienes vendidos
export const obtenerCostoBienesVendidos = () => {
    const costo_productos = productos.reduce((total, producto) => {
        total[producto.codigo] = producto.costo;
        return total;
    }, {});

    let costo_bienes_vendidos = 0;

    ventas.forEach(venta => {
        const costoUnitario = costo_productos[venta.producto];
        const costoTotal = venta.cantidad * costoUnitario;
        costo_bienes_vendidos += costoTotal;
    });

    return Number(costo_bienes_vendidos);
};

// Cuentas por cobrar
export const obtenerCuentasPorCobrar = () => {
    const cuentas_por_cobrar = ventas
        .filter(venta => venta.se_otorga_credito === 'sí')
        .reduce((total, venta) => total + (venta.monto - venta.cancelacion), 0);
    
    return Number(cuentas_por_cobrar);
};

// Cuentas por pagar
export const obtenerCuentasPorPagar = () => {
    const cuentas_por_pagar = compras.reduce((total, compra) => total + (compra.total - compra.abono), 0);
    return Number(cuentas_por_pagar);
};

// Ventas anuales
export const obtenerVentasAnuales = (year) => {
    const ventas_anuales = ventas
        .filter(venta => venta.fecha.includes(year))
        .reduce((total, venta) => total + venta.monto, 0);
    
    return Number(ventas_anuales);
};

// Compras anuales
export const obtenerComprasAnuales = (year) => {
    const compras_anuales = compras
        .filter(compra => compra.fecha.includes(year))
        .reduce((total, compra) => total + compra.total, 0);
    
    return Number(compras_anuales);
};

export const obtenerActivosFijos = () => {
    const activos_fijos = activos.reduce((total, activo) => total + activo.costo, 0);
    return Number(activos_fijos);
};

export const obtenerPasivos = () => {
    const pasivos = costos_operacion.reduce((total, costo) => total + costo.costo, 0);
    return Number(pasivos);
};