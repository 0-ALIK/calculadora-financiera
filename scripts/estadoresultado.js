import { obtenerLocalStorage } from "./funciones_helpers";
import { calcularInventario } from "./balancegeneral";
import { CalcularCuentasPorPagar } from "./balancegeneral";

const costos_operaciondata = obtenerLocalStorage('costos_operacion');
const comprasdata = obtenerLocalStorage('compras');
const inventariodata = obtenerLocalStorage('inventario');
const ventasdata = obtenerLocalStorage('ventas');
const activosdata = obtenerLocalStorage('activos');

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

    inventarioI = calcularInventario('invertario_inicial');
    invertarioF = calcularInventario('invertario_final');
    comprasT = CalcularCuentasPorPagar('compras_total');
    ventasT = calcularVentas('totalVentas');


    costos_bienes_vendidos = (inventarioI + comprasT) - invertarioF;

    porcentaje_ventas1 = (costos_bienes_vendidos / ventasT);


    costosVariantes = ventasT * porcentaje_ventas1;


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


const mostrarValoresEnHTML = () => {
    const ventas = calcularVentas();
    const costos = CalcularCostosFijos();
    const costos_variantes = calcularCostosVariantes();
    const utilidad_bruta = calcularUtilidadBruta();

    // Obtener los elementos del HTML
    
    const elementoVentas = document.getElementById('valor-ventas');
    const elementoCostos = document.getElementById('valor-costo-fijo');
    const elementoCostosVariantes = document.getElementById('valor-costo-variante');
    const elementoUtilidadBruta = document.getElementById('valor-utilidad-bruta');
    

    // Mostrar los valores en el HTML
    
    elementoVentas.textContent = `$ ${ventas.toFixed(2)}`;
    elementoCostos.textContent = `$ ${costos.toFixed(2)}`;
    elementoCostosVariantes.textContent = `$ ${costos_variantes.toFixed(2)}`;
    elementoUtilidadBruta.textContent = `$ ${utilidad_bruta.toFixed(2)}`;
    
};

// Ejecutar la función para mostrar los valores cuando se cargue la página
document.addEventListener('DOMContentLoaded', mostrarValoresEnHTML);