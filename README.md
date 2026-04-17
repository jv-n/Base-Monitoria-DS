# Monitoria de DS - 16 de Abril

Código da monitoria do dia 16/04/2026 explicando sobre backend e integração com axios
Se quiserem, podem utilizar esse repositório como base para o projeto de vocês, mas lembrem que: O SQLite é mais dificil de ser hosteado em um projeto compartilhado, sugiro utilizarem o PostgreSQL com o Prisma, aí substituam o ```DATABASE_URL``` no .env e o database provider no ```schema.prisma```

## Primeiros passos
Utilizei o WSL (terminal Linux no Windows) para facilitar, sugiro para quem tá utilizando Windows fazer o mesmo, tutorial legal de como baixar aqui: [Instalação WS](https://learn.microsoft.com/pt-br/windows/wsl/install).

### Baixando o pnpm e node:
- Se você já tem node e pnpm baixado, pode pular essa parte:

Baixe o Node e o pnpm com esses comandos:
```bash
#Instala o fnm
curl -o- https://fnm.vercel.app/install | bash

# Instala o Node.js:
fnm install 24

# Verifica a versão do Node.js:
node -v # Deve printar "v24.15.0".

# Instale o pnpm:
corepack enable pnpm

# Verifique o pnpm
pnpm -v
```

## Rodando os código
### Rodando o server (primeiro):
Primeiro é preciso baixar as dependências e o banco de dados.

1. Crie um arquivo .env com essas infos:
```.env
PORT = 3001
DATABASE_URL="file:./dev.db"
```

2. Garanta que você tem o SQLite baixado:
```bash
sqlite3 --version 
#Se usa Ubuntu, ele vem com uma versão estavél baixada já 
```
    * Caso não tenha baixado rode:
```bash
    sudo apt update
    sudo apt install sqlite3
    sqlite3 --version
```

Como comentei, o SQLite é mais fácil de ser setado (basicamente só precisa baixar) mas não é o melhor para permanência de dados em projetos compartilhados.

3. Agora baixe as dependências

No server:
```bash
    cd server
    pnpm i
```
Após baixar todas as depdências, rode esses scripts:
Esse primeiro script cria o banco de dados, migra o schema para esse BD e gera o client do Prisma
```bash
    pnpm migration
     #pnpm dlx prisma migrate dev && pnpm dlx prisma generate     
```
Esse povoa o banco de dados com alguns dados que eu criei, fique livre pra mexer e utilizar os seus
```bash
    pnpm seed
     #pnpm dlx prisma db seed     
```
Agora pode rodar o back com esse script:
```bash
    pnpm run dev
    #npx tsx src/index.ts
```
Pode testar as chamadas de requisição com algum aplicativo como Postman, Insomnia, ThunderClient e outros, lembrando dos métodos e das rotas

### Rodando o client:
Em outro terminal vá ao client, baixe as dependências e rode o Next:
```bash
cd ../client
pnpm i
pnpm run dev
```

Acesse em http://localhost:3000

## Exemplos de rotas da API

- Listar usuários:

    GET http://localhost:3001/users

- Criar usuário:

    POST http://localhost:3000/users
    
    body: json

    {
        "name": "Any",
        "email": "any@mail.com"
    }
- Buscar usuário com ID:
    
    GET http://localhost:3001/users/:id

