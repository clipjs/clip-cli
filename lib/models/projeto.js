class Projeto {
    /*
    {
        nome:'Deliveri',
        scripts:[{
            diretorio:'/home/matheus/Documentos/workspace/deliveri.com.br/api.deliveri.com.br',
            comando:'nodemon'
        }]
    }
    */

    constructor({ nome, diretorio, comando, editor=false }) {
        this.nome = nome;
        this.scripts = [{ diretorio, comando }];
        this.editor = editor;
    }
}

module.exports = Projeto;