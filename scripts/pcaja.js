// Arreglo para almacenar los los presupuestos
let calculateBtn = document.getElementById("calculate-btn");
let result = document.getElementById("result");
let result2 = document.getElementById("result2");
let result3 = document.getElementById("result3");
let result4 = document.getElementById("result4");

let calculate = () => {
  let p = Number(document.getElementById("principal").value);
  let r = Number(document.getElementById("rent").value);
  let t = Number(document.getElementById("nom").value);
  let s = Number(document.getElementById("seg").value);
  let im =Number(document.getElementById("im").value);
  let inte =Number(document.getElementById("inte").value);
  let c =Number(document.getElementById("car").value);
  let serv =Number(document.getElementById("ser").value);
  let i =Number(document.getElementById("inv").value);
  let amount = p;
  let monto = i + r +t + s+im+inte + c + serv;

  let ntotal = p - monto

  result.innerHTML = `<div>Total de Caja: <span>${amount.toFixed(2)}$</span></div>`;
  result2.innerHTML = `<div>Total de Gastos: <span>${monto.toFixed(2)}$</span></div>`;
  result3.innerHTML = `<div>Total neto: <span>${ntotal.toFixed(2)}$</span></div>`;
  
};


calculateBtn.addEventListener("click", calculate);
window.addEventListener("load", calculate);