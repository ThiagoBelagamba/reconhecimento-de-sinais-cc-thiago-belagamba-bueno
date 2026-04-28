// Versao refatorada: funcoes menores, validacao explicita e retorno consistente.

function validarDados(lista) {
  if (!Array.isArray(lista)) {
    throw new Error("Entrada invalida: esperado um array.");
  }
  if (lista.length === 0) {
    throw new Error("Entrada invalida: array vazio.");
  }
  if (!lista.every((item) => Number.isFinite(item))) {
    throw new Error("Entrada invalida: todos os itens devem ser numeros finitos.");
  }
}

function calcularMedia(lista) {
  const soma = lista.reduce((acc, valor) => acc + valor, 0);
  return soma / lista.length;
}

function calcularMediana(lista) {
  const ordenada = [...lista].sort((a, b) => a - b);
  const meio = Math.floor(ordenada.length / 2);
  if (ordenada.length % 2 === 0) {
    return (ordenada[meio - 1] + ordenada[meio]) / 2;
  }
  return ordenada[meio];
}

function calcularVariancia(lista, media) {
  const somaQuadrados = lista.reduce((acc, valor) => {
    const diferenca = valor - media;
    return acc + diferenca * diferenca;
  }, 0);
  return somaQuadrados / lista.length;
}

function calcularResumo(lista) {
  validarDados(lista);

  const media = calcularMedia(lista);
  const mediana = calcularMediana(lista);
  const min = Math.min(...lista);
  const max = Math.max(...lista);
  const variancia = calcularVariancia(lista, media);
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

// Exemplo de uso generico
const numeros = [10, 12, 15, 18, 22, 24, 26];
console.log("Resumo refatorado (generico):", calcularResumo(numeros));

module.exports = {
  validarDados,
  calcularMedia,
  calcularMediana,
  calcularVariancia,
  calcularResumo
};
