# 🧪 saucedemo-cypress-ci

![Cypress](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)  
![Status](https://img.shields.io/badge/status-em%20andamento-yellow)  
![Node](https://img.shields.io/badge/node-v24.1.0-green)  
![Cypress](https://img.shields.io/badge/cypress-v15.0.0-green)

## 📋 Descrição do Projeto
Automação de testes **end-to-end** no site [SauceDemo](https://www.saucedemo.com/) utilizando **Cypress**, com execução local e futura integração em pipeline **CI/CD**.  
O objetivo é servir como **portfólio** e prática de automação de testes.

---

## 🚀 Tecnologias Utilizadas
- [Node.js](https://nodejs.org/) v24.1.0  
- [Cypress](https://www.cypress.io/) v15.0.0  
- Navegador: Chrome v139.0.7258.155  

---

## 🔧 Pré-requisitos
Antes de começar, você precisa ter instalado na sua máquina:
- [Node.js](https://nodejs.org/) (>= v24.1.0)  
- [npm](https://www.npmjs.com/)  

---

## 📦 Instalação e Execução
## 📦 Instalação e Execução

# Clone o repositório
git clone https://github.com/italooliveir/saucedemo-cypress-ci.git

# Acesse a pasta do projeto
cd saucedemo-cypress-ci

# Instale as dependências
npm install

# Abra o Cypress no modo interativo
npx cypress open

# Ou execute os testes em modo headless
npx cypress run


🧪 Testes Implementados
✅ Cenários Positivos

- Login com credenciais válidas (usando comando personalizado)
- Adição de produtos ao carrinho
- Fluxo de checkout

❌ Cenários Negativos

- Login com credenciais inválidas
- Login com campos vazios
- Tentativa de checkout sem produtos


📂 Estrutura do Projeto

Estrutura inicial do projeto (padrão do Cypress):

cypress/
  e2e/            # Todos os testes: login, carrinho, checkout
  support/        # Comando personalizado de login

🔄 Futuras Implementações

- Integração com Cypress Cloud (opcional)
- Relatórios de testes (opcional)
- Pipeline de CI/CD (opcional)

👤 Autor

Ítalo Oliveira

- [LinkedIn](https://www.linkedin.com/in/italo-oliveira-281a76239/)
- [GitHub](https://github.com/italooliveir)


📄 Licença

## 📄 Licença
Este projeto está licenciado sob a licença **MIT**.  

Você tem permissão para **usar, copiar, modificar, mesclar, publicar, distribuir, sublicenciar e/ou vender** cópias do projeto, desde que o **copyright e a permissão sejam incluídos** em todas as cópias ou partes substanciais do software.  

O projeto é fornecido **"NO ESTADO EM QUE SE ENCONTRA"**, sem garantias de qualquer tipo, expressas ou implícitas, incluindo, mas não se limitando, às garantias de **comercialização, adequação a um propósito específico e não violação**.

