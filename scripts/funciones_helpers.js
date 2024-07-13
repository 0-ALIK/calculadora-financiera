export const guardarEnLocalStorage = (clave, valor) => {
    localStorage.setItem(clave, JSON.stringify(valor));
};

export const obtenerLocalStorage = (clave) => {
    const arreglo = JSON.parse(localStorage.getItem(clave));
    return arreglo === null ? [] : arreglo;
};
