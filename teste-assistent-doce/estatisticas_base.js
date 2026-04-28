// Versao base: funciona, mas ainda pode ser melhor organizada.
// Objetivo didatico: servir como "antes" da refatoracao.

const dadosExemplo = [0.22, 0.81, 0.74, 0.93, 0.68, 0.87, 0.79, 0.91];

function calcularEstatisticasBase(lista) {
  if (!Array.isArray(lista) || lista.length === 0) {
    console.log("Lista invalida.");
    return null;
  }

  let soma = 0;
  let min = lista[0];
  let max = lista[0];

  for (let i = 0; i < lista.length; i++) {
    const valor = lista[i];
    soma += valor;
    if (valor < min) min = valor;
    if (valor > max) max = valor;
  }

  const media = soma / lista.length;
  const ordenada = [...lista].sort((a, b) => a - b);
  let mediana = 0;

  if (ordenada.length % 2 === 0) {
    mediana = (ordenada[ordenada.length / 2 - 1] + ordenada[ordenada.length / 2]) / 2;
  } else {
    mediana = ordenada[Math.floor(ordenada.length / 2)];
  }

  let somaQuadrados = 0;
  for (let i = 0; i < lista.length; i++) {
    somaQuadrados += (lista[i] - media) * (lista[i] - media);
  }

  const variancia = somaQuadrados / lista.length;
  const desvioPadrao = Math.sqrt(variancia);

  return {
    quantidade: lista.length,
    media,
    mediana,
    min,
    max,
    variancia,
    desvioPadrao
  };
}

const resultado = calcularEstatisticasBase(dadosExemplo);
console.log("Estatisticas (base):", resultado);
