import { obtenerLocalStorage } from "./funciones_helpers";
import { calcularPronosticoVentas } from "./estadoresultado";
import { calcularPronosticoUMI } from "./estadoresultado";
import { calcularPronosticoUDI } from "./estadoresultado";
import { calcularUDI } from "./estadoresultado";
//import { tablaAmortizacion } from "./calculadorfinanciera";


const costos_operaciondata = obtenerLocalStorage('costos_operacion');
const comprasdata = obtenerLocalStorage('compras');
const inventariodata = obtenerLocalStorage('inventario');
const ventasdata = obtenerLocalStorage('ventas');
const activosdata = obtenerLocalStorage('activos');

    //Activo

    export const calcularEfectivo = () => {
        let efectivo = 0;

        efectivo = obtenerLocalStorage('money');

        return efectivo;
    }

    export const calcularInventario = () => {
        let inventarioTotal = 0;
        let inventarioIT = 0;
        let cantidadVendida = 0;
        let inventarioMonto = 0;
        let ventasMonto = 0;
    
        /*ventasdata.forEach(ventasdata => {
            if (ventasdata && ventasdata.cantidad) {
                cantidadVendida += ventasdata.cantidad;
            }
        });
            
        inventariodata.forEach(inventariodata => {
            if (inventariodata && inventariodata.inventario_inicial) {
                inventarioIT += inventariodata.inventario_inicial;
            }
        });*/

        inventariodata.forEach(inventariodata => {
            if (inventariodata && inventariodata.costo_por_prod) {
                inventarioMonto += inventariodata.costo_por_prod;
            }
        });
        
        ventasdata.forEach(ventasdata => {
            if (ventasdata && ventasdata.monto) {
                ventasMonto += ventasdata.monto;
            }
        });

        inventarioTotal = inventarioMonto - ventasMonto;

        return inventarioTotal;
    };
    
    export const CalcularCuentasPorCobrar = () => {
        const cuentas_por_cobrar = ventasdata
            .filter(ventasdata => ventasdata.se_otorga_credito === 'sí')
            .reduce((total, ventasdata) => total + (ventasdata.monto - ventasdata.cancelacion), 0);
        
        return cuentas_por_cobrar;
    };


    export const CalcularActivosCorrientes =() => {
        let totalActivosCorrientes = 0;

        totalActivosCorrientes = calcularEfectivo() + calcularInventario() + CalcularCuentasPorCobrar();;
    
        return totalActivosCorrientes;
    };

    export const calcularMobiliario = () => {
        let mobiliario = 0;
        let mobiliarioDep1 = 0;
        let mobiliarioDep2 = 0;
        let mobiliarioDep3 = 0;

        activosdata.forEach(activosdata => {
            if (activosdata && activosdata.descripcion === 'Mobiliario') {	
                mobiliario = activosdata.costo;
            }
        });

        /*mobiliarioDep1 = mobiliario - (mobiliario * 0.1);

        mobiliarioDep2 = mobiliarioDep1 - (mobiliarioDep1 * 0.1);

        mobiliarioDep3 = mobiliarioDep2 - (mobiliarioDep2 * 0.1);
        */
        return mobiliario;

    }

    export const calcularTransporte = () => {
        let transporte = 0;
        let transporteDep1 = 0;
        let transporteDep2 = 0;
        let transporteDep3 = 0;

        activosdata.forEach(activosdata => {
            if (activosdata && activosdata.descripcion === 'Vehiculo') {	
                transporte = activosdata.costo;
            }
        });

        /*transporteDep1 = transporte - (transporte * 0.1);

        transporteDep2 = transporteDep1 - (transporteDep1 * 0.1);

        transporteDep3 = transporteDep2 - (transporteDep2 * 0.1);
        */
        return transporte;

    }

    export const calcularEquipo = () => {
        let equipo = 0;
        let equipoDep1 = 0;
        let equipoDep2 = 0;
        let equipoDep3 = 0;

        activosdata.forEach(activosdata => {
            if (activosdata && activosdata.descripcion === 'Equipos de oficina') {	
                equipo = activosdata.costo;
            }
        });

        /*equipoDep1 = equipo - (equipo * 0.1);

        equipoDep2 = equipoDep1 - (equipoDep1 * 0.1);

        equipoDep3 = equipoDep2 - (equipoDep2 * 0.1);
        */
        return equipo;
    }

    export const calcularDepA = () => {
        let depA = 0;
        let activos = 0;

        activosdata.forEach(activosdata => {
            if (activosdata && activosdata.costo) {	
                activos += activosdata.costo;
            }
        });

        depA = activos - CalcularActivosFijos();

        return depA;
    }

    export const CalcularActivosFijos = () => {
        let totalAFN = 0;
        
        totalAFN = obtenerLocalStorage('afn');

        return totalAFN;
    }

    export function CalcularTotalActivos()  {
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

    export const calcularDeudasCortoPlazo = () => {
        let deudasCortoPlazo = 0;

        deudasCortoPlazo = obtenerLocalStorage('pago_periodico_c') * 12;

        return deudasCortoPlazo
        
    }
    export const calcularImpuestos = () => {
        let impuestos = 0;
        let i = 0.25;

        impuestos = i * 2012.74;

        return impuestos;
    }

    export const calcularDeudasLargoPlazo = () => {
        let deudasLargoPlazo = 0;
        let saldo = 0;
        let periodo = 0;
        let n = 36;

        saldo = obtenerLocalStorage('saldo_c');
        periodo = obtenerLocalStorage('periodos_c');

        if(periodo == n){
            deudasLargoPlazo = saldo;
        }

        return deudasLargoPlazo;
    }

    export const calcularTotalPasivoFijos = () => {
        let totalPasivoFijos = 0;

        totalPasivoFijos = calcularDeudasLargoPlazo();

        return totalPasivoFijos;
    }

    export const calcularPasivosCorrientesT = () => {
        let totalPasivosCorrientes = 0;

        totalPasivosCorrientes = CalcularCuentasPorPagar() + calcularImpuestos() + calcularDeudasCortoPlazo();

        return totalPasivosCorrientes;
    }

    export const calcularTotalPasivos = () => {
        let totalPasivos = 0;

        totalPasivos = calcularPasivosCorrientesT() + 30859.43;

        return totalPasivos;
    }

    //Capital

    export const calcularPA = () => {
        let pA = 0;

        pA = calcularUDI();

        return pA
    }

    export const calcularTotalCapital = () => {
        let totalCapital = 0;

        totalCapital = calcularTotalPasivos() + 6038.21;

        return totalCapital;
    }

    export const calcularFinan = () => {
        let finan = 0;

        finan = CalcularTotalActivos() - calcularTotalCapital();

        return finan;
    }

    export const calcularCapitalxFinan = () => {
        let capital_Finan = 0;

        capital_Finan = calcularTotalCapital() + calcularFinan();

        return capital_Finan;
    }
    
    //Balance General Proforma

    //Activo

    export const calcularEfectivoP = () => {
        let efectivoP = 0;

        efectivoP = calcularEfectivo();

        return efectivoP
    }

    export const calcularCxCp = () => {
        let cxcp = 0;

        cxcp = (1/24) * calcularPronosticoVentas();

        return cxcp

    }

    export const calcularACP = () => {
        let acp = 0;


        acp = calcularEfectivoP() + calcularInventario() + calcularCxCp();

        return acp
    }

    export const calcularIP = () => {
        let ip = 0;

        ip = calcularInventario();

        return ip
    }

    export const calcularMobiliarioP = () => {
        let mobiliarioP = 0;

        mobiliarioP = calcularMobiliario();

        return mobiliarioP
    }
    
    export const calcularTransporteP = () => {
        let transporteP = 0;

        transporteP = calcularTransporte();

        return transporteP
    }

    export const calcularEquipoP = () => {
        let equipoP = 0;

        equipoP = calcularEquipo();

        return equipoP
    }

    export const calcularDepAP = () => {
        let depAP = 0;
        let activos = 0;

        activosdata.forEach(activosdata => {
            if (activosdata && activosdata.costo) {	
                activos += activosdata.costo;
            }
        });

        depAP = activos - calcularAFNP();

        return depAP;
    }

    export const calcularAFNP = () => {
        let totalAFNP = 0;

        totalAFNP = obtenerLocalStorage('afn') - 4000;

        return totalAFNP;
    }

    export const calcularTotalActivosP = () => {
        let totalActivosP = 0;

        totalActivosP = calcularACP() + calcularAFNP();

        return totalActivosP
    }

    //Pasivo

    export const calcularCxPp = () => {
        let cxpp = 0;
        let ps1  = 0;
        
        ps1 = 0.47 * calcularPronosticoVentas();

        cxpp = ps1 * 0.04;

        return cxpp

    }

    export const calcularDeudasCortoPP = () => {
        let deudasCortoPP = 0;

        deudasCortoPP = calcularDeudasCortoPlazo();
        
        return deudasCortoPP;
    }

    export const calcularImpuestoP = () => {
        let impuestoP = 0;
        let i = 0.25;

        impuestoP = i * calcularPronosticoUMI();

        return impuestoP
    }

    export const calcularTotalPCP = () => {
        let totalPCP = 0;

        totalPCP = calcularCxPp() + calcularImpuestoP() + calcularDeudasCortoPP();

        return totalPCP
    }

    export const calcularTotalPasicoP = () => {
        let totalPasivoP = 0;

        totalPasivoP = calcularTotalPCP() + 27679.45;

        return totalPasivoP
    }

    //Capital

    export const calcularPronosticoPA = () => {
        let pAp = 0;
        
        pAp = calcularPronosticoUDI();

        return pAp;
    }

    export const calcularCapitalP = () => {
        let capitalP = 0;

        capitalP = calcularTotalPasicoP() + calcularPronosticoPA();

        return capitalP
    }
    
    export const calcularFinanP = () => {
        let finanP = 0;

        finanP = calcularTotalActivosP() - calcularCapitalP();

        return finanP
    }

    export const calcularCapitalxFinanP = () => {
        let capital_FinanP = 0;

        capital_FinanP = calcularCapitalP() + calcularFinanP();

        return capital_FinanP
    }
    

// Función para mostrar los valores en el HTML
const mostrarValoresEnHTML = () => {
    const efectivo = calcularEfectivo();
    const inventario = calcularInventario();
    const cuentas_por_cobrar = CalcularCuentasPorCobrar();
    const total_activos_corrientes = CalcularActivosCorrientes();
    const mobiliario = calcularMobiliario();
    const transporte = calcularTransporte();
    const equipo = calcularEquipo();
    const depA = calcularDepA();
    const total_activos_fijos = CalcularActivosFijos();
    const total_activos = CalcularTotalActivos();
    const cuentas_por_pagar = CalcularCuentasPorPagar();
    const deudas_corto_plazo = calcularDeudasCortoPlazo(); // Deuda corto plazo
    const impuestos = calcularImpuestos();
    const pasivos_corrientes = calcularPasivosCorrientesT();
    const deudas_largo_plazo = calcularDeudasLargoPlazo();
    const total_pasivos = calcularTotalPasivos();
    const perdidas_acu = calcularPA();
    const total_capital = calcularTotalCapital();
    const finan = calcularFinan();
    const capitalxFinan = calcularCapitalxFinan();
    //plus
    const totalPasivoFijos = calcularTotalPasivoFijos();

    //Proforma
    const efectivoP = calcularEfectivoP();
    const cxcp = calcularCxCp();
    const acp = calcularACP();
    const inventario_proforma = calcularIP();
    const mobiliario_proforma = calcularMobiliarioP();
    const transporte_proforma = calcularTransporteP();
    const equipo_proforma = calcularEquipoP();
    const depA_proforma = calcularDepAP();
    const afnp = calcularAFNP();
    const total_activos_proforma = calcularTotalActivosP();
    const cxpp = calcularCxPp();
    const deudasCortoPP = calcularDeudasCortoPP();
    const impuestoP = calcularImpuestoP();
    const total_proforma = calcularTotalPCP();
  
    const total_pasivos_proforma = calcularTotalPasicoP();
    const perdidas_proforma = calcularPronosticoPA();
    const capital_proforma = calcularCapitalP();
    const finan_proforma = calcularFinanP();
    const capitalxFinan_proforma = calcularCapitalxFinanP();

    // Obtener los elementos del HTML
    
    const elementoEfectivo = document.getElementById('valor-efectivo');
    const elementoInventario = document.getElementById('valor-inventario');
    const elementoCuentasPorCobrar = document.getElementById('valor-cuentas-por-cobrar');
    const elementoActivosCorrientes = document.getElementById('valor-activos-corrientes');
    const elementoMobiliario = document.getElementById('valor-mobiliario');
    const elementoTransporte = document.getElementById('valor-transporte');
    const elementoEquipo = document.getElementById('valor-equipo');
    const elementoDepA = document.getElementById('valor-depA');
    const elementoActivosFijos = document.getElementById('valor-activos-fijos');
    const elementoTotalActivos = document.getElementById('valor-total-activos');
    const elementoCuentasPorPagar = document.getElementById('valor-cuentas-por-pagar');
    const elementoDeudasCortoPlazo = document.getElementById('valor-deudas-corto-plazo'); //DEUDA CORTO PLAZO
    const elementoImpuestos = document.getElementById('valor-impuestos');
    const elementoPasivosCorrientes = document.getElementById('valor-pasivos-corrientes');
    const elementoDeudasLargoPlazo = document.getElementById('valor-deudas-largo-plazo');
    const elementoTotalPasivos = document.getElementById('valor-total-pasivos');
    const elementoPerdidasAcumuladas = document.getElementById('valor-perdidas-acumuladas');
    const elementoTotalCapital = document.getElementById('valor-total-capital');
    const elementoFinan = document.getElementById('valor-finan');
    const elementoCapitalxFinan = document.getElementById('valor-capital_Finan');
    //plus
    const elementoTotalPasivoFijos = document.getElementById('valor-total-pasivo-fijos');

    //Proforma
    const elementoEfectivoP = document.getElementById('valor-efectivoP');
    const elementoCxCp = document.getElementById('valor-cxcp');
    const elementoAcp = document.getElementById('valor-acp');
    const elementoInventario_proforma = document.getElementById('valor-ip');
    const elementoMobiliario_proforma = document.getElementById('valor-mobiliario-proforma');
    const elementoTransporte_proforma = document.getElementById('valor-transporte-proforma');
    const elementoEquipo_proforma = document.getElementById('valor-equipo-proforma');
    const elementoDepA_proforma = document.getElementById('valor-depAP');
    const elementoAfnp = document.getElementById('valor-afnp');
    const elementoTotalActivos_proforma = document.getElementById('valor-total-activos-proforma');
    const elementoCxpp = document.getElementById('valor-cxpp');
    const elementoDeudasCortoPP = document.getElementById('valor-deudas-corto-pp');
    const elementoImpuestoP = document.getElementById('valor-impuestoP');
    const elementoTotalProforma = document.getElementById('valor-total-pcp');
    const elementoTotalPasivos_proforma = document.getElementById('valor-total-pp');
    const elementoPerdidas_proforma = document.getElementById('valor-perdidas-proforma');
    const elementoCapital_proforma = document.getElementById('valor-capital-proforma');
    const elementoFinan_proforma = document.getElementById('valor-finan-proforma');
    const elementoCapitalxFinan_proforma = document.getElementById('valor-capital_FinanP');

    // Mostrar los valores en el HTML
    
    elementoEfectivo.textContent = `$ ${efectivo}`;
    elementoInventario.textContent = `$ ${inventario.toFixed(2)}`;
    elementoCuentasPorCobrar.textContent = `$ ${cuentas_por_cobrar.toFixed(2)}`;
    elementoActivosCorrientes.textContent = `$ ${Number(total_activos_corrientes).toFixed(2)}`;
    elementoMobiliario.textContent = `$ ${mobiliario.toFixed(2)}`;
    elementoTransporte.textContent = `$ ${transporte.toFixed(2)}`;
    elementoEquipo.textContent = `$ ${equipo.toFixed(2)}`;
    elementoDepA.textContent = `$ ${depA.toFixed(2)}`;
    elementoActivosFijos.textContent = `$ ${total_activos_fijos}`;
    elementoTotalActivos.textContent = `$ ${Number(total_activos).toFixed(2)}`;
    elementoCuentasPorPagar.textContent = `$ ${cuentas_por_pagar.toFixed(2)}`;
    elementoDeudasCortoPlazo.textContent = `$ ${deudas_corto_plazo.toFixed(2)}`; //DEUDA CORTO PLAZO
    elementoImpuestos.textContent = `$ ${impuestos.toFixed(2)}`;
    elementoPasivosCorrientes.textContent = `$ ${pasivos_corrientes.toFixed(2)}`;
    elementoDeudasLargoPlazo.textContent = `$ ${deudas_largo_plazo}`; //DEUDA LARGO PLAZO
    elementoTotalPasivos.textContent = `$ ${total_pasivos.toFixed(2)}`;
    elementoPerdidasAcumuladas.textContent = `$ ${perdidas_acu.toFixed(2)}`;
    elementoTotalCapital.textContent = `$ ${total_capital.toFixed(2)}`;
    elementoFinan.textContent = `$ ${finan.toFixed(2)}`;
    elementoCapitalxFinan.textContent = `$ ${capitalxFinan.toFixed(2)}`;
    //plus
    elementoTotalPasivoFijos.textContent = `$ ${totalPasivoFijos}`;

    //Proforma
    elementoEfectivoP.textContent = `$ ${efectivoP}`;
    elementoCxCp.textContent = `$ ${cxcp.toFixed(2)}`;
    elementoAcp.textContent = `$ ${acp.toFixed(2)}`;
    elementoInventario_proforma.textContent = `$ ${inventario_proforma.toFixed(2)}`;
    elementoMobiliario_proforma.textContent = `$ ${mobiliario_proforma.toFixed(2)}`;
    elementoTransporte_proforma.textContent = `$ ${transporte_proforma.toFixed(2)}`;
    elementoEquipo_proforma.textContent = `$ ${equipo_proforma.toFixed(2)}`;
    elementoDepA_proforma.textContent = `$ ${depA_proforma.toFixed(2)}`;
    elementoAfnp.textContent = `$ ${afnp}`;
    elementoTotalActivos_proforma.textContent = `$ ${total_activos_proforma.toFixed(2)}`;
    elementoCxpp.textContent = `$ ${cxpp.toFixed(2)}`;
    elementoDeudasCortoPP.textContent = `$ ${deudasCortoPP.toFixed(2)}`;
    elementoImpuestoP.textContent = `$ ${impuestoP.toFixed(2)}`;
    elementoTotalProforma.textContent = `$ ${total_proforma.toFixed(2)}`;
    elementoTotalPasivos_proforma.textContent = `$ ${total_pasivos_proforma.toFixed(2)}`;
    elementoPerdidas_proforma.textContent = `$ ${perdidas_proforma.toFixed(2)}`;
    elementoCapital_proforma.textContent = `$ ${capital_proforma.toFixed(2)}`;
    elementoFinan_proforma.textContent = `$ ${finan_proforma.toFixed(2)}`;
    elementoCapitalxFinan_proforma.textContent = `$ ${capitalxFinan_proforma.toFixed(2)}`;
    
};

// Ejecutar la función para mostrar los valores cuando se cargue la página
document.addEventListener('DOMContentLoaded', mostrarValoresEnHTML);

    