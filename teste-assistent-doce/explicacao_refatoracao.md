# Explicacao da Refatoracao (estatisticas em JavaScript)

## Contexto

A versao inicial (`estatisticas_base.js`) funciona e calcula:
- media
- mediana
- minimo e maximo
- variancia
- desvio padrao

Mas ela concentra muitas responsabilidades em uma unica funcao.

## Problemas da versao base

- validacao simples e pouco detalhada;
- dificil reaproveitar partes especificas (ex.: calcular so mediana);
- manutencao mais custosa por ter tudo no mesmo bloco;
- menor legibilidade para quem esta aprendendo.

## O que foi melhorado

Na versao `estatisticas_refatorado.js`, o codigo foi dividido em funcoes menores:

- `validarDados(lista)`;
- `calcularMedia(lista)`;
- `calcularMediana(lista)`;
- `calcularVariancia(lista, media)`;
- `calcularResumo(lista)` (orquestra as anteriores).

## Beneficios da refatoracao

- **Clareza:** cada funcao tem uma responsabilidade.
- **Reuso:** funcoes podem ser usadas separadamente em outros scripts.
- **Confiabilidade:** validacao explicita com mensagens de erro claras.
- **Escalabilidade:** fica facil adicionar novas metricas (ex.: moda, percentis).

## Ligacao com a aula de Programacao Assistida com IA

Neste fluxo, a IA ajuda a:
- identificar code smells (funcao grande demais);
- sugerir decomposicao em funcoes coesas;
- comparar versao "antes e depois";
- documentar decisoes de projeto de forma didatica.
