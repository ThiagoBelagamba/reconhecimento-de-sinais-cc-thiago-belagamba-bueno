// Exemplo aplicado ao contexto do projeto:
// Classe 1 (CINEMA) com limiar de ativacao em 80%.

const { calcularResumo } = require("./estatisticas_refatorado");

const LIMIAR_CINEMA = 0.8;

// Simulacao de probabilidades da Classe 1 ao longo de varios frames.
const probabilidadesClasse1 = [
  0.21, 0.35, 0.49, 0.62, 0.78, 0.81, 0.83, 0.76, 0.88, 0.91,
  0.67, 0.72, 0.84, 0.93, 0.79, 0.82, 0.86, 0.9, 0.77, 0.88
];

function contarFramesAcimaDoLimiar(lista, limiar) {
  return lista.filter((p) => p >= limiar).length;
}

function percentual(valor) {
  return (valor * 100).toFixed(2) + "%";
}

function executarAnalise() {
  const resumo = calcularResumo(probabilidadesClasse1);
  const framesAcima = contarFramesAcimaDoLimiar(probabilidadesClasse1, LIMIAR_CINEMA);
  const taxaAtivacao = framesAcima / probabilidadesClasse1.length;

  console.log("=== Analise da Classe 1 (CINEMA) ===");
  console.log("Frames analisados:", probabilidadesClasse1.length);
  console.log("Media:", percentual(resumo.media));
  console.log("Mediana:", percentual(resumo.mediana));
  console.log("Minimo:", percentual(resumo.min));
  console.log("Maximo:", percentual(resumo.max));
  console.log("Desvio padrao:", percentual(resumo.desvioPadrao));
  console.log("Frames >= 80%:", framesAcima);
  console.log("Taxa de ativacao do meme:", percentual(taxaAtivacao));

  if (taxaAtivacao < 0.4) {
    console.log("Sugestao: talvez o limiar esteja alto para as amostras atuais.");
  } else if (taxaAtivacao > 0.85) {
    console.log("Sugestao: talvez o limiar esteja baixo e permita muitos falsos positivos.");
  } else {
    console.log("Sugestao: o limiar de 80% parece equilibrado para este conjunto.");
  }
}

executarAnalise();
