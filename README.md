# Fleet Manager - Testes Automatizados com Cypress

Este projeto contém testes automatizados para o sistema Fleet Manager, uma aplicação de gerenciamento e aluguel de veículos.

## 🚀 Pré-requisitos

- Node.js (versão 14 ou superior)
- NPM (Node Package Manager)
- Git

## 💻 Instalação

1. Clone o repositório:
```bash
git clone <https://github.com/NathanSoaresRodrigues/fleet-manager-cypress.git>
cd fleet-manager-cypress
```

2. Instale as dependências:
```bash
npm install
```

## ⚡ Execução dos Testes

### Modo Interativo
```bash
npx cypress open
```

### Modo Headless
```bash
npx cypress run
```

### Executar um arquivo específico
```bash
npx cypress run --spec "cypress/e2e/auth.spec.cy.js"
```

## 🧪 Cenários de Teste Cobertos

### 1. Autenticação (`auth.spec.cy.js`)
- ✅ Login com credenciais válidas
- ✅ Login com credenciais inválidas
- ✅ Validação de campos obrigatórios
- ❌ Processo de logout

### 2. Busca de Veículos (`vehicle-search.spec.cy.js`)
- ✅ Busca por modelo de veículo
- ✅ Busca por placa
- ✅ Tratamento de busca sem resultados
- ✅ Limpeza do campo de busca

### 3. Aluguel de Veículos (`vehicle-rental.spec.cy.js`)
- ✅ Aluguel com pagamento por cartão de crédito
- ✅ Aluguel com pagamento por PIX
- ✅ Validação de limites mínimo de dias de aluguel (1 dia)
- ❌ Validação de limites máximo de dias de aluguel (30 dias)
- ❌ Validação de cupom de desconto
- ✅ Cancelamento no modal de aluguel
- ❌ Cancelamento no modal de pagamento

## 📂 Estrutura do Projeto

```
fleet-manager-cypress/
├── cypress/
│   ├── e2e/                    # Arquivos de teste
│   ├── fixtures/               # Dados de teste
│   ├── pageObjects/            # Page Objects
│   └── support/                # Comandos e configurações customizadas
├── cypress.config.js           # Configuração do Cypress
└── package.json               
```

## 🛠️ Padrões e Boas Práticas

### Page Objects
O projeto utiliza o padrão Page Object Model (POM) para melhor organização e reuso de código:
- `LoginPage`: Ações relacionadas à autenticação
- `HomePage`: Interações com a página principal e busca de veículos
- `RentalModal`: Ações nos modais de aluguel e pagamento

### Fixtures
Dados de teste centralizados em arquivos JSON:
- `user.json`: Credenciais de usuário para testes

### Hooks
- `beforeEach`: Configuração do estado inicial para cada teste
- `afterEach`: Limpeza do estado após cada teste
- Gerenciamento de cookies e localStorage

## 📝 Boas Práticas Implementadas

1. **Isolamento de Testes**
   - Limpeza de estado entre testes
   - Uso de fixtures para dados de teste
   - Recarregamento da página após cada teste

2. **Estabilidade**
   - Esperas explícitas quando necessário
   - Verificações de visibilidade de elementos
   - Tratamento de estados assíncronos

3. **Manutenibilidade**
   - Uso de Page Objects
   - Métodos encadeáveis (method chaining)
   - Documentação clara de cenários

4. **Performance**
   - Reutilização de login entre testes
   - Otimização de seletores
   - Comandos customizados para ações comuns

## 🔍 Validações Importantes

- Status dos veículos (Disponível, Alugado, Em manutenção)
- Limites de dias para aluguel (1-30 dias)
- Diferentes métodos de pagamento
- Aplicação de cupons de desconto
- Fluxos de cancelamento

## 🐛 Problemas Conhecidos e Soluções

1. **Timeout em Elementos**
   - Implementadas esperas explícitas
   - Verificações de visibilidade antes de interações

2. **Estado Compartilhado**
   - Limpeza de cookies e localStorage
   - Recarregamento forçado entre testes

## 📊 Reports e Resultados

Os resultados dos testes podem ser encontrados:
- No terminal após execução em modo headless
- Na interface do Cypress em modo interativo
- Em screenshots e vídeos gerados automaticamente

## 🔄 Integração Contínua

Recomendações para CI:
```yaml
steps:
  - name: Install dependencies
    run: npm install

  - name: Run Cypress tests
    run: npm run cypress:run
```

## 📚 Documentação Adicional

- [Documentação do Cypress](https://docs.cypress.io)
- [Guia de Page Objects](https://www.cypress.io/blog/2019/01/03/stop-using-page-objects-and-start-using-app-actions/)

## 👥 Contribuição

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request