// Arreglo para almacenar los los presupuestos
let calculateBtn = document.getElementById("calculate-btn");
let result = document.getElementById("result");
let calculate = () => {
  let p = Number(document.getElementById("principal").value);
  let r = Number(document.getElementById("rate").value);
  let t = Number(document.getElementById("time").value);
  let amount = p - r - t;

  result.innerHTML = `<div>Total de Caja: <span>${amount.toFixed(2)}$</span></div>`;
};
calculateBtn.addEventListener("click", calculate);
window.addEventListener("load", calculate);
