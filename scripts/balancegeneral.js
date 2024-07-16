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
        let efectivo = 61312;

        const iv = calcularInventario();
        const cpc = CalcularCuentasPorCobrar();

        totalActivosCorrientes = iv + cpc + efectivo;
    
        return totalActivosCorrientes;
    };

    const calcularMobiliario = () => {
        let mobiliario = 0;
        let mobiliarioDep1 = 0;
        let mobiliarioDep2 = 0;
        let mobiliarioDep3 = 0;

        activosdata.forEach(activosdata => {
            if (activosdata && activosdata.descripcion === 'Mobiliario') {	
                mobiliario = activosdata.costo;
            }
        });

        mobiliarioDep1 = mobiliario - (mobiliario * 0.1);

        mobiliarioDep2 = mobiliarioDep1 - (mobiliarioDep1 * 0.1);

        mobiliarioDep3 = mobiliarioDep2 - (mobiliarioDep2 * 0.1);

        return mobiliarioDep3;

    }

    const calcularTransporte = () => {
        let transporte = 0;
        let transporteDep1 = 0;
        let transporteDep2 = 0;
        let transporteDep3 = 0;

        activosdata.forEach(activosdata => {
            if (activosdata && activosdata.descripcion === 'Vehiculo') {	
                transporte = activosdata.costo;
            }
        });

        transporteDep1 = transporte - (transporte * 0.1);

        transporteDep2 = transporteDep1 - (transporteDep1 * 0.1);

        transporteDep3 = transporteDep2 - (transporteDep2 * 0.1);

        return transporteDep3;

    }

    const calcularEquipo = () => {
        let equipo = 0;
        let equipoDep1 = 0;
        let equipoDep2 = 0;
        let equipoDep3 = 0;

        activosdata.forEach(activosdata => {
            if (activosdata && activosdata.descripcion === 'Equipos de oficina') {	
                equipo = activosdata.costo;
            }
        });

        equipoDep1 = equipo - (equipo * 0.1);

        equipoDep2 = equipoDep1 - (equipoDep1 * 0.1);

        equipoDep3 = equipoDep2 - (equipoDep2 * 0.1);

        return equipoDep3;
    }

    const CalcularActivosFijos = () => {
        let totalAFN = 0;

        totalAFN = calcularMobiliario() + calcularTransporte() + calcularEquipo() - 28000;

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

    const calcularImpuestos = () => {
        let impuestos = 0;
        let i = 0.25;

        impuestos = i * 2012.74;

        return impuestos;
    }

    const calcularPasivosCorrientesT = () => {
        let totalPasivosCorrientes = 0;

        const cp = CalcularCuentasPorPagar();

        totalPasivosCorrientes = cp + calcularImpuestos() + 5823.72;

        return totalPasivosCorrientes;
    }

    const calcularTotalPasivos = () => {
        let totalPasivos = 0;

        totalPasivos = calcularPasivosCorrientesT() + 30859.43;

        return totalPasivos;
    }

    //Capital

    const calcularTotalCapital = () => {
        let totalCapital = 0;

        totalCapital = calcularTotalPasivos() + 6038.21;

        return totalCapital;
    }

    const calcularFinan = () => {
        let finan = 0;

        finan = CalcularTotalActivos() - calcularTotalCapital();

        return finan;
    }

    const calcularCapitalxFinan = () => {
        let capital_Finan = 0;

        capital_Finan = calcularTotalCapital() + calcularFinan();

        return capital_Finan;
    }
    
    //Balance General Proforma

    //Activo

    const calcularCxCp = () => {
        let cxcp = 0;

        cxcp = (1/24) * 119720.00;

        return cxcp

    }

    const calcularACP = () => {
        let acp = 0;
        let efectivo = 61312;

        acp = efectivo + 1032692.00 + calcularCxCp();

        return acp
    }

    const calcularMobiliarioP = () => {
        let mobiliarioP = 0;

        mobiliarioP = calcularMobiliario() - (calcularMobiliario() * 0.1);

        return mobiliarioP
    }
    
    const calcularTransporteP = () => {
        let transporteP = 0;

        transporteP = calcularTransporte() - (calcularTransporte() * 0.1);

        return transporteP
    }

    const calcularEquipoP = () => {
        let equipoP = 0;

        equipoP = calcularEquipo() - (calcularEquipo() * 0.1);

        return equipoP
    }

    const calcularAFNP = () => {
        let totalAFN = 0;

        totalAFN = calcularMobiliarioP() + calcularTransporteP() + calcularEquipoP() - 24000;

        return totalAFN
    }

    const calcularTotalActivosP = () => {
        let totalActivosP = 0;

        totalActivosP = calcularACP() + calcularAFNP();

        return totalActivosP
    }

    //Pasivo

    const calcularCxPp = () => {
        let cxpp = 0;
        let ps1  = 0;
        
        ps1 = 0.47 * 119720.00;

        cxpp = ps1 * 0.04;
        console.log(cxpp)
        return cxpp

    }

    const calcularImpuestoP = () => {
        let impuestoP = 0;
        let i = 0.25;

        impuestoP = i * 3931.94;

        return impuestoP
    }

    const calcularTotalPCP = () => {
        let totalPCP = 0;

        totalPCP = calcularCxPp() + calcularImpuestoP() + 5823.72;

        return totalPCP
    }

    const calcularTotalPasicoP = () => {
        let totalPasivoP = 0;

        totalPasivoP = calcularTotalPCP() + 27679.45;

        return totalPasivoP
    }

    //Capital

    const calcularCapitalP = () => {
        let capitalP = 0;

        capitalP = calcularTotalPasicoP() + 11795.83;

        return capitalP
    }
    
    const calcularFinanP = () => {
        let finanP = 0;

        finanP = calcularTotalActivosP() - calcularCapitalP();

        return finanP
    }

    const calcularCapitalxFinanP = () => {
        let capital_FinanP = 0;

        capital_FinanP = calcularCapitalP() + calcularFinanP();

        return capital_FinanP
    }
    

// Función para mostrar los valores en el HTML
const mostrarValoresEnHTML = () => {
    const inventario = calcularInventario();
    const cuentas_por_cobrar = CalcularCuentasPorCobrar();
    const total_activos_corrientes = CalcularActivosCorrientes();
    const mobiliario = calcularMobiliario();
    const transporte = calcularTransporte();
    const equipo = calcularEquipo();
    const total_activos_fijos = CalcularActivosFijos();
    const total_activos = CalcularTotalActivos();
    const cuentas_por_pagar = CalcularCuentasPorPagar();
    const impuestos = calcularImpuestos();
    const pasivos_corrientes = calcularPasivosCorrientesT();
    const total_pasivos = calcularTotalPasivos();
    const total_capital = calcularTotalCapital();
    const finan = calcularFinan();
    const capitalxFinan = calcularCapitalxFinan();

    //Proforma
    const cxcp = calcularCxCp();
    const acp = calcularACP();
    const mobiliario_proforma = calcularMobiliarioP();
    const transporte_proforma = calcularTransporteP();
    const equipo_proforma = calcularEquipoP();
    const afnp = calcularAFNP();
    const total_activos_proforma = calcularTotalActivosP();
    const cxpp = calcularCxPp();
    const impuestoP = calcularImpuestoP();
    const total_proforma = calcularTotalPCP();
    const total_pasivos_proforma = calcularTotalPasicoP();
    const capital_proforma = calcularCapitalP();
    const finan_proforma = calcularFinanP();
    const capitalxFinan_proforma = calcularCapitalxFinanP();

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
    const elementoImpuestos = document.getElementById('valor-impuestos');
    const elementoPasivosCorrientes = document.getElementById('valor-pasivos-corrientes');
    const elementoTotalPasivos = document.getElementById('valor-total-pasivos');
    const elementoTotalCapital = document.getElementById('valor-total-capital');
    const elementoFinan = document.getElementById('valor-finan');
    const elementoCapitalxFinan = document.getElementById('valor-capital_Finan');

    //Proforma
    const elementoCxCp = document.getElementById('valor-cxcp');
    const elementoAcp = document.getElementById('valor-acp');
    const elementoMobiliario_proforma = document.getElementById('valor-mobiliario-proforma');
    const elementoTransporte_proforma = document.getElementById('valor-transporte-proforma');
    const elementoEquipo_proforma = document.getElementById('valor-equipo-proforma');
    const elementoAfnp = document.getElementById('valor-afnp');
    const elementoTotalActivos_proforma = document.getElementById('valor-total-activos-proforma');
    const elementoCxpp = document.getElementById('valor-cxpp');
    const elementoImpuestoP = document.getElementById('valor-impuestoP');
    const elementoTotalProforma = document.getElementById('valor-total-pcp');
    const elementoTotalPasivos_proforma = document.getElementById('valor-total-pp');
    const elementoCapital_proforma = document.getElementById('valor-capital-proforma');
    const elementoFinan_proforma = document.getElementById('valor-finan-proforma');
    const elementoCapitalxFinan_proforma = document.getElementById('valor-capital_FinanP');

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
    elementoImpuestos.textContent = `$ ${impuestos.toFixed(2)}`;
    elementoPasivosCorrientes.textContent = `$ ${pasivos_corrientes.toFixed(2)}`;
    elementoTotalPasivos.textContent = `$ ${total_pasivos.toFixed(2)}`;
    elementoTotalCapital.textContent = `$ ${total_capital.toFixed(2)}`;
    elementoFinan.textContent = `$ ${finan.toFixed(2)}`;
    elementoCapitalxFinan.textContent = `$ ${capitalxFinan.toFixed(2)}`;

    //Proforma
    elementoCxCp.textContent = `$ ${cxcp.toFixed(2)}`;
    elementoAcp.textContent = `$ ${acp.toFixed(2)}`;
    elementoMobiliario_proforma.textContent = `$ ${mobiliario_proforma.toFixed(2)}`;
    elementoTransporte_proforma.textContent = `$ ${transporte_proforma.toFixed(2)}`;
    elementoEquipo_proforma.textContent = `$ ${equipo_proforma.toFixed(2)}`;
    elementoAfnp.textContent = `$ ${afnp.toFixed(2)}`;
    elementoTotalActivos_proforma.textContent = `$ ${total_activos_proforma.toFixed(2)}`;
    elementoCxpp.textContent = `$ ${cxpp.toFixed(2)}`;
    elementoImpuestoP.textContent = `$ ${impuestoP.toFixed(2)}`;
    elementoTotalProforma.textContent = `$ ${total_proforma.toFixed(2)}`;
    elementoTotalPasivos_proforma.textContent = `$ ${total_pasivos_proforma.toFixed(2)}`;
    elementoCapital_proforma.textContent = `$ ${capital_proforma.toFixed(2)}`;
    elementoFinan_proforma.textContent = `$ ${finan_proforma.toFixed(2)}`;
    elementoCapitalxFinan_proforma.textContent = `$ ${capitalxFinan_proforma.toFixed(2)}`;
    
};

// Ejecutar la función para mostrar los valores cuando se cargue la página
document.addEventListener('DOMContentLoaded', mostrarValoresEnHTML);

    