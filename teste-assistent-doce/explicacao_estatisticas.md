# Explicacao dos Calculos de Estatistica

Este material resume as metricas usadas nos scripts de exemplo.

## 1) Media

Soma de todos os valores dividida pela quantidade de elementos.

Formula:

`media = (x1 + x2 + ... + xn) / n`

## 2) Mediana

Valor central da lista ordenada.

- Se `n` for impar: pega o elemento do meio.
- Se `n` for par: faz a media dos dois elementos centrais.

## 3) Minimo e Maximo

- **Minimo:** menor valor da amostra.
- **Maximo:** maior valor da amostra.

Servem para entender o intervalo de variacao dos dados.

## 4) Variancia

Mede o quanto os valores se espalham em relacao a media.

Passos:
1. calcular a media;
2. subtrair cada valor pela media;
3. elevar ao quadrado;
4. somar;
5. dividir por `n` (variancia populacional).

## 5) Desvio Padrao

Raiz quadrada da variancia.

`desvioPadrao = sqrt(variancia)`

Quanto maior o desvio padrao, maior a dispersao dos dados.

## Aplicacao no seu projeto (Pose + Classe 1 CINEMA)

No projeto de reconhecimento de pose:
- cada frame gera probabilidades para classes;
- voce pode coletar apenas a probabilidade da Classe 1 ao longo do tempo;
- com essas metricas, fica mais facil justificar o limiar (ex.: 80%) para ativar o meme.
