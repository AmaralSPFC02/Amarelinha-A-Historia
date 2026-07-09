# 🇧🇷 Amarelinha: A História

Aplicação web fullstack sobre escalações históricas da Seleção Brasileira em Copas do Mundo.

O sistema permite visualizar seleções brasileiras de 1970, 1978, 1982 e 2010 mostrando os titulares em um campo de futebol, reservas em lista, informações dos jogadores e clima atual da cidade onde ocorreu a final da Copa selecionada.

Também permite o cadastro de novas seleções, tornando-o interessante para quem gosta de imaginar ou simular convocações ou seleções hipotéticas

---

## 🚀 Como Rodar

### 1. Instalar dependências

```bash
npm install
```

### 2. Rodar o backend

```bash
npm run server
```

Mensagem esperada:

```txt
🇧🇷 Rodando no servidor 3001, vai Brasil!
```

### 3. Rodar o frontend

Em outro terminal:

```bash
npm run client
```

Acesse:

```txt
http://localhost:5173
```

---

## 📌 Funcionalidades

- Cadastro e login de usuários;
- Validação de campos obrigatórios, e-mail e senha;
- Bloqueio de cadastro com e-mail repetido;
- Autenticação com JWT;
- Rotas privadas;
- Visualização de seleções históricas do Brasil;
- Titulares exibidos em um campinho com camisetinhas;
- Lista de reservas;
- Substituição entre titular e reserva;
- Card com foto, clube, idade e estatísticas do jogador;
- Criação de seleções personalizadas;
- CRUD de seleções criadas pelo usuário;
- Consumo de API externa de clima.

---

## 🧰 Tecnologias Utilizadas

### Frontend

- React
- Vite
- React Router DOM
- JavaScript
- CSS

### Backend

- Node.js
- Express
- JSON Web Token
- bcryptjs
- Zod
- CORS
- dotenv

### Persistência

- Arquivos JSON

### API Externa

- API de clima para exibir a temperatura atual da cidade da final da Copa selecionada.

---

## 🌐 Portas

```txt
Frontend: http://localhost:5173
Backend:  http://localhost:3001
```

---


## 🔐 Autenticação

O sistema utiliza JWT para autenticação.

Principais rotas:

```txt
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

As senhas são armazenadas com hash usando `bcryptjs`.

---

## 📚 CRUD

O CRUD principal do sistema é feito sobre o recurso **Minhas Seleções**.

Rotas:

```txt
GET    /api/minhas-selecoes
POST   /api/minhas-selecoes
PUT    /api/minhas-selecoes/:id
DELETE /api/minhas-selecoes/:id
```

As seleções criadas ficam salvas em arquivo JSON e vinculadas ao usuário logado.

---

## 🌦️ API Externa

A aplicação consome uma API de clima para mostrar a temperatura atual da cidade onde ocorreu a final da Copa selecionada.

Exemplos:

```txt
1970 - Cidade do México
1978 - Buenos Aires
1982 - Madrid
2010 - Joanesburgo
```

---

## 📷 Screenshots

Tela de Login:
<img width="1919" height="911" alt="tela-login" src="https://github.com/user-attachments/assets/4b4ebd04-3cfc-4f19-a629-7dd81447956c" />



Tela de Cadastro:
<img width="1911" height="903" alt="tela-cadastro" src="https://github.com/user-attachments/assets/809c91b2-fbd5-4fa3-8f91-6cd4efccb26a" />



Tela de Exibição da Seleção:
<img width="1152" height="866" alt="time-esquema" src="https://github.com/user-attachments/assets/bc327600-853b-47b1-afe2-d9023a206a40" />



Tela de Jogador Selecionado:
<img width="1152" height="649" alt="tela-jogador-selecionado" src="https://github.com/user-attachments/assets/57390195-c500-4a48-bb6b-2c19c1ceb5fa" />



Tela de Banco de Reservas:
<img width="1152" height="648" alt="banco-reservas" src="https://github.com/user-attachments/assets/6a0b7cad-cbac-4b4e-9ad9-c6e9a7831077" />



Tela de Criação de Novas Seleções:
<img width="1152" height="866" alt="tela-criacao-selecoes" src="https://github.com/user-attachments/assets/74591efb-5735-4a48-9402-9bb9cc55e738" />

---

## 👥 Integrantes

- Gabriel Santos do Amaral - 2022007164 / https://github.com/AmaralSPFC02

---

## ✅ Requisitos Atendidos

- Aplicação web executando no navegador;
- Login e cadastro;
- Validações com Zod;
- E-mail único;
- Rotas privadas;
- Autenticação com JWT;
- Frontend com React;
- Backend com Node.js e Express;
- CRUD completo;
- Persistência em arquivos JSON;
- Uso de API externa;
- Projeto versionado em repositório público
