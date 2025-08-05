# Guia de Contribuição

Obrigado por contribuir com o projeto da Plataforma de Cursos! Este documento fornece diretrizes para manter a qualidade e consistência do código.

## 🚀 Como Contribuir

### 1. Configuração do Ambiente

1. **Clone o repositório:**
   ```bash
   git clone [URL_DO_REPOSITORIO]
   cd Plataforma-de-Cursos-Backend
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   ```bash
   cp .env.example .env
   # Edite o arquivo .env com suas configurações
   ```

4. **Configure os hooks do Git:**
   ```bash
   npm run prepare
   ```

### 2. Fluxo de Desenvolvimento

1. **Crie uma branch para sua feature:**
   ```bash
   git checkout -b feature/nome-da-feature
   ```

2. **Desenvolva sua feature:**
   - Siga as convenções de código
   - Escreva testes para novas funcionalidades
   - Mantenha o código limpo e bem documentado

3. **Execute os testes localmente:**
   ```bash
   npm test
   npm run lint
   npm run format:check
   ```

4. **Faça commit das mudanças:**
   ```bash
   git add .
   git commit -m "feat: adiciona nova funcionalidade"
   ```

5. **Envie para o repositório:**
   ```bash
   git push origin feature/nome-da-feature
   ```

6. **Crie um Pull Request**

## 📋 Padrões de Código

### Convenções de Nomenclatura

- **Arquivos:** `camelCase.js` (ex: `userController.js`)
- **Classes:** `PascalCase` (ex: `UserController`)
- **Funções:** `camelCase` (ex: `getAllUsers`)
- **Variáveis:** `camelCase` (ex: `userData`)
- **Constantes:** `UPPER_SNAKE_CASE` (ex: `MAX_RETRY_ATTEMPTS`)

### Estrutura de Commits

Use o padrão [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Tipos:**
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação de código
- `refactor`: Refatoração
- `test`: Adição ou correção de testes
- `chore`: Tarefas de manutenção

**Exemplos:**
```
feat(auth): adiciona autenticação JWT
fix(courses): corrige busca de cursos por categoria
docs: atualiza README com instruções de instalação
```

### Estrutura de Arquivos

```
src/
├── config/          # Configurações
├── controllers/     # Controladores
├── models/         # Modelos do banco
├── routes/         # Rotas da API
├── services/       # Lógica de negócio
├── middleware/     # Middlewares customizados
├── utils/          # Utilitários
└── __tests__/      # Testes
```

## 🧪 Testes

### Executando Testes

```bash
# Todos os testes
npm test

# Testes em modo watch
npm run test:watch

# Testes com cobertura
npm run test:coverage
```

### Escrevendo Testes

- Cada arquivo deve ter testes correspondentes
- Use nomes descritivos para os testes
- Teste casos de sucesso e erro
- Mantenha cobertura mínima de 70%

**Exemplo:**
```javascript
describe('UserController', () => {
  describe('createUser', () => {
    it('deve criar um usuário com dados válidos', async () => {
      // Teste aqui
    });

    it('deve retornar erro para dados inválidos', async () => {
      // Teste aqui
    });
  });
});
```

## 🔍 Linting e Formatação

### Executando Linting

```bash
# Verificar problemas
npm run lint

# Corrigir problemas automaticamente
npm run lint:fix
```

### Executando Formatação

```bash
# Formatar código
npm run format

# Verificar formatação
npm run format:check
```

## 📝 Documentação

- Documente funções complexas
- Mantenha o README atualizado
- Use JSDoc para documentar APIs

**Exemplo:**
```javascript
/**
 * Cria um novo usuário no sistema
 * @param {Object} userData - Dados do usuário
 * @param {string} userData.email - Email do usuário
 * @param {string} userData.password - Senha do usuário
 * @returns {Promise<Object>} Usuário criado
 */
async function createUser(userData) {
  // Implementação
}
```

## 🔒 Segurança

- Nunca commite credenciais
- Use variáveis de ambiente para dados sensíveis
- Valide todas as entradas do usuário
- Use HTTPS em produção
- Mantenha dependências atualizadas

## 🚨 Checklist do Pull Request

Antes de submeter um PR, verifique:

- [ ] Código segue as convenções estabelecidas
- [ ] Testes passam (`npm test`)
- [ ] Linting passa (`npm run lint`)
- [ ] Formatação está correta (`npm run format:check`)
- [ ] Documentação foi atualizada
- [ ] Commits seguem o padrão Conventional Commits
- [ ] Não há credenciais expostas

## 🤝 Processo de Review

1. **Criar Pull Request** com descrição clara
2. **Aguardar review** da equipe
3. **Corrigir feedback** se necessário
4. **Aguardar aprovação** e merge

## 📞 Suporte

Se tiver dúvidas:
- Abra uma issue no GitHub
- Consulte a documentação
- Entre em contato com a equipe

---

Obrigado por contribuir! 🎉
