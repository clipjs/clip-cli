const { readFile, writeFile } = require('fs');
const { promisify } = require('util')

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

class Database {
    constructor() {
        this.NOME_ARQUIVO = `${__dirname}/../workspaces.json`;
    }

    async obterDadosArquivo() {
        const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf8')
        return JSON.parse(arquivo.toString());
    }

    async escreverArquivo(dados) {
        await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados))
        return true;
    }


    async cadastrar(projeto) {
        const dados = await this.obterDadosArquivo();
        const dadosFinais = [ ...dados, projeto ];
        const indice = dados.findIndex(item =>item.nome === projeto.nome)

        if(indice === 0){
            return true; 
        }

        const resultado = await this.escreverArquivo(dadosFinais);
        return resultado;

    }

    async listar(nome) {
        const dados = await this.obterDadosArquivo();
        const dadosFiltrados = dados.filter(item => (nome ? (item.nome === nome) : true))

        return dadosFiltrados;
    }


    async atualizar(nome, scripts){
        const dados = await this.obterDadosArquivo();
        const indice = dados.findIndex(item=>item.nome == nome)

        if(indice == -1){
            throw Error('O Projeto informado nao existe')
        }
         
        const atual = dados[indice];
        let objetoAtualizar = atual;
            objetoAtualizar.scripts = scripts;
            dados.splice(indice,1)

        return await this.escreverArquivo([...dados, objetoAtualizar]);
     
    }

 
    async remover(projeto) {

        if (!projeto) {
            //throw Error('O projeto precisa ser informado')
            console.log('O projeto precisa ser informado');
            return;
        }
        const dados = await this.obterDadosArquivo();
        const indice =  dados.findIndex(item=>item.nome === projeto);

        if(indice === -1){
            //throw Error('O projeto informado não existe')
            console.log('O projeto informado não existe');
            return;
        }
 
        dados.splice(indice,1)
        return await this.escreverArquivo(dados);
        return false;

 
    }


    async removerScript (projeto, script) {

        if (!projeto) {
            throw Error('O projeto precisa ser informado')
        }
        const dados = await this.obterDadosArquivo();
        const indiceProjeto =  dados.findIndex(item=>item.nome === projeto);

        if(indiceProjeto === -1){
           // throw Error('O projeto informado não existe')
           console.log('O projeto informado não existe');
           return;
        }

        let [projetoSelecionado] = dados.filter(item=>item.nome === projeto);
        const scripts = projetoSelecionado.scripts;
        const indiceScript = scripts.findIndex(item=>item.comando === script);

        if(indiceScript === -1){
           // throw Error('O comando de script não existe!')
           //console.log('O comando de script não existe!');
           return true;
        }

        scripts.splice(indiceScript,1);
        projetoSelecionado = {...projetoSelecionado, scripts};
        dados.splice(indiceProjeto,1)

        return await this.escreverArquivo([...dados, projetoSelecionado]);
    }


}

module.exports = new Database()