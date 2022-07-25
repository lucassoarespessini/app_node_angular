# CRUD de Produto

## Execute o sistema
Execute o seguinte comando no repositório:
```bash
docker-compose up -d
```
Esse comando pode demorar 13 minutos, pois o Docker irá puxar as imagens MySQL, Node.js e Nginx (se sua máquina não tiver antes). Estará finalizado, quando printar as seguinte mensagem:

```bash
Creating database ... done
Creating backend  ... done
Creating frontend ... done
```

Com a configuração do <em>.env</em> que tem as seguintes variaveis setadas:
```bash
MYSQLDB_LOCAL_PORT=3307
NODE_LOCAL_PORT_BACKEND=6868
NODE_LOCAL_PORT_FRONTEND=80
```
O banco MySQL está disponível em localhost:3307, o projeto em Node.js em backend estará disponível em localhost:6868 e o projeto frontend em localhost:80.

Para a comunicação do frontend e backend, foi setado algumas variaveis de configuração de ambente nos arquivos <em>frontend/src/environments/environment.ts</em> e <em>frontend/src/environments/environment.prod.ts</em>:

```js
export const environment = {
  production: true,
  LOCAL_HOST: "localhost",
  LOCAL_PORT: 6868
};
```

Nessas condições, o projeto vai está rodando em http://localhost/produto-listagem. 

## Parar o sistema
Parar todos os contêineres em execução com o comando:
```bash
docker-compose down
```

Se você precisar parar e remover todos os contêineres, redes e todas as imagens usadas por qualquer serviço no arquivo <em>docker-compose.yml</em>, use o comando:
```bash
docker-compose down --rmi all
```
