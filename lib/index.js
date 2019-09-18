const Commander = require('commander');
const Main = require('./controllers/main')

async function main() {
    Commander.version("v0.0.5")
        .option('-a, --adicionar', "add comando")
        .option('-n, --nome [value]', "Nome do projeto")
        .option('-d, --diretorio [value]', "Diretorio do projeto")
        .option('-c, --comando [value]', "Comando a ser iniciado ou execultado")
        .option('-nc, --novoComando', 'Adicionar um novo comando a um projeto já salvo')
        .option('-l, --listar', "Listar um projeto")
        .option('-rc, --removerComando', 'Remover um comando do projeto')
        .option('-r, --remover', 'Remover um projeto')

        .option('--run', 'Subir scripts de um projeto')
        .parse(process.argv)

        const main = new Main(Commander);

        //node index.js -a --nome deliveri --diretorio "teste" --comando "nodemon"
        //clip -a --nome deliveri --diretorio "teste" --comando "nodemon"
        if (Commander.adicionar) { main.adicionar() }

        //listar todos: node index.js -l 
        //listar expecifico: node index.js -l -n "teste"

        //listar todos: clip -l 
        //listar expecifico: clip -l -n "teste"

        if(Commander.listar){  main.listar() }

        //node index.js --novoComando --nome deliveri --diretorio "teste" --comando "pwd"
        //clip --novoComando --nome deliveri --diretorio "teste" --comando "pwd"
        if(Commander.novoComando){  main.novoComando() }

        //node index.js --removerComando --nome "teste" --comando "pwd"
        //clip --removerComando --nome "teste" --comando "pwd"
        if(Commander.removerComando){   main.removerComando() }

        //node index.js -r --nome deliveri
        //clip -r --nome deliveri
        if(Commander.remover){
          main.remover()
        }

        //node index.js --run --nome deliveri
        //clip --run --nome deliveri
        if(Commander.run){
            main.run()
        }

}

main();