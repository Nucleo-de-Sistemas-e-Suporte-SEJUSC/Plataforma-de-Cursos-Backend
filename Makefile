.PHONY: help build up down logs test lint format clean

# Variáveis
DOCKER_COMPOSE = docker-compose
NPM = npm

help: ## Mostra esta ajuda
	@echo "Comandos disponíveis:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

install: ## Instala as dependências
	$(NPM) install

build: ## Constrói as imagens Docker
	$(DOCKER_COMPOSE) build

up: ## Sobe os serviços
	$(DOCKER_COMPOSE) up -d

down: ## Para os serviços
	$(DOCKER_COMPOSE) down

logs: ## Mostra os logs
	$(DOCKER_COMPOSE) logs -f

test: ## Executa os testes
	$(NPM) test

test-coverage: ## Executa os testes com coverage
	$(NPM) run test:coverage

test-watch: ## Executa os testes em modo watch
	$(NPM) run test:watch

lint: ## Verifica o código com ESLint
	$(NPM) run lint

lint-fix: ## Corrige problemas de lint automaticamente
	$(NPM) run lint:fix

format: ## Formata o código com Prettier
	$(NPM) run format

format-check: ## Verifica formatação sem alterar arquivos
	$(NPM) run format:check

dev: ## Inicia o servidor em modo desenvolvimento
	$(NPM) run dev

start: ## Inicia o servidor em modo produção
	$(NPM) start

clean: ## Remove containers, volumes e imagens não utilizadas
	$(DOCKER_COMPOSE) down -v --remove-orphans
	docker system prune -f

setup: ## Configuração inicial do projeto
	$(NPM) install
	cp env.example .env
	@echo "⚠️  Não esqueça de configurar as variáveis no arquivo .env"

ci: ## Executa pipeline de CI (lint + format + test)
	$(NPM) run ci

docker-up: build up ## Constrói e sobe os serviços Docker

docker-logs-app: ## Mostra logs apenas da aplicação
	$(DOCKER_COMPOSE) logs -f app

docker-logs-mysql: ## Mostra logs apenas do MySQL
	$(DOCKER_COMPOSE) logs -f mysql

docker-shell: ## Acessa o shell do container da aplicação
	$(DOCKER_COMPOSE) exec app sh

mysql-shell: ## Acessa o shell do MySQL
	$(DOCKER_COMPOSE) exec mysql mysql -u root -p plataforma_cursos
