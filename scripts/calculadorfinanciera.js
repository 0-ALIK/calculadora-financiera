import ApexCharts from "apexcharts";

const form = document.getElementById("id_form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const monto_prestamo = parseFloat(document.getElementById("id_monto_prestamo").value);
    const tasa_interes = parseFloat(document.getElementById("id_tasa_interes").value);
    const plazo_prestamo = parseInt(document.getElementById("id_plazo_prestamo").value);
    const frec_pago = parseInt(document.getElementById("id_frec_pago").value);

    tablaAmortizacion(monto_prestamo, tasa_interes, plazo_prestamo, frec_pago);
});

function tablaAmortizacion(monto_prestamo, tasa_interes, plazo_prestamo, frec_pago) {

    document.getElementById('chart').innerHTML = "";

    const cant_pagos = plazo_prestamo * frec_pago;
    const tasa_interes_capitalizada = tasa_interes / 100 / frec_pago;
    let capital = [];
    let saldos = [];
    let intereses = [];
    let periodos = [];
    

    var saldo = monto_prestamo;

    document.getElementById("id_result").innerHTML = ""; // Limpiar el resultado previo
    const pago_periodico = monto_prestamo * tasa_interes_capitalizada / (1 - Math.pow(1 + tasa_interes_capitalizada, -cant_pagos));
    var suma = 0;
    for (let index = 0; index < cant_pagos; index++) {
        const interes_periodico = saldo * tasa_interes_capitalizada;
        const capital_mensual = pago_periodico - interes_periodico;

        saldo -= capital_mensual;
        capital.push(saldo.toFixed(2));
        saldos.push(saldo.toFixed(2));
        suma += interes_periodico;
        intereses.push(suma.toFixed(2));
        periodos.push(index+1);
        if (index === cant_pagos - 1) {
            saldo = 0; // Aseguramos que el saldo final sea 0 en la última iteración
        }
          
        document.getElementById("id_monto_prestamo_table").innerHTML = (`${monto_prestamo.toFixed(2)}`);

        document.getElementById("id_result").innerHTML += (`
            <tr>
            <th>${index + 1}</th>
            <td>${pago_periodico.toFixed(2)}</td>
            <td>${interes_periodico.toFixed(2)}</td>
            <td>${capital_mensual.toFixed(2)}</td>
            <td>${saldo.toFixed(2)}</td>
            </tr>
            `);
    }
    var options = {
        chart: {
          type: 'line'
        },
        series: [{
            name: 'Capital',
            data: capital.reverse()
        },
        {
            name: 'Saldo',
            data: saldos.map(parseFloat)
        },
        {
            name: 'Intereses',
            data: intereses.map(parseFloat)
        }],
        xaxis:{
            categories: periodos.map(String),
            labels:{
                style:{
                    colors: '#fff'
                }
            }
        },
        yaxis:{
            labels:{
                style:{
                    colors: '#fff'
                }
            }
        },
        legend:{
            labels:{
                colors: '#fff'
            }
        },
        title:{
            text: 'Amortizaciòn de Prestamos',
        }
        
      }
      
      var chart = new ApexCharts(document.querySelector("#chart"), options);
      
      chart.render();
}
