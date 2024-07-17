/* 
=== Razones de liquidez ===

✅Liquidez corriente = Activos corrientes / Pasivos corrientes​

✅Razón rápida = (activos corrientes - inventario) / pasivos corrientes

=== Índices de actividad ===

✅Rotación de inventario = costo de bienes vendidos / inventario

✅Periodo promedio de cobro = cuentas por cobrar / ventas diarias promedio = cuentas por cobrar / (ventas anuales / 365)

✅Periodo promedio de pago = cuentas por pagar / compras diarias promedio = cuentas por pagar / (compras anuales / 365)

✅Rotación de activos totales = ventas / total de activos

=== Razones de endeudamiento ===

✅Nivel de endeudamiento = total de pasivos / total de activos

✅Concentración del endeudamiento en el corto plazo = pasivo corriente / pasivo total​

Cobertura de interés = utilidades antes de intereses e impuestos / intereses

=== Índices de rendimiento ===

✅Marge de utilidad bruta = (ventas - costos de los bienes vendidos) / ventas = utilidad bruta / ventas

Margen de utilidad operativa = utilidad operativa / ventas

Margen de utilidad neta = ganancias disponibles para los accionistas comunes / ventas

=== Razones de mercado ===

Relación P/G = Precio de mercado por acción común / Ganancias por acción ​

*/ 
import {
    obtenerActivosCorrientes,
    obtenerPasivosCorrientes,
    obtenerInventarioTotal,
    obtenerCostoBienesVendidos,
    obtenerCuentasPorCobrar,
    obtenerCuentasPorPagar,
    obtenerVentasAnuales,
    obtenerComprasAnuales,
    obtenerActivosFijos,
    obtenerPasivos
} from './razonesFinancieras_funciones';

console.log('Activos corrientes:', obtenerActivosCorrientes());
console.log('Pasivos corrientes:', obtenerPasivosCorrientes());
console.log('Inventario:', obtenerInventarioTotal());
console.log('Costo de bienes vendidos:', obtenerCostoBienesVendidos());
console.log('Cuentas por cobrar:', obtenerCuentasPorCobrar());
console.log('Cuentas por pagar:', obtenerCuentasPorPagar());
console.log('Ventas anuales:', obtenerVentasAnuales(2022));
console.log('Compras anuales:', obtenerComprasAnuales(2022));
console.log('Activos fijos:', obtenerActivosFijos());
console.log('Pasivos:', obtenerPasivos());

const razones_financieras = {
    'razones_liquidez': [
        {
            nombre: 'Liquidez corriente',
            valor: obtenerActivosCorrientes() / obtenerPasivosCorrientes()
        },
        {
            nombre: 'Razón rápida',
            valor: (obtenerActivosCorrientes() - obtenerInventarioTotal()[1]) / obtenerPasivosCorrientes()
        }
    ],
    'indices_actividad': [
        {
            nombre: 'Rotación de inventario',
            valor: obtenerCostoBienesVendidos() / obtenerInventarioTotal()[1]
        },
        {
            nombre: 'Periodo promedio de cobro',
            valor: obtenerCuentasPorCobrar() / (obtenerVentasAnuales(2022) / 365)
        },
        {
            nombre: 'Periodo promedio de pago',
            valor: obtenerCuentasPorPagar() / (obtenerComprasAnuales(2022) / 365)
        },
        {
            nombre: 'Rotación de activos totales',
            valor: obtenerVentasAnuales(2022) / obtenerActivosFijos()
        }
    ],
    'razones_endeudamiento': [
        {
            nombre: 'Nivel de endeudamiento',
            valor: (obtenerActivosCorrientes() + obtenerActivosFijos()) / (obtenerPasivos() + obtenerPasivosCorrientes())
        },
        {
            nombre: 'Concentración del endeudamiento en el corto plazo',
            valor: obtenerPasivosCorrientes() / (obtenerPasivos() + obtenerPasivosCorrientes())
        },
        {
            nombre: 'Cobertura de interés',
            valor: 0
        }
    ],
    'indices_rendimiento': [
        {
            nombre: 'Margen de utilidad bruta',            
            valor: (obtenerVentasAnuales(2022) - obtenerCostoBienesVendidos()) / obtenerVentasAnuales(2022)
        },
        {
            nombre: 'Margen de utilidad operativa',
            valor: 0
        },
        {
            nombre: 'Margen de utilidad neta',
            valor: 0
        }
    ],
    'razones_mercado': [
        {
            nombre: 'Relación P/G',
            valor: 0
        }
    ]
};

// Renderizar razones financieras
const renderRazonesFinancieras = (tipo) => {
    const razones = razones_financieras[tipo];

    const contenido = document.getElementById('contenido');
    contenido.innerHTML = '';

    razones.forEach((razon, index) => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <th class="text-2xl py-6 px-10 text-gray-300 font-medium" >${index + 1}</th>
            <td class="text-2xl py-6 px-10 text-gray-300 font-medium" >${razon.nombre}</td>
            <td>
                <p class="text-xl text-secondary font-bold">${razon.valor.toFixed(2)}</p>
            </td>
        `;

        contenido.appendChild(tr);
    });

};

// Tablist para las razones financieras
const tabs = document.querySelectorAll('.tab');

tabs.forEach(tab => {
    tab.addEventListener('click', e => {
        const target = e.target;

        tabs.forEach(tab => tab.classList.remove('tab-active'));
        target.classList.add('tab-active');

        const dataTipo = target.getAttribute('data-tab');
        renderRazonesFinancieras(dataTipo);
    });
});

// dom content loaded
window.addEventListener('DOMContentLoaded', () => {
    renderRazonesFinancieras('razones_liquidez');
});