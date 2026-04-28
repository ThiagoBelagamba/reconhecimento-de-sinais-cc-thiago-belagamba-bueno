# Reconhecimento de Pose (Classe 1 = CINEMA)

Projeto em página única para GitHub Pages usando Teachable Machine Pose + Tensorflow.js.

## O que este site faz

- Reconhece pose em tempo real pela webcam.
- Usa a `Classe 1` do modelo como gatilho principal.
- Quando a `Classe 1` passa do limiar configurado (80%), exibe o meme `CINEMA`.
- A imagem usada no meme vem de arquivo local: `assets/cinema.jpg`.
- Mostra barras de confiança para todas as classes do modelo.

## 1) Treinar o modelo no Teachable Machine (Pose)

1. Acesse [Teachable Machine](https://teachablemachine.withgoogle.com/).
2. Crie um `Pose Project` -> `Standard`.
3. Crie as classes:
   - `Classe 1` (sera o gatilho do meme CINEMA)
   - outras classes que voce quiser para contraste (ex.: neutro, pose2 etc.)
4. Colete varias amostras por classe com iluminacao e angulos diferentes.
5. Clique em `Train Model`.
6. Em `Export Model`:
   - Aba `Tensorflow.js`
   - `Upload my model`
   - Copie a URL gerada (termina com `/`)

## 2) Configurar o projeto

1. Abra `index.html`.
2. Localize:

```js
const MODEL_URL = "COLE_AQUI_A_URL_DO_SEU_MODELO/";
```

3. Substitua pela URL do seu modelo.

Exemplo:

```js
const MODEL_URL = "https://teachablemachine.withgoogle.com/models/XXXXXXXXX/";
```

## 3) Arquivo de imagem do meme

- Garanta que o arquivo exista em `assets/cinema.jpg`.
- O `index.html` ja esta configurado para usar esse caminho local.

## 4) Executar localmente

- Abra `index.html` no navegador, ou use uma extensao como Live Server.
- Clique em `Iniciar camera e reconhecimento de pose`.
- Autorize o uso da camera.
- Faça a pose da `Classe 1` e valide se o meme CINEMA aparece quando a confianca passa de 80%.

## 5) Publicar no GitHub Pages

No terminal, dentro da pasta do projeto:

```bash
git init
git add .
git commit -m "feat: reconhecimento de gestos com Teachable Machine"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/reconhecimento-imagem.git
git push -u origin main
```

Depois no GitHub:

1. `Settings` -> `Pages`
2. `Build and deployment` -> `Deploy from a branch`
3. Branch `main`, pasta `/ (root)`, `Save`

URL final (exemplo):

`https://SEU-USUARIO.github.io/reconhecimento-imagem/`
