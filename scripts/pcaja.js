// Arreglo para almacenar los los presupuestos
let calculateBtn = document.getElementById("calculate-btn");
let result = document.getElementById("result");
let result2 = document.getElementById("result2");
let result3 = document.getElementById("result3");
let result4 = document.getElementById("result4");

let calculate = () => {
  let p = Number(document.getElementById("principal").value);
<<<<<<< Updated upstream
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
=======
  let agu = Number(document.getElementById("agua").value);
  let elec = Number(document.getElementById("elc").value);
  let inter = Number(document.getElementById("inter").value);
  let trans = Number(document.getElementById("trans").value);
  let sal = Number(document.getElementById("sal").value);
  let rent = Number(document.getElementById("ren").value);
  let publi = Number(document.getElementById("pu").value);

  
  // Calcular el monto total y el total neto
  let amount = p;
  let monto = agu + elec + inter + trans + sal+ rent + publi;
  let ntotal = p - monto;
>>>>>>> Stashed changes

  result.innerHTML = `<div>Total de Caja: <span>${amount.toFixed(2)}$</span></div>`;
  result2.innerHTML = `<div>Total de Gastos: <span>${monto.toFixed(2)}$</span></div>`;
  result3.innerHTML = `<div>Total neto: <span>${ntotal.toFixed(2)}$</span></div>`;
  
};


calculateBtn.addEventListener("click", calculate);
window.addEventListener("load", calculate);
