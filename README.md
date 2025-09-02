🧪 saucedemo-cypress-ci








📋 Descrição do Projeto

Automação de testes end-to-end no site SauceDemo
 utilizando Cypress, com execução local, geração de relatórios visuais e integração contínua via GitHub Actions.
O projeto serve como portfólio profissional e prática de automação de testes.

🚀 Tecnologias Utilizadas

Node.js
 v24.1.0

Cypress
 v15.0.0

Mochawesome (relatórios visuais)

Navegador: Chrome v139.0.7258.155

🔧 Pré-requisitos

Antes de começar, você precisa ter instalado na sua máquina:

Node.js
 (>= v24.1.0)

npm

📦 Instalação e Execução
# Clone o repositório
git clone https://github.com/italooliveir/saucedemo-cypress-ci.git

# Acesse a pasta do projeto
cd saucedemo-cypress-ci

# Instale as dependências
npm ci

🏃‍♂️ Executar os testes
# Executa todos os testes
npm run test

# Ou separadamente:
npm run cy:run        # Roda os testes
npm run report         # Gera relatório Mochawesome


Os relatórios são gerados em cypress/reports/html/index.html.

Arquivos JSON intermediários ficam em cypress/reports/report.json.

🧪 Testes Implementados

✅ Cenários Positivos

Login com credenciais válidas (usando comando personalizado)

Adição de produtos ao carrinho

Fluxo de checkout

❌ Cenários Negativos

Login com credenciais inválidas

Login com campos vazios

Tentativa de checkout sem produtos

📊 Relatórios e CI/CD

Relatórios visuais com Mochawesome.

Cada execução no GitHub Actions gera um artefato chamado mochawesome-report.

Workflow .github/workflows/cypress.yml executa automaticamente em push ou pull request na branch main:

Checkout do repositório

Instalação das dependências

Execução dos testes Cypress

Geração do relatório Mochawesome

Upload do relatório como artefato

📂 Estrutura do Projeto
cypress/
├── e2e/            # Testes: login, carrinho, checkout
├── fixtures/       # Dados de teste
├── support/        # Comandos personalizados
├── reports/        # Relatórios Mochawesome
package.json
package-lock.json
cypress.config.js
.github/workflows/cypress.yml

🔄 Futuras Implementações

Integração com Cypress Cloud

Mais cenários de testes

Melhorias visuais nos relatórios

CI/CD completo com deploy de relatórios online

👤 Autor

Ítalo Oliveira

LinkedIn

GitHub

📄 Licença

Este projeto está licenciado sob a licença MIT.

Você tem permissão para usar, copiar, modificar, mesclar, publicar, distribuir, sublicenciar e/ou vender cópias do projeto, desde que o copyright e a permissão sejam incluídos em todas as cópias ou partes substanciais do software.

O projeto é fornecido "NO ESTADO EM QUE SE ENCONTRA", sem garantias de qualquer tipo, expressas ou implícitas.