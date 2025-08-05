#!/bin/bash

echo "🚀 Configurando ambiente de desenvolvimento..."

# Verificar se o Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não está instalado. Por favor, instale o Node.js 18+ primeiro."
    exit 1
fi

# Verificar se o npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ npm não está instalado. Por favor, instale o npm primeiro."
    exit 1
fi

echo "✅ Node.js e npm encontrados"

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

# Configurar Husky
echo "🔧 Configurando Husky..."
npm run prepare

# Tornar os hooks executáveis
chmod +x .husky/pre-commit
chmod +x .husky/pre-push

# Verificar se o arquivo .env existe
if [ ! -f .env ]; then
    echo "📝 Criando arquivo .env..."
    cp env.example .env
    echo "⚠️  Por favor, configure as variáveis de ambiente no arquivo .env"
else
    echo "✅ Arquivo .env já existe"
fi

# Executar linting e formatação
echo "🔍 Executando linting e formatação..."
npm run lint:fix
npm run format

echo "✅ Setup concluído!"
echo ""
echo "📋 Próximos passos:"
echo "1. Configure as variáveis de ambiente no arquivo .env"
echo "2. Configure o banco de dados MySQL"
echo "3. Execute 'npm run dev' para iniciar o servidor"
echo "4. Execute 'npm test' para verificar se tudo está funcionando"
echo ""
echo "🎉 Ambiente configurado com sucesso!"
