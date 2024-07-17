import { guardarEnLocalStorage } from "./funciones_helpers";

 export function calculate() {
  // Variables 
  let calculateBtn = document.getElementById("calculate-btn");
  let result = document.getElementById("result");
  let result2 = document.getElementById("result2");
  let result3 = document.getElementById("result3");

  // Obtener los valores de los campos de entrada
  let p = Number(document.getElementById("principal").value);
  let a = Number(document.getElementById("agu").value);
  let e = Number(document.getElementById("ele").value);
  let i = Number(document.getElementById("int").value);
  let s = Number(document.getElementById("sal").value);
  let r = Number(document.getElementById("rent").value);
  let pu = Number(document.getElementById("publi").value);
  let tra = Number(document.getElementById("trans").value);
 

  
  // Calcular el monto total y el total neto
  let amount = p;
  let monto = a + e + i + s + r + pu + tra;
  let ntotal = p - monto;

  // Mostrar los resultados en el HTML
  result.innerHTML = `<div>Total de Caja: <span>${amount.toFixed(2)}$</span></div>`;
  result2.innerHTML = `<div>Total de Gastos: <span>${monto.toFixed(2)}$</span></div>`;
  result3.innerHTML = `<div>Total neto: <span>${ntotal.toFixed(2)}$</span></div>`;

  guardarEnLocalStorage("money", ntotal);
}

// Añadir eventos para llamar a la función calculate
document.addEventListener("DOMContentLoaded", function() {
  let calculateBtn = document.getElementById("calculate-btn");
  calculateBtn.addEventListener("click", calculate);
  calculate();
});


