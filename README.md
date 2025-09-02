# 🧪 Saucedemo Cypress CI

Automação de testes end-to-end no site [SauceDemo](https://www.saucedemo.com/) utilizando **Cypress**, com execução local, relatórios visuais, gravação de vídeos e integração contínua via **GitHub Actions**.  
Este projeto foi desenvolvido como portfólio profissional e prática de automação de testes modernos.

---

## 📋 Descrição

O objetivo é validar funcionalidades críticas do SauceDemo, cobrindo **cenários positivos e negativos**.  
A automação inclui:

- Login com diferentes credenciais  
- Fluxo de compra completo (carrinho → checkout → finalização)  
- Tratamento de erros e restrições de acesso  
- Relatórios visuais detalhados com **Mochawesome**  
- Gravação automática de **vídeos e screenshots** de cada execução  
- Execução contínua em **CI/CD** com GitHub Actions  

---

## 🚀 Tecnologias

- Node.js v24.1.0  
- Cypress v15.0.0  
- Mochawesome (relatórios HTML/JSON)  
- GitHub Actions (CI/CD)  
- Google Chrome v139.0.7258.155  

---

## 🔧 Pré-requisitos

Antes de começar, instale em sua máquina:

- [Node.js](https://nodejs.org/) (>= v24.1.0)  
- npm (vem junto com o Node.js)  
- Git  

---

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/italooliveir/saucedemo-cypress-ci.git

# Acesse a pasta
cd saucedemo-cypress-ci

# Instale as dependências
npm ci
▶️ Execução
bash
Copiar código
# Executa todos os testes em modo headless
npm run test

# Roda somente os testes
npm run cy:run

# Gera o relatório Mochawesome
npm run report
📍 Saídas dos testes

Relatórios: cypress/reports/html/index.html

JSON: cypress/reports/report.json

Vídeos: cypress/videos/

Screenshots (em caso de falha): cypress/screenshots/

🧪 Testes Implementados
✅ Cenários Positivos
Login com credenciais válidas (comando customizado)

Adição de produtos ao carrinho

Fluxo completo de checkout

❌ Cenários Negativos
Login com credenciais inválidas

Login com campos vazios

Tentativa de checkout sem produtos

📊 Relatórios e CI/CD
Relatórios visuais gerados com Mochawesome

Workflow automatizado com GitHub Actions (.github/workflows/cypress.yml)

Instala dependências

Executa os testes Cypress

Gera relatórios Mochawesome

Armazena vídeos, screenshots e relatórios como artefatos

📂 Estrutura
bash
Copiar código
cypress/
├── e2e/            # Testes end-to-end (login, carrinho, checkout)
├── fixtures/       # Massa de dados
├── support/        # Comandos customizados
├── reports/        # Relatórios Mochawesome
├── videos/         # Gravações automáticas
├── screenshots/    # Capturas em caso de falhas
node_modules/       
package.json        
cypress.config.js   
.github/workflows/  # Pipeline CI/CD
👤 Autor
Ítalo Oliveira

LinkedIn

GitHub

📄 Licença
Este projeto está licenciado sob a licença MIT.
Você pode usar, modificar e distribuir livremente, mantendo os devidos créditos ao autor.

 
👉 Essa versão está **finalizada**, com foco em **clareza, padronização e estética profissional**.  
Ela já cobre: tecnologias, instalação, execução, testes, relatórios, CI/CD, estrutura e licença.  