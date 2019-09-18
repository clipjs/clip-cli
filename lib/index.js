const Commander = require('commander')

function main() {
    Commander.version("v1")
        .option('-a, --adicionar', "add comando")
            .option('-p, --projeto [value]', "Nome do projeto")
            .option('-d, --dir [value]', "Diretorio do projeto")
            .option('-c, --comando [value]', "Comando a ser iniciado ou execultado")


        .option('-l, --listar', "Listar um projeto")

        .option('-r', '--remover [value]', 'Remover um projeto')
        .option('-rc','--removerComando [value]', 'Remover um comando do projeto')
        .option('-a', '--atualizar [value]', 'Atualizar um projeto pelo id')


        .parse(process.argv)


        if (Commander.adicionar) {
            console.log('adicionar um projeto')
        }

        if(Commander.listar){
            console.log('listar projetos');
        }

        if(Commander.remover){
            console.log('remover um projeto');
        }

        if(Commander.atualizar){
            console.log('atualizar um projeto');
        }



}