import { obtenerLocalStorage } from "./funciones_helpers";


const costos_operaciondata = obtenerLocalStorage('costos_operacion');
const comprasdata = obtenerLocalStorage('compras');
const inventariodata = obtenerLocalStorage('inventario');
const ventasdata = obtenerLocalStorage('ventas');
const activosdata = obtenerLocalStorage('activos');

    //Activo

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

        totalActivosCorrientes = iv + cpc + 15000;
    
        return totalActivosCorrientes;
    };

    const calcularMobuliario = () => {
        let mobiliario = 0;
        let mobiliarioDep1 = 0;
        let mobiliarioDep2 = 0;

        activosdata.forEach(activosdata => {
            if (activosdata && activosdata.descripcion === 'Mobiliario') {	
                mobiliario = activosdata.costo;
            }
        });

        mobiliarioDep1 = mobiliario - (mobiliario * 0.1);

        mobiliarioDep2 = mobiliarioDep1 - (mobiliarioDep1 * 0.1);

        return mobiliarioDep2;

    }

    const calcularTransporte = () => {
        let transporte = 0;
        let transporteDep1 = 0;
        let transporteDep2 = 0;

        activosdata.forEach(activosdata => {
            if (activosdata && activosdata.descripcion === 'Vehiculo') {	
                transporte = activosdata.costo;
            }
        });

        transporteDep1 = transporte - (transporte * 0.1);

        transporteDep2 = transporteDep1 - (transporteDep1 * 0.1);

        return transporteDep2;

    }

    const calcularEquipo = () => {
        let equipo = 0;
        let equipoDep1 = 0;
        let equipoDep2 = 0;

        activosdata.forEach(activosdata => {
            if (activosdata && activosdata.descripcion === 'Equipos de oficina') {	
                equipo = activosdata.costo;
            }
        });

        equipoDep1 = equipo - (equipo * 0.1);

        equipoDep2 = equipoDep1 - (equipoDep1 * 0.1);

        return equipoDep2;
    }

    const CalcularActivosFijos = () => {
        let totalAFN = 0;

        totalAFN = calcularMobuliario() + calcularTransporte() + calcularEquipo() - 28000;

        return totalAFN;
    }

    const CalcularTotalActivos = () => {
        let totalActivos = 0;

        totalActivos = CalcularActivosCorrientes() + CalcularActivosFijos();

        return totalActivos;
    }


    //pasivo

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


    const calcularPasivosCorrientesT = () => {
        let totalPasivosCorrientes = 0;

        const cp = CalcularCuentasPorPagar();

        totalPasivosCorrientes = cp + 5823.72;

        return totalPasivosCorrientes;
    }

    const calcularTotalPasivos = () => {
        let totalPasivos = 0;

        totalPasivos = calcularPasivosCorrientesT() + 30859.43;

        return totalPasivos;
    }

    //Capital

    const calcularInversionI = () => {
        let inversionI = 0;

        activosdata.forEach(activosdata => {
            if (activosdata && activosdata.costo) {
                inversionI += activosdata.costo;
            }
        });

        return inversionI;
    }

    const calcularTotalCapital = () => {
        let totalCapital = 0;

        totalCapital = CalcularTotalActivos() - calcularTotalPasivos();

        return totalCapital;
    }
    
    //Balance General Proforma


    const calcularCxPp = () => {
        let cxpp = 0;
        let porcentajeCxPp = 0;

        cxpp = (1/24) * 119720.00;

        return cxpp

    }

    const calcularACP = () => {
        let acp = 0;

        acp = 15000 + 1032692.00 + calcularCxPp();

        return acp
    }

    

// Función para mostrar los valores en el HTML
const mostrarValoresEnHTML = () => {
    const inventario = calcularInventario();
    const cuentas_por_cobrar = CalcularCuentasPorCobrar();
    const total_activos_corrientes = CalcularActivosCorrientes();
    const mobiliario = calcularMobuliario();
    const transporte = calcularTransporte();
    const equipo = calcularEquipo();
    const total_activos_fijos = CalcularActivosFijos();
    const total_activos = CalcularTotalActivos();
    const cuentas_por_pagar = CalcularCuentasPorPagar();
    const pasivos_corrientes = calcularPasivosCorrientesT();
    const total_pasivos = calcularTotalPasivos();
    const inversion_I = calcularInversionI();
    const total_capital = calcularTotalCapital();
    const cxpp = calcularCxPp();
    const acp = calcularACP();

    // Obtener los elementos del HTML
    
    const elementoInventario = document.getElementById('valor-inventario');
    const elementoCuentasPorCobrar = document.getElementById('valor-cuentas-por-cobrar');
    const elementoActivosCorrientes = document.getElementById('valor-activos-corrientes');
    const elementoMobiliario = document.getElementById('valor-mobiliario');
    const elementoTransporte = document.getElementById('valor-transporte');
    const elementoEquipo = document.getElementById('valor-equipo');
    const elementoActivosFijos = document.getElementById('valor-activos-fijos');
    const elementoTotalActivos = document.getElementById('valor-total-activos');
    const elementoCuentasPorPagar = document.getElementById('valor-cuentas-por-pagar');
    const elementoPasivosCorrientes = document.getElementById('valor-pasivos-corrientes');
    const elementoTotalPasivos = document.getElementById('valor-total-pasivos');
    const elementoInversionI = document.getElementById('valor-inversion-i');
    const elementoTotalCapital = document.getElementById('valor-total-capital');
    const elementoCxpp = document.getElementById('valor-cxpp');
    const elementoAcp = document.getElementById('valor-acp');
    

    // Mostrar los valores en el HTML
    
    elementoInventario.textContent = `$ ${inventario.toFixed(2)}`;
    elementoCuentasPorCobrar.textContent = `$ ${cuentas_por_cobrar.toFixed(2)}`;
    elementoActivosCorrientes.textContent = `$ ${total_activos_corrientes.toFixed(2)}`;
    elementoMobiliario.textContent = `$ ${mobiliario.toFixed(2)}`;
    elementoTransporte.textContent = `$ ${transporte.toFixed(2)}`;
    elementoEquipo.textContent = `$ ${equipo.toFixed(2)}`;
    elementoActivosFijos.textContent = `$ ${total_activos_fijos.toFixed(2)}`;
    elementoTotalActivos.textContent = `$ ${total_activos.toFixed(2)}`;
    elementoCuentasPorPagar.textContent = `$ ${cuentas_por_pagar.toFixed(2)}`;
    elementoPasivosCorrientes.textContent = `$ ${pasivos_corrientes.toFixed(2)}`;
    elementoTotalPasivos.textContent = `$ ${total_pasivos.toFixed(2)}`;
    elementoInversionI.textContent = `$ ${inversion_I.toFixed(2)}`;
    elementoTotalCapital.textContent = `$ ${total_capital.toFixed(2)}`;
    elementoCxpp.textContent = `$ ${cxpp.toFixed(2)}`;
    elementoAcp.textContent = `$ ${acp.toFixed(2)}`;
    
    
};

// Ejecutar la función para mostrar los valores cuando se cargue la página
document.addEventListener('DOMContentLoaded', mostrarValoresEnHTML);

    