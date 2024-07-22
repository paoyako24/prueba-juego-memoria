//incicializacion de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let tiempoRegresivoid = null;

//apuntando al documento html
let mostrarMovimientos = document.getElementById('movientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('t-restante');

//generacion de numeros aleatorios
let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numeros = numeros.sort(() => { return Math.random() - 0.5 });
console.log(numeros);

//funciones
function contarTiempo() {
    setInterval(() => {
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer}segundos`;
        if (timer == 0) {
            clearInterval(tiempoRegresivoid);
            bloquearTarjetas();
        }
    }, 1000);
}

function bloquearTarjetas() {
    for (let i = 0; i <= 15; i++) {
        let tarjetabloqueda = document.getElementById(i)
        tarjetabloqueda.disabled = true;
    }
}

//funcion principal
function destapar(id) {
    tarjetasDestapadas++;
    console.log(tarjetasDestapadas);
    if (temporizador == false) {
        contarTiempo();
        temporizador = true;
    }
    tarjetasDestapadas++;
    console.log(tarjetasDestapadas);

    if (tarjetasDestapadas == 1) {
        //mostrar primer numero
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id]
        tarjeta1.innerHTML = primerResultado;

        //desabilitar primer boton
        tarjeta1.disabled = true;
    } else if (tarjetasDestapadas == 2) {

        //mostrar segundo numero
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = segundoResultado;

        //desabilitar segundo boton
        tarjeta2.disabled = true;

        //incrementar movientos
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if (primerResultado == segundoResultado) {
            //encerar contador tarjetas destapadas
            tarjetasDestapadas = 0;

            //aumentar aciertos
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

            if (aciertos == 8) {
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
            }
        } else {
            //mostrar momentaniamente valores y volver a tapar
            setTimeout(() => {
                tarjeta1.innerHTML = '';
                tarjeta2.innerHTML = '';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            }, 2000);
        }
    }
}