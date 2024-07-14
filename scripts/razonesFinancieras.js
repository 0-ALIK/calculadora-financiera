/* 
=== Razones de liquidez ===

Liquidez corriente = Activos corrientes / Pasivos corrientes​

Razón rápida = (activos corrientes - inventario) / pasivos corrientes

=== Índices de actividad ===

Rotación de inventario = costo de bienes vendidos / inventario

Periodo promedio de cobro = cuentas por cobrar / ventas diarias promedio = cuentas por cobrar / (ventas anuales / 365)

Periodo promedio de pago = cuentas por pagar / compras diarias promedio = cuentas por pagar / (compras anuales / 365)

Rotación de activos totales = ventas / total de activos

=== Razones de endeudamiento ===

Nivel de endeudamiento = total de pasivos / total de activos

Concentración del endeudamiento en el corto plazo = pasivo corriente / pasivo total​

Cobertura de interés = utilidades antes de intereses e impuestos / intereses

=== Índices de rendimiento ===

Marge de utilidad bruta = (ventas - costos de los bienes vendidos) / ventas = utilidad bruta / ventas

Margen de utilidad operativa = utilidad operativa / ventas

Margen de utilidad neta = ganancias disponibles para los accionistas comunes / ventas

=== Razones de mercado ===

Relación P/G = Precio de mercado por acción común / Ganancias por acción ​
*/ 

const razones_financieras = {
    'razones_liquidez': [
        {
            nombre: 'Liquidez corriente',
            formula: '\\(\\frac{\\text{Activos corrientes}}{\\text{Pasivos corrientes}}\\)',
            valor: 0
        },
        {
            nombre: 'Razón rápida',
            formula: '\\(\\frac{\\text{Activos corrientes} - \\text{Inventario}}{\\text{Pasivos corrientes}}\\)',
            valor: 0
        }
    ],
    'indices_actividad': [
        {
            nombre: 'Rotación de inventario',
            formula: '\\(\\frac{\\text{Costo de bienes vendidos}}{\\text{Inventario}}\\)',
            valor: 0
        },
        {
            nombre: 'Periodo promedio de cobro',
            formula: '\\(\\frac{\\text{Cuentas por cobrar}}{\\text{Ventas diarias promedio}}\\)',
            valor: 0
        },
        {
            nombre: 'Periodo promedio de pago',
            formula: '\\(\\frac{\\text{Cuentas por pagar}}{\\text{Compras diarias promedio}}\\)',
            valor: 0
        },
        {
            nombre: 'Rotación de activos totales',
            formula: '\\(\\frac{\\text{Ventas}}{\\text{Total de activos}}\\)',
            valor: 0
        }
    ],
    'razones_endeudamiento': [
        {
            nombre: 'Nivel de endeudamiento',
            formula: '\\(\\frac{\\text{Total de pasivos}}{\\text{Total de activos}}\\)',
            valor: 0
        },
        {
            nombre: 'Concentración del endeudamiento en el corto plazo',
            formula: '\\(\\frac{\\text{Pasivo corriente}}{\\text{Pasivo total}}\\)',
            valor: 0
        },
        {
            nombre: 'Cobertura de interés',
            formula: '\\(\\frac{\\text{Utilidades antes de intereses e impuestos}}{\\text{Intereses}}\\)',
            valor: 0
        }
    ],
    'indices_rendimiento': [
        {
            nombre: 'Margen de utilidad bruta',
            formula: '\\(\\frac{\\text{Ventas} - \\text{Costos de los bienes vendidos}}{\\text{Ventas}}\\)',
            valor: 0
        },
        {
            nombre: 'Margen de utilidad operativa',
            formula: '\\(\\frac{\\text{Utilidad operativa}}{\\text{Ventas}}\\)',
            valor: 0
        },
        {
            nombre: 'Margen de utilidad neta',
            formula: '\\(\\frac{\\text{Ganancias disponibles para los accionistas comunes}}{\\text{Ventas}}\\)',
            valor: 0
        }
    ],
    'razones_mercado': [
        {
            nombre: 'Relación P/G',
            formula: '\\(\\frac{\\text{Precio de mercado por acción común}}{\\text{Ganancias por acción}}\\)',
            valor: 0
        }
    ]
};

// Renderizar razones financieras
const renderRazonesFinancieras = (tipo) => {
    const razones = razones_financieras[tipo];

    const contenido = document.getElementById('contenido');
    contenido.innerHTML = '';

    razones.forEach(razon => {
        const div = document.createElement('div');
        div.className = 'stats bg-primary text-primary-content';

        div.innerHTML = `
            <div class="stat">
                <div class="stat-title text-slate-800">${razon.nombre}</div>
                <div class="stat-value">${razon.formula}</div>
                <div class="stat-actions">
                    <input
                        type="text"
                        placeholder="Año"
                        class="input input-bordered input-sm w-24 text-white"/>  
                    <button class="btn btn-sm btn-success">Add funds</button>
                </div>
            </div>
            
            <div class="stat">
                <div class="stat-value">${razon.valor}</div>
            </div>
        `;

        contenido.appendChild(div);
    });

    // Procesar contenido con MathJax
    MathJax.typeset();
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