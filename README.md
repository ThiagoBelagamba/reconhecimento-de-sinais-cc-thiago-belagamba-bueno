# Reconhecimento de Gestos (Arminha e L)

Projeto em página única para GitHub Pages usando Teachable Machine + Tensorflow.js.

## O que este site faz

- Reconhece gestos de mão em tempo real pela webcam.
- Se detectar `arminha`, exibe imagem do Bolsonaro.
- Se detectar `L`, exibe imagem do Lula.
- Mostra barras de confiança para todas as classes do modelo.

## 1) Treinar o modelo no Teachable Machine

1. Acesse [Teachable Machine](https://teachablemachine.withgoogle.com/).
2. Crie um `Image Project` -> `Standard image model`.
3. Crie as classes:
   - `arminha`
   - `L`
   - `neutro` (recomendado para reduzir falso positivo)
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

## 3) Executar localmente

- Abra `index.html` no navegador, ou use uma extensao como Live Server.
- Clique em `Ativar camera e iniciar reconhecimento`.
- Autorize o uso da camera.
- Teste os gestos `arminha` e `L`.

## 4) Publicar no GitHub Pages

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
