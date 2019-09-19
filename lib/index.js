const Commander = require('commander');
const Main = require('./controllers/main')

async function main() {
 
  Commander.version("v0.0.5")
    .option('--adicionar', "add comando")
    .option('--nome [value]', "Nome do projeto")
    .option('--diretorio [value]', "Diretorio do projeto")
    .option('--comando [value]', "Comando a ser iniciado ou execultado")
    .option('--novoComando', 'Adicionar um novo comando a um projeto já salvo')
    .option('--listar', "Listar um projeto")
    .option('--removerComando', 'Remover um comando do projeto')
    .option('--remover', 'Remover um projeto')

    .option('--run', 'Subir scripts de um projeto')
    .parse(process.argv)

  const main = new Main(Commander);

  //node index.js --adicionar --nome deliveri --diretorio "teste" --comando "nodemon"
  //clip --adicionar --nome deliveri --diretorio "teste" --comando "nodemon"
  if (Commander.adicionar) main.adicionar();

  //listar todos: node index.js --listar 
  //listar expecifico: node index.js --listar --nome "teste"
  //########################################################
  //listar todos: clip --listar 
  //listar expecifico: clip --listar --nome "teste"

  if (Commander.listar) main.listar();

  //node index.js --novoComando --nome deliveri --diretorio "teste" --comando "pwd"
  //clip --novoComando --nome deliveri --diretorio "teste" --comando "pwd"
  if (Commander.novoComando) main.novoComando();

  //node index.js --removerComando --nome "teste" --comando "pwd"
  //clip --removerComando --nome "teste" --comando "pwd"
  if (Commander.removerComando) main.removerComando();

  //node index.js --remover --nome deliveri
  //clip --remover --nome deliveri
  if (Commander.remover) main.remover();

  //node index.js --run --nome deliveri
  //clip --run --nome deliveri
  if (Commander.run) main.run();

}

main();