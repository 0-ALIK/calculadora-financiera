import { obtenerLocalStorage } from "./funciones_helpers";

const costos_operaciondata = obtenerLocalStorage('costos_operacion');
const comprasdata = obtenerLocalStorage('compras');
const inventariodata = obtenerLocalStorage('inventario');
const ventasdata = obtenerLocalStorage('ventas');
const activosdata = obtenerLocalStorage('activos');

    export const calcularInventario = () => {
        let inventarioTotal = 0;
        let inventarioIT = 0;
        let cantidadVendida = 0;
    
        ventasdata.forEach(ventasdata => {
            if (ventasdata && ventasdata.cantidad) {
                cantidadVendida += ventasdata.cantidad;
            }
        });
    
        // Sumar los costos de todos los productos
        inventariodata.forEach(inventariodata => {
            if (inventariodata && inventariodata.inventario_inicial) {
                inventarioIT += inventariodata.inventario_inicial;
            }
        });
        
        inventarioTotal = inventarioIT - cantidadVendida;

        return inventarioTotal;
    };
    
    const CalcularCuentasPorCobrar = () => {
        const cuentas_por_cobrar = ventasdata
            .filter(ventasdata => ventasdata.se_otorga_credito === 'sí')
            .reduce((total, ventasdata) => total + (ventasdata.monto - ventasdata.cancelacion), 0);
        
        return cuentas_por_cobrar;
    };


    const CalcularActivosCorrientes = () => {
        let totalActivosCorrientes = 0;

        const iv = calcularInventario();
        const cpc = CalcularCuentasPorCobrar();

        totalActivosCorrientes = iv + cpc + 5000;
    
        return totalActivosCorrientes;
    };


    const CalcularActivosFijos = () => {
        let totalActivosFijos = 0;
        let totalAFN = 0;

        activosdata.forEach(activosdata => {
            if (activosdata && activosdata.costo) {
                totalActivosFijos += activosdata.costo;
            }
        });

        totalAFN = totalActivosFijos - 32000;

        return totalAFN;
    }

    const CalcularTotalActivos = () => {
        let totalActivos = 0;

        totalActivos = CalcularActivosCorrientes() + CalcularActivosFijos();

        return totalActivos;
    }

    export const CalcularCuentasPorPagar = () => {
        let cuentas_por_pagar = 0;
        let compras_total = 0;
        let abono_total = 0;
    
        comprasdata.forEach(comprasdata => {
            compras_total += comprasdata.total;
            
        });
        
        comprasdata.forEach(comprasdata => {
            abono_total += comprasdata.abono;
            

        });

        cuentas_por_pagar = compras_total - abono_total;
    
        return cuentas_por_pagar;
    };


   

// Función para mostrar los valores en el HTML
const mostrarValoresEnHTML = () => {
    const inventario = calcularInventario();
    const cuentas_por_cobrar = CalcularCuentasPorCobrar();
    const total_activos_corrientes = CalcularActivosCorrientes();
    //const mobiliario = obtenerActivos();
    const total_activos_fijos = CalcularActivosFijos();
    const total_activos = CalcularTotalActivos();
    const cuentas_por_pagar = CalcularCuentasPorPagar();

    // Obtener los elementos del HTML
    
    const elementoInventario = document.getElementById('valor-inventario');
    const elementoCuentasPorCobrar = document.getElementById('valor-cuentas-por-cobrar');
    const elementoActivosCorrientes = document.getElementById('valor-activos-corrientes');
    //const elementoMobiliario = document.getElementById('valor-mobiliario');
    const elementoActivosFijos = document.getElementById('valor-activos-fijos');
    const elementoTotalActivos = document.getElementById('valor-total-activos');
    const elementoCuentasPorPagar = document.getElementById('valor-cuentas-por-pagar');
    

    // Mostrar los valores en el HTML
    
    elementoInventario.textContent = `$ ${inventario.toFixed(2)}`;
    elementoCuentasPorCobrar.textContent = `$ ${cuentas_por_cobrar.toFixed(2)}`;
    elementoActivosCorrientes.textContent = `$ ${total_activos_corrientes.toFixed(2)}`;
    //elementoMobiliario.textContent = `$ ${mobiliario.toFixed(2)}`;
    elementoActivosFijos.textContent = `$ ${total_activos_fijos.toFixed(2)}`;
    elementoTotalActivos.textContent = `$ ${total_activos.toFixed(2)}`;
    elementoCuentasPorPagar.textContent = `$ ${cuentas_por_pagar.toFixed(2)}`;
};

// Ejecutar la función para mostrar los valores cuando se cargue la página
document.addEventListener('DOMContentLoaded', mostrarValoresEnHTML);

    