# Teste técnico Sitcon
Este teste técnico é uma aplicação web para gerenciamento médico que utiliza npm e React.js no frontend e Node.js com Express no backend.

## Como Executar o Projeto

### Pré-requisitos
- Node.js
- npm
- MySQL 8.0

### Passos para Execução

1. Clone o repositório do projeto:

```bash
git clone https://github.com/seu-usuario/nome-do-repositorio.git
```
2. Instale as dependências do frontend:
```bash
cd client
npm install
```

3. Instale as dependências do backend:
```bash
cd ..
cd server
npm install
```
4. Configure o banco de dados MySQL 8.0 de acordo com as configurações do projeto. O arquivo .sql está na raiz do repositório.
5. Inicie o servidor backend:
```bash
npm start
```
6. Inicie o servidor frontend:
```bash
npm run dev
```
## Estrutura do Banco de Dados

O banco de dados utilizado é o MySQL 8.0 e possui as seguintes tabelas:

### Tabela: pacientes
- `nomePaciente`: Nome do paciente
- `cpf`: CPF do paciente
- `dataNasc`: Data de nascimento do paciente
- `status`: Status do paciente

### Tabela: procedimentos
- `descricao`: Descrição do procedimento
- `tipo_id`: ID do tipo de procedimento
- `status`: Status do procedimento

### Tabela: profissional
- `id`: ID do profissional
- `nome`: Nome do profissional
- `status`: Status do profissional

### Tabela: solicitacoes
- `id`: ID da solicitação
- `nomePaciente`: Nome do paciente
- `cpf`: CPF do paciente
- `tipoSolicitacao`: Tipo de solicitação
- `procedimentos`: Procedimentos solicitados
- `data`: Data da solicitação
- `hora`: Hora da solicitação

### Tabela: tiposolicitacao
- `id`: ID do tipo de solicitação
- `descricao`: Descrição do tipo de solicitação
- `status`: Status do tipo de solicitação
