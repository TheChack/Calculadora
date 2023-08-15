const calculadoraDisplay = document.querySelector('#calculadora-resultado');
const botones = document.querySelectorAll('button');
const borrar = document.getElementById('borrar');
const borrarTodo = document.getElementById('borrar-todo');
const clipboard = document.querySelector('clipboard-img');

let valorInicial = 0;
let valorOperador = '';
let esperandoValor = false;

function ingresarNumero(numero) {
    /*Si hay algo ingresado o no*/
    if (esperandoValor) {
        calculadoraDisplay.textContent = numero;
        esperandoValor = false;
    } else {
        const valorDisplay = calculadoraDisplay.textContent;
        calculadoraDisplay.textContent = valorDisplay === '0' ? numero : valorDisplay + numero;
    }
}

function agregarDecimal() {
    /*Agregar decimal*/
    if (esperandoValor) { return }

    if (!calculadoraDisplay.textContent.includes('.')) {
        calculadoraDisplay.textContent = calculadoraDisplay.textContent + ".";
    }
}

const calcular = {
    '%': (num1, num2) => (num1 * 0.01) * num2,
    '/': (num1, num2) => num1 / num2,
    '*': (num1, num2) => num1 * num2,
    '-': (num1, num2) => num1 - num2,
    '+': (num1, num2) => num1 + num2,
    '=': (num1, num2) => num2
};

function operacion(operador) {
    const valorActual = Number(calculadoraDisplay.textContent);

    if (valorOperador && esperandoValor) {
        valorOperador = operador;
        return
    }
    if (!valorInicial) {
        valorInicial = valorActual;
    } else {
        const calculo = 
        calcular[valorOperador](valorInicial, valorActual);
        calculadoraDisplay.textContent = calculo;
        valorInicial = calculo;
    }
    esperandoValor = true;
    valorOperador = operador;
}

function borrarUno() {
    if (calculadoraDisplay != 0 && esperandoValor && valorOperador == '') {
        const nuevoNum = calculadoraDisplay.toString();
        calculadoraDisplay = nuevoNum.slice(0, nuevoNum.length - 1);
        calculadoraDisplay = Number(calculadoraDisplay);
        return calculadoraDisplay;
    }
}

botones.forEach(boton => {
    if (boton.classList.length === 0) {
        boton.addEventListener('click', () => 
        ingresarNumero(boton.value));
    } else if
        (boton.classList.contains('operador')) {
            boton.addEventListener('click', () => 
            operacion(boton.value));
    } else if
        (boton.classList.contains('decimal')) {
            boton.addEventListener('click', () => 
            agregarDecimal());
    } else if
        (boton.classList.contains('borrar')) {
            boton.addEventListener('click', () =>
            borrarUno());
    }
});

function reset() {
    valorInicial = 0;
    valorOperador = '';
    esperandoValor = false;
    calculadoraDisplay.textContent = '0';
}

borrarTodo.addEventListener('click', reset);

function copiar() {
    navigator.clipboard.writeText(calculadoraDisplay.textContent);

    alert("Numero copiado: " + calculadoraDisplay.textContent);
}

