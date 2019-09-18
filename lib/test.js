const {
    deepEqual,
    ok
} = require('assert')

const database = require('./database')

const DEFAULT_ITEM_CADASTRAR = {
    nome:'Deliveri',
    scripts:[{
        diretorio:'/home/matheus/Documentos/workspace/deliveri.com.br/api.deliveri.com.br',
        comando:'nodemon'
    }]
};

describe('Suite de manipulação de projetos', ()=>{
 /**
    before(async ()=>{
        await database.cadastrar(DEFAULT_ITEM_CADASTRAR);  
        await database.atualizar(DEFAULT_ITEM_ATUALIZAR);    
    })
  */

        it("Cadastrar um projeto", async ()=>{
            const expected = DEFAULT_ITEM_CADASTRAR; 
            const resultado = await database.cadastrar(DEFAULT_ITEM_CADASTRAR);
            const [actual] =  await database.listar(DEFAULT_ITEM_CADASTRAR.nome);
            
            deepEqual(actual, expected);
        });

        it("Listar projetos", async ()=>{
            const expected = DEFAULT_ITEM_CADASTRAR;
            const [resultado] = await database.listar(expected.nome)

            deepEqual(resultado, expected);
        });
     



     
        it('Adiconar um novo comando ao projeto por nome do projeto', async () =>{
            let expected = { ...DEFAULT_ITEM_CADASTRAR };
            
            const atualizar = [
                    ...expected.scripts,
                    {
                        comando:'npm start',
                        diretorio:'/home/matheus/Documentos/workspace/deliveri.com.br/coletor_entregador'
                       
                    }
                ];

                expected.scripts = atualizar;

            await database.atualizar(DEFAULT_ITEM_CADASTRAR.nome, atualizar);
            const [resultado] = await database.listar(DEFAULT_ITEM_CADASTRAR.nome)

            deepEqual(resultado, expected);
          
        })
  


        it('Deve remover um comando do projeto por nome', async () =>{
            const expected = true;
            const [scriptsProjeto] = DEFAULT_ITEM_CADASTRAR.scripts;

            const resultado = await database.removerScript(DEFAULT_ITEM_CADASTRAR.nome, scriptsProjeto.comando);

            deepEqual(resultado, expected)
            
        })

        
       
        it('Deve remover um projeto por nome', async () =>{
            const expected = true;
            const resultado = await database.remover(DEFAULT_ITEM_CADASTRAR.nome);

            deepEqual(resultado, expected)
            
        })
        

});