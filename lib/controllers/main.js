const database = require('../models/database');
const Projeto = require('../models/projeto');

const Run = require('./run');
const Log = require('./log');


class Main {

    constructor(Commander) {
        this.projeto = new Projeto(Commander)
    }

    async adicionar() {
        const resultado = await database.cadastrar(this.projeto);
        if (!resultado) {
            console.error("Ops! Alguma coisa aconteceu...")
            return;
        }

        console.log(`O script foi adicionado com sucesso ao projeto ${this.projeto.nome}`);
    }

    async listar() {
        const resultado = await database.listar(this.projeto.nome)
        if (resultado.length == 0) {
            console.log("Nenhum projeto foi encontrado com esse nome!");
            return;
        }

        console.log(JSON.stringify(resultado));
    }

    async novoComando() {
        const [projetoAtual] = await database.listar(this.projeto.nome)
        if (projetoAtual) {
            const novoScript = [...projetoAtual.scripts, ...this.projeto.scripts]
            const resultado = await database.atualizar(this.projeto.nome, novoScript);
            if (!resultado) {
                console.error("Ops! Alguma coisa aconteceu...")
                return;
            }

            console.log(`Novo comando adicionado ao projeto ${this.projeto.nome}`);

        } else {
            console.log('Nenhum projeto foi encontrado com esse nome!');
            return;
        }
    }

    async removerComando() {

        const resultado = await database.removerScript(this.projeto.nome, this.projeto.scripts[0].comando);
        if (!resultado) {
            console.error("Ops! Alguma coisa aconteceu...")
            return;
        }

        console.log(`Comando ${this.projeto.scripts[0].comando} removido do projeto ${this.projeto.nome}`);
    }

    async remover() {
        const resultado = await database.remover(this.projeto.nome);
        if (!resultado) {
            console.error("Ops! Alguma coisa aconteceu...")
            return;
        }

        console.log(`Projeto removido com sucesso!`);
    }



    async run() {

        const [resultado] = await database.listar(this.projeto.nome)
        if (!resultado) {
            console.error("Ops! Projeto não encontrado...")
            return;
        }

            
        Run.start(resultado.scripts);
        //Log.watching();

    }

}


module.exports = Main;