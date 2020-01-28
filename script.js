/* FUNÇÃO ANÔNIMA ESCUTANDO O TECLADO PARA CHAMAR AS FUNÇÕES DE CONVERSÃO
 ASSIM QUE OS VALORES FOREM SENDO DIGITADOS */
document.addEventListener("keyup", function(event) {
  var radioCounter = document.querySelectorAll(".base");
  for (i=0; i<radioCounter.length; i++) {
    var num = document.querySelectorAll(".field")[i].value;
    var numberBase = radioCounter[i].value;
    if (radioCounter[i].checked && radioCounter[i].value == 10) {
      converterOne(num);
    } else if (radioCounter[i].checked && radioCounter.value !== 10) {
      converterTwo(num, numberBase);
    }
  }
});

// ALGORITMO PARA CONVERTER VALORES DECIMAIS EM OUTRAS BASES
function decTo(valor, base) {
  var result = [];

  while (valor > 0) {
    result.push(valor%base);
    valor = Math.floor(valor/base);
  }
  result = result.reverse();
  if (base == 16) {

    var hexa = {
      10: 'A',
      11: 'B',
      12: 'C',
      13: 'D',
      14: 'E',
      15: 'F'
    };

    result = result.map(value => value >= 10 ? hexa[value] : value);
  }
  return result.join("");
}

/* PEGA AS BASES (10, 2, 8, 16), PASSA CADA UMA DELAS DENTRO DA FUNÇÃO
 decTo() ATRAVÉS DE UM LOOP, CONVERTENDO E PREENCHENDO DINAMICAMENTE
 OS RESULTADOS EM SEUS RESPECTIVOS CAMPOS */
function converterOne(num) {
  var bases = [10, 2, 8, 16];
  for (c=0; c<bases.length; c++) {
    document.querySelectorAll(".field")[c].value = decTo(num, bases[c]);
  }
}

// CONVERSÃO DAS OUTRAS BASES E PREENCHIMENTO DINÂMICO DOS CAMPOS
function converterTwo(number, numberBase) {
  var bases = [10, 2, 8, 16];
  var toDecimal = parseInt(number, numberBase);   // TRANSFORMA PRIMEIRO O VALOR ORIGINAL OCTAL, HEXADECIMAL OU BINÁRIO EM DECIMAL...
  for (c=0; c<bases.length; c++) {
    document.querySelectorAll(".field")[c].value = decTo(toDecimal, bases[c]);  // ...PARA ENTÃO CONVERTER O EQUIVALENTE DECIMAL NAS OUTRAS BASES.
  }
}

// ESPERANDO O CLIQUE NO BOTÃO "calcular" PARA EXECUTAR A FUNÇÃO calculate()
document.querySelector(".calculateBtn").addEventListener("click", calculate);

/* FUNÇÃO QUE FAZ A SOMA/SUBTRAÇÃO DOS VALORES NOS CAMPOS E MOSTRA O
 RESULTADO EM BAIXO */
function calculate() {
  var baseOption = document.getElementsByTagName("select")[0].value;
  var valorOriginal1 = document.getElementsByClassName("valores")[0].value;
  var valorOriginal2 = document.getElementsByClassName("valores")[1].value;
  var valorEmDecimal1 = parseInt(valorOriginal1, baseOption);
  var valorEmDecimal2 = parseInt(valorOriginal2, baseOption);
  // if (document.querySelectorAll("input.operador")[0].checked) {
  //   var operacao = (valorEmDecimal1+valorEmDecimal2);
  // } else {
  //   var operacao = (valorEmDecimal1-valorEmDecimal2);
  // }
  var operacao = (document.querySelectorAll("input.operador")[0].checked) ? (valorEmDecimal1+valorEmDecimal2) : (valorEmDecimal1-valorEmDecimal2);
  var resultado = operacao.toString(baseOption);
  document.getElementById("resultado").innerHTML = resultado.toUpperCase();
}

/* FUNÇÃO UTILIZANDO REGULAR EXPRESSION PARA IMPEDIR QUE OUTROS CARACTERES ALÉM DOS
 EXISTENTES EM BINÁRIO/OCTAL/HEXADECIMAL SEJAM DIGITADOS NO CAMPO DE SOMA/SUBTRAÇÃO */
function preventKeywords(input) {
  var baseOption = document.getElementsByTagName("select")[0].value;
  var regexHexa = /[^0-9a-f]/gi;
  var regexOct = /[^0-7]/gi;
  var regexBin = /[^01]/gi;
  if (baseOption == 8) {
    input.value = input.value.replace(regexOct, "");
  } else if (baseOption == 16) {
    input.value = input.value.replace(regexHexa, "");
  } else {
    input.value = input.value.replace(regexBin, "");
  }
}
