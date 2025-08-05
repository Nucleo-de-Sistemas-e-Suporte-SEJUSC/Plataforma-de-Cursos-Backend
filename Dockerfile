# Imagem base
FROM node:20-alpine AS base

# Instalar dependências do sistema
RUN apk add --no-cache dumb-init

# Criar usuário não-root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodeuser -u 1001

# Diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências (sem dev dependencies e sem husky)
RUN npm ci --omit=dev --ignore-scripts && npm cache clean --force

# Copiar código da aplicação
COPY --chown=nodeuser:nodejs . .

# Mudar para usuário não-root
USER nodeuser

# Variável de ambiente
ENV NODE_ENV=production

# Expor porta
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Comando para iniciar a aplicação usando dumb-init
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "src/server.js"]
