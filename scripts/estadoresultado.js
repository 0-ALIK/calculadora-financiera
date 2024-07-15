import { obtenerLocalStorage } from "./funciones_helpers";
import { calcularInventario } from "./balancegeneral";
import { CalcularCuentasPorPagar } from "./balancegeneral";

const costos_operaciondata = obtenerLocalStorage('costos_operacion');
const comprasdata = obtenerLocalStorage('compras');
const inventariodata = obtenerLocalStorage('inventario');
const ventasdata = obtenerLocalStorage('ventas');
const activosdata = obtenerLocalStorage('activos');
const productosdata = obtenerLocalStorage('productos');

const calcularVentas = () => {
    let totalVentas = 0;

    ventasdata.forEach(ventasdata => {

        totalVentas += ventasdata.monto;
        
    });
    return totalVentas;
}


const CalcularCostosFijos = () => {
    let costosFijos = 0;
    let salario = 0;
    let renta = 0;
    let mobiliario_depresiado = 0;
    let mobiliario = 0;
    let equipo = 0;

    costos_operaciondata.forEach(costos_operaciondata => {
    if(costos_operaciondata.descripcion === 'Salarios'){
        salario = costos_operaciondata.costo;
    }
    })

    costos_operaciondata.forEach(costos_operaciondata => {
    if(costos_operaciondata.descripcion === 'Renta'){
        renta = costos_operaciondata.costo;
    }
    })


    activosdata.forEach(activosdata => {
    if(activosdata.descripcion === 'Mobiliario'){
        mobiliario = activosdata.costo;
    }
    })

    activosdata.forEach(activosdata => {
        if(activosdata.descripcion === 'Equipos de oficina'){
            equipo = activosdata.costo;
        }
        })

        mobiliario_depresiado = (mobiliario + equipo) - ((mobiliario + equipo) * 0.1);

        costosFijos = salario + mobiliario_depresiado + renta;

    return costosFijos;
    
}


const calcularCostosVariantes = () => {
    let costosVariantes = 0;
    let inventarioI = 0;
    let invertarioF = 0;
    let comprasT = 0;
    let costos_bienes_vendidos = 0;
    let porcentaje_ventas1 = 0;
    let ventasT = 0;

    inventarioI = calcularInventario('inventario_inicial');
    invertarioF = calcularInventario('inventario_final');
    comprasT = CalcularCuentasPorPagar('compras_total');
    ventasT = calcularVentas('totalVentas');


    costos_bienes_vendidos = (inventarioI + comprasT) - invertarioF;

    porcentaje_ventas1 = (costos_bienes_vendidos / ventasT);
    
    costosVariantes = porcentaje_ventas1 * ventasT;

    return costosVariantes;

}

const calcularUtilidadBruta = () => {
    let utilidadBruta = 0;
    let costofijo = 0;
    let costovarieante = 0;
    let ventas  = 0;

    ventas = calcularVentas();
    costofijo = CalcularCostosFijos();
    costovarieante = calcularCostosVariantes();

    utilidadBruta = ventas - (costofijo + costovarieante);

    return utilidadBruta;

}   

const calcularGastosFijos = () => {
    let gastosFijos = 0;

    costos_operaciondata.forEach(costos_operaciondata => {

        gastosFijos += costos_operaciondata.costo;
        
    })

    return gastosFijos;
}

const calcularGastosVariantes = () => {
    let gastosVariantes = 0;
    let porcentaje_ventas2 = 0;
    let gastos_operativos = 0;

    costos_operaciondata.forEach(costos_operaciondata => {
        gastos_operativos += costos_operaciondata.costo;

    })
   
    porcentaje_ventas2 = gastos_operativos /calcularVentas();

    gastosVariantes = porcentaje_ventas2 * calcularVentas();


    return gastosVariantes;
}

const calcularUtilidadOperativa = () => {
    let utilidadOperativa = 0;
    let gastosFijos = 0;
    let gastosVariantes = 0;
    let utilidad_bruta = 0;

    utilidad_bruta = calcularUtilidadBruta();
    gastosFijos = calcularGastosFijos();
    gastosVariantes = calcularGastosVariantes();

    utilidadOperativa = utilidad_bruta - (gastosFijos + gastosVariantes);

    return utilidadOperativa;
}

const calcularGastosporInteres = () => {
    let monto = 40000;
    let tasa_interes_anual = 0.08;
    let n = 12;
    let tiempo = 10;
    let monto_futuro = 0;
    let interes_gastos = 0;
    let porcentaje_ventas3 = 0;
    let gastos_interes = 0;

    monto_futuro = monto * (1 + tasa_interes_anual / n) ** (n * tiempo)

    interes_gastos = monto_futuro - monto

    porcentaje_ventas3 = interes_gastos / calcularVentas()

    gastos_interes = porcentaje_ventas3 * calcularVentas()

    return gastos_interes

}

const calcularUtilidadNeta = () => {
    let utilidadNeta = 0;


    utilidadNeta = calcularUtilidadOperativa() - calcularGastosporInteres();

    return utilidadNeta
}

const calcularUtilidadmenosImpuestos = () => {
    let umi = 0;

    umi = 0.25 * calcularUtilidadNeta();

    return umi
}

const calcularUDI = () => { 
    let udi = 0;

    udi = calcularUtilidadNeta() - calcularUtilidadmenosImpuestos();

    return udi
}

//Estadpe de resultados profroma

const calcularPronosticoVentas = () => {
    let pronostico_ventas  = 0;
    let p1 = 5.50
    let p2 = 5.50
    let p3 = 5.55
    let p4 = 5.25
    let p5 = 5.25
    let p6 = 5.50
    let p7 = 6.00
    let p8 = 6.00
    let p9 = 6.00
    let p10 = 5.75

    p1 = p1 * 1900
    p2 = p2 * 2300
    p3 = p3 * 1900
    p4 = p4 * 2200      
    p5 = p5 * 2500  
    p6 = p6 * 2100
    p7 = p7 * 2200
    p8 = p8 * 1700
    p9 = p9 * 2300
    p10 = p10 * 2200

    pronostico_ventas = p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9 + p10


    return pronostico_ventas
}

const calcularPronosticoCostos = () => {
    let pronostico_costos = 0;
    let porcentaje_ventas1 = 0;
    let inventarioI = 0;
    let invertarioF = 0;
    let comprasT = 0;
    let costos_bienes_vendidos = 0;
    let ventasT = 0;
    
    inventarioI = calcularInventario('inventario_inicial');
    invertarioF = calcularInventario('inventario_final');
    comprasT = CalcularCuentasPorPagar('compras_total');
    ventasT = calcularVentas('ventas_total');


    costos_bienes_vendidos = (inventarioI + comprasT) - invertarioF;

    porcentaje_ventas1 = (costos_bienes_vendidos / ventasT);

    pronostico_costos = porcentaje_ventas1 * calcularPronosticoVentas();

    return pronostico_costos
}

const calcularPronosticoUB = () => {
    let pronostico_UB = 0;

    pronostico_UB = (calcularPronosticoVentas() - ( calcularPronosticoCostos() + 17300.00 ));

    return pronostico_UB
}

const calcularPronosticoGastos = () => {
    let pronostico_gastos = 0;
    let porcentaje_ventas2 = 0;
    let gastos_operativos = 0;

    costos_operaciondata.forEach(costos_operaciondata => {
        gastos_operativos += costos_operaciondata.costo;

    })
   
    porcentaje_ventas2 = gastos_operativos / calcularVentas();

    pronostico_gastos = porcentaje_ventas2 * calcularPronosticoVentas();

    return pronostico_gastos
}

const calcularPronosticoUO = () => {
    let pronostico_UO = 0;

    pronostico_UO = (calcularPronosticoUB() - (calcularPronosticoGastos() + 4700.00));

    return pronostico_UO
}

const calcularPronosticoUN = () => {
    let pronostico_UN = 0;

    pronostico_UN = calcularPronosticoUO() - 48785.61;

    return pronostico_UN
}

const calcularPronosticoUMI = () => {
    let pronostico_umi = 0;

    pronostico_umi = 0.25 * calcularPronosticoUN();

    return pronostico_umi
}

const calcularPronosticoUDI = () => {
    let pronostico_udi = 0;

    pronostico_udi = calcularPronosticoUN() - calcularPronosticoUMI();

    return pronostico_udi
}

const mostrarValoresEnHTML = () => {
    const ventas = calcularVentas();
    const costos = CalcularCostosFijos();
    const costos_variantes = calcularCostosVariantes();
    const utilidad_bruta = calcularUtilidadBruta();
    const gastos_fijos = calcularGastosFijos();
    const gastos_variantes = calcularGastosVariantes();
    const utilidad_operativa = calcularUtilidadOperativa();
    const gastos_interes = calcularGastosporInteres();
    const utilidad_neta = calcularUtilidadNeta();
    const umi = calcularUtilidadmenosImpuestos();
    const udi = calcularUDI();
    const pronostico_ventas = calcularPronosticoVentas();
    const pronostico_costos = calcularPronosticoCostos();
    const pronostico_UB = calcularPronosticoUB();
    const pronostico_gastos = calcularPronosticoGastos();
    const pronostico_UO = calcularPronosticoUO();
    const pronostico_UN = calcularPronosticoUN();
    const pronostico_UMI = calcularPronosticoUMI();
    const pronostico_udi = calcularPronosticoUDI();

    // Obtener los elementos del HTML
    
    const elementoVentas = document.getElementById('valor-ventas');
    const elementoCostos = document.getElementById('valor-costo-fijo');
    const elementoCostosVariantes = document.getElementById('valor-costo-variante');
    const elementoUtilidadBruta = document.getElementById('valor-utilidad-bruta');
    const elementoGastosFijos = document.getElementById('valor-gastos-fijos');
    const elementoGastosVariantes = document.getElementById('valor-gastos-variantes');
    const elementoUtilidadOperativa = document.getElementById('valor-utilidad-operativa');
    const elementoCostosInteres = document.getElementById('valor-gastos-interes');
    const elementoUtilidadNeta = document.getElementById('valor-utilidad-neta');
    const elementoUmi = document.getElementById('valor-umi');
    const elementoUdi = document.getElementById('valor-udi');
    const elementoUnidadesVendidas = document.getElementById('valor-unidades-vendidas');
    const elementoPronosticoCostos = document.getElementById('valor-pronostico-costos');
    const elementoPronosticoUB = document.getElementById('valor-pronostico-ub');
    const elementoPronosticoGastos = document.getElementById('valor-pronostico-gastos');
    const elementoPronosticoUO = document.getElementById('valor-pronostico-uo');
    const elementoPronosticoUN = document.getElementById('valor-pronostico-un');
    const elementoPronosticoUMI = document.getElementById('valor-pronostico-umi');
    const elementoPronosticoUDI = document.getElementById('valor-pronostico-udi');
    
    // Mostrar los valores en el HTML
    
    elementoVentas.textContent = `$ ${ventas.toFixed(2)}`;
    elementoCostos.textContent = `$ ${costos.toFixed(2)}`;
    elementoCostosVariantes.textContent = `$ ${costos_variantes.toFixed(2)}`;
    elementoUtilidadBruta.textContent = `$ ${utilidad_bruta.toFixed(2)}`;
    elementoGastosFijos.textContent = `$ ${gastos_fijos.toFixed(2)}`;
    elementoGastosVariantes.textContent = `$ ${gastos_variantes.toFixed(2)}`;
    elementoUtilidadOperativa.textContent = `$ ${utilidad_operativa.toFixed(2)}`;
    elementoCostosInteres.textContent = `$ ${gastos_interes.toFixed(2)}`;
    elementoUtilidadNeta.textContent = `$ ${utilidad_neta.toFixed(2)}`;
    elementoUmi.textContent = `$ ${umi.toFixed(2)}`;
    elementoUdi.textContent = `$ ${udi.toFixed(2)}`;
    elementoUnidadesVendidas.textContent = `$ ${pronostico_ventas.toFixed(2)}`;
    elementoPronosticoCostos.textContent = `$ ${pronostico_costos.toFixed(2)}`;
    elementoPronosticoUB.textContent = `$ ${pronostico_UB.toFixed(2)}`;
    elementoPronosticoGastos.textContent = `$ ${pronostico_gastos.toFixed(2)}`;
    elementoPronosticoUO.textContent = `$ ${pronostico_UO.toFixed(2)}`;
    elementoPronosticoUN.textContent = `$ ${pronostico_UN.toFixed(2)}`;
    elementoPronosticoUMI.textContent = `$ ${pronostico_UMI.toFixed(2)}`;
    elementoPronosticoUDI.textContent = `$ ${pronostico_udi.toFixed(2)}`;
    
};

// Ejecutar la función para mostrar los valores cuando se cargue la página
document.addEventListener('DOMContentLoaded', mostrarValoresEnHTML);