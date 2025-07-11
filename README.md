Backend da Plataforma de Cursos (Node.js + Express + MySQL)

Bem-vindo ao backend da Plataforma de Cursos! Este documento serve como um guia completo para entender a estrutura do projeto, a função de cada arquivo e como executar o servidor.

Este projeto foi construído com as seguintes tecnologias principais:

    Node.js: Ambiente de execução para JavaScript no lado do servidor.
    Express.js: Framework web para criar a API e gerenciar rotas.
    MySQL: Banco de dados relacional para armazenar os dados.
    Sequelize: ORM (Mapeador Objeto-Relacional) para facilitar a comunicação entre o Node.js e o MySQL de forma segura e produtiva.

📋 Pré-requisitos

Antes de começar, garanta que você tenha os seguintes softwares instalados:

    Node.js (versão 14 ou superior)
    MySQL

🚀 Guia de Instalação e Execução

Siga os passos abaixo para configurar e rodar o projeto em sua máquina local.

    Instale as dependências:
    Navegue até a pasta backend pelo terminal e execute o comando abaixo para instalar todos os pacotes necessários que estão listados no package.json.
    Bash

npm install

Configure o Banco de Dados MySQL:
Abra seu cliente MySQL (como MySQL Workbench, DBeaver, etc.) e crie o banco de dados que será usado pelo projeto:
SQL

CREATE DATABASE plataforma_cursos;

Configure as Variáveis de Ambiente:
Crie um arquivo chamado .env na raiz da pasta backend. Ele guardará suas credenciais e outras informações sensíveis. Copie o conteúdo abaixo para dentro dele e substitua os valores de exemplo pelos seus.

# Configurações do Banco de Dados MySQL
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha_do_mysql
DB_NAME=plataforma_cursos

# Chave secreta para gerar os tokens de autenticação
JWT_SECRET=coloque_uma_frase_secreta_e_longa_aqui

Execute o Servidor:
Após configurar o .env, execute o seguinte comando no terminal:
Bash

    npm run dev

    Se tudo estiver correto, você verá mensagens confirmando a conexão com o banco de dados e que o servidor está rodando na porta 5000.

📂 Anatomia do Projeto (Estrutura de Arquivos)

Entender o que cada arquivo e pasta faz é crucial para o desenvolvimento.
Arquivos na Raiz

    package.json: O "RG" do projeto. Contém metadados como nome, versão e, mais importante, as listas de dependências (dependencies e devDependencies) e os scripts customizados (como o npm run dev).
    package-lock.json: Arquivo gerado automaticamente que "trava" as versões exatas de cada dependência instalada. Isso garante que o projeto funcione da mesma forma em qualquer máquina.
    .env: Arquivo para armazenar variáveis de ambiente. Ele é ignorado pelo Git (deve ser) para não expor informações sensíveis como senhas de banco de dados e chaves secretas.
    node_modules/: Pasta criada pelo NPM que contém o código de todas as dependências que instalamos. Você nunca deve editar ou enviar esta pasta para o repositório.

Pasta src/ (Source/Código-Fonte)

Todo o código da nossa aplicação vive aqui.

    src/config/database.js
        Propósito: Configurar e exportar a conexão com o banco de dados.
        Como funciona: Ele usa o Sequelize para criar uma instância de conexão, lendo as informações (usuário, senha, nome do banco) diretamente do nosso arquivo .env. Centralizar a configuração aqui facilita a manutenção.
    src/models/
        Propósito: Define a estrutura dos nossos dados. Cada arquivo aqui representa uma tabela no banco de dados. Eles são os "moldes" ou "plantas" dos nossos dados.
        User.js: Define a tabela Users. Especifica que um usuário terá campos como username, email e password, com suas respectivas regras (tipos de dado, se podem ser nulos, etc.). Contém um "hook" beforeCreate que criptografa a senha automaticamente usando bcrypt antes de salvar um novo usuário no banco.
        Course.js: Define a tabela Courses e todos os seus campos, como title, description, category, etc.
    src/controllers/
        Propósito: Contém a "lógica de negócio" da aplicação. Quando uma rota é chamada, é o controller correspondente que executa as ações, como buscar dados no banco, validar informações e enviar uma resposta.
        authController.js: Lida com a lógica de autenticação. A função register valida se o e-mail já existe, cria um novo usuário no banco usando o modelo User, e gera um token JWT. A função login encontra o usuário, compara a senha enviada com a senha criptografada no banco e, se tudo estiver certo, gera um novo token.
        courseController.js: Lida com a lógica relacionada aos cursos. A função getAllCourses simplesmente usa o modelo Course para buscar todos os cursos na tabela e os retorna como uma resposta JSON.
    src/routes/
        Propósito: Define os endpoints (as URLs) da nossa API. Eles são as "portas de entrada" da nossa aplicação, recebendo as requisições do frontend.
        auth.js: Define as rotas de autenticação, como POST /api/auth/register e POST /api/auth/login. Ele conecta essas URLs às funções correspondentes no authController.js.
        courses.js: Define as rotas de cursos, como GET /api/courses, conectando-a à função getAllCourses no courseController.js.
    src/server.js
        Propósito: É o ponto de entrada principal do nosso backend. É o arquivo que orquestra tudo.
        Como funciona:
            Inicia o express.
            Aplica middlewares essenciais: cors (para permitir requisições de outros domínios) e express.json (para que o servidor entenda requisições com corpo em formato JSON).
            Conecta-se ao banco de dados usando a configuração do Sequelize.
            Sincroniza os modelos (User, Course) com o banco, o que cria as tabelas automaticamente se elas não existirem.
            Conecta as rotas definidas na pasta routes/ a um prefixo base (ex: /api/auth).
            Inicia o servidor para "escutar" por requisições na porta especificada (5000).

📦 Módulos Principais (Dependências) e Para Que Servem

    express: É a fundação do nosso servidor. Ele nos dá as ferramentas para criar rotas, gerenciar requisições (requests) e respostas (responses) de forma simples.
    sequelize: Um ORM. Em vez de escrevermos SQL puro (INSERT INTO..., SELECT * FROM...), nós manipulamos objetos e métodos em JavaScript (ex: User.create(), Course.findAll()), e o Sequelize traduz isso para o SQL apropriado para o nosso banco (neste caso, MySQL). Isso torna o código mais limpo, seguro e portável para outros bancos de dados.
    mysql2: É o "tradutor" de baixo nível, o driver que permite que o Node.js se comunique diretamente com um servidor MySQL. O Sequelize usa ele por baixo dos panos.
    dotenv: Carrega as variáveis do arquivo .env para o process.env do Node.js, permitindo que acessemos informações como process.env.DB_PASSWORD de forma segura, sem deixar senhas expostas no código.
    cors: Mecanismo de segurança do navegador que impede que um site em http://localhost:3000 (seu frontend) faça requisições para um servidor em http://localhost:5000 (seu backend). Este módulo configura o backend para dizer ao navegador: "Está tudo bem, eu permito requisições vindas daquele endereço".
    bcryptjs: Ferramenta de criptografia usada para transformar as senhas dos usuários em um "hash" (uma string longa e ilegível) antes de salvar. Isso é uma prática de segurança essencial, pois, mesmo que o banco de dados seja comprometido, as senhas originais não serão expostas.
    jsonwebtoken (JWT): Após o login, em vez de o usuário ter que enviar e-mail e senha a cada requisição, o servidor gera um "token" assinado e o envia para o frontend. O frontend então anexa esse token a cada requisição futura para provar que está autenticado.
    nodemon: Ferramenta de desenvolvimento que monitora as alterações nos arquivos do projeto. Assim que você salva um arquivo, ele reinicia o servidor automaticamente, economizando muito tempo durante o desenvolvimento.


Estes passos estão organizados de forma lógica, do mais imediato ao mais avançado.
Passo 1: Conectar o Frontend com o Backend

O primeiro objetivo é fazer com que as páginas HTML/CSS/JS conversem com a API que você criou.

    Onde fazer as chamadas?
    Nos arquivos JavaScript do seu frontend (como em Site Pagina Inicial 2.0/script.js ou em scripts específicos para as páginas de login/cadastro), use a função fetch() do navegador para fazer as requisições para a sua API.

    Exemplo de Fluxo de Login (login.html):
        No JavaScript associado ao formulário de login, capture o evento de submit.
        Previna o comportamento padrão do formulário (event.preventDefault()).
        Pegue os valores de e-mail e senha dos campos de input.
        Faça uma requisição POST para a API:
        JavaScript

        async function handleLogin(event) {
          event.preventDefault();
          const email = document.querySelector('#email').value; // Adapte os seletores
          const password = document.querySelector('#senha').value;

          try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
              // Exibir mensagem de erro para o usuário, ex: data.msg
              alert(data.msg);
              return;
            }

            // Sucesso! Armazene o token e redirecione o usuário.
            localStorage.setItem('authToken', data.token);
            window.location.href = '/painel/usuario/usuario.html'; // Redireciona para o painel

          } catch (error) {
            console.error('Erro ao fazer login:', error);
            alert('Ocorreu um erro. Tente novamente.');
          }
        }

        Armazenar o Token: localStorage.setItem('authToken', data.token); é a parte crucial. O token retornado pelo backend é salvo no navegador para ser usado em requisições futuras.

Passo 2: Proteger Rotas (Implementar Autenticação de Verdade)

Atualmente, qualquer um pode acessar GET /api/courses. Mas para ver dados do perfil ou se inscrever em um curso, o usuário precisa estar logado. Para isso, criamos um middleware de autenticação.

    Crie o Middleware (src/middleware/authMiddleware.js):
    Primeiro, crie uma nova pasta src/middleware. Dentro dela, crie o arquivo:
    JavaScript

const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function(req, res, next) {
  // Pega o token do header da requisição
  const token = req.header('Authorization');

  // Verifica se não há token
  if (!token) {
    return res.status(401).json({ msg: 'Nenhum token, autorização negada.' });
  }

  // O token vem no formato "Bearer <token>", então removemos o "Bearer "
  const actualToken = token.split(' ')[1];
  if (!actualToken) {
    return res.status(401).json({ msg: 'Formato de token inválido.' });
  }

  // Verifica o token
  try {
    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
    req.user = decoded.user; // Adiciona o payload do usuário (que contém o ID) ao objeto da requisição
    next(); // Passa para a próxima função (o controller)
  } catch (err) {
    res.status(401).json({ msg: 'Token não é válido.' });
  }
};

Use o Middleware nas Rotas Protegidas:
Agora, você pode proteger qualquer rota simplesmente adicionando o middleware antes da função do controller. Por exemplo, vamos criar uma rota para buscar os dados do perfil do usuário logado:

    Em src/routes/auth.js:
    JavaScript

    // ... outras importações
    const authMiddleware = require('../middleware/authMiddleware');
    const { getUserProfile } = require('../controllers/authController'); // Precisamos criar essa função

    // ... rotas de login/register

    // @route   GET api/auth/profile
    // @desc    Obtém o perfil do usuário logado
    // @access  Privado
    router.get('/profile', authMiddleware, getUserProfile);

Crie a Função no Controller (authController.js):
JavaScript

// ... outras funções

exports.getUserProfile = async (req, res) => {
    try {
        // O ID do usuário foi adicionado ao 'req' pelo middleware
        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['password'] } // Exclui a senha da resposta
        });
        res.json(user);
    } catch (err) {
        res.status(500).send('Erro no servidor');
    }
};

No Frontend: Para chamar essa rota, a requisição fetch deve incluir o token no cabeçalho:
JavaScript

    const token = localStorage.getItem('authToken');

    const response = await fetch('http://localhost:5000/api/auth/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

Passo 3: Expandir as Funcionalidades (Novas Rotas e Models)

O projeto precisa de mais funcionalidades, como as vistas no painel do usuário.

    Perfil do Usuário (painel/usuario/usuario.html): A rota GET /api/auth/profile que criamos acima já fornece os dados para esta página.

    Meus Cursos e Progresso (painel/cursos/cursos.html, painel/progresso/progresso.html):
    Isso requer um relacionamento entre Users e Courses. A melhor forma é criar um novo modelo para as matrículas.

        Crie o Modelo Enrollment.js (src/models/Enrollment.js):
        JavaScript

        const { DataTypes } = require('sequelize');
        const sequelize = require('../config/database');

        const Enrollment = sequelize.define('Enrollment', {
          id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
          progress: { type: DataTypes.INTEGER, defaultValue: 0 }, // Progresso em %
          status: { type: DataTypes.STRING, defaultValue: 'ativo' } // ex: ativo, concluido
        });

        // Aqui definimos os relacionamentos
        // User.belongsToMany(Course, { through: Enrollment });
        // Course.belongsToMany(User, { through: Enrollment });

        Nota: As linhas de relacionamento devem ser definidas em um arquivo central que importa todos os modelos, para evitar dependências circulares.

        Crie Novas Rotas e Controllers:
            POST /api/courses/:courseId/enroll: Para um usuário se matricular em um curso (protegida com middleware).
            GET /api/users/my-courses: Para listar todos os cursos em que o usuário logado está matriculado, incluindo o progresso (protegida).
            PUT /api/enrollments/:enrollmentId/progress: Para atualizar o progresso de um curso (protegida).

    Configurações (painel/configurações/configurações.html):
        PUT /api/users/profile: Para atualizar nome e e-mail.
        PUT /api/users/change-password: Para alterar a senha.

Passo 4: Validação de Dados e Tratamento de Erros

    Validação: Para garantir que os dados enviados pelo frontend (ex: e-mail, senha) estão no formato correto, use uma biblioteca como express-validator. Isso previne erros e ataques.
    Tratamento de Erros: Crie um middleware de tratamento de erros centralizado para evitar repetir blocos try...catch em todos os controllers, deixando o código mais limpo.

