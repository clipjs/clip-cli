const config = (arguments,dataJson,readFile) => {
    let lengthArguments = arguments.length;

    if (lengthArguments >= 4) {
 
        let nomeProjeto  = arguments[1];
        let diretorio = arguments[2];
        let comando = arguments[3];
        let ArgumentosComandos;

        if(nomeProjeto.includes('/')){

            console.log('Argumento invalido!\n');
            console.log('Antes do diretorio informe o nome do ambiete.');

        }else{

            if (lengthArguments > 4) {
                let  quantidadeArumentos = lengthArguments-3;
         
                    delete arguments[0];
                    delete arguments[1];
                    delete arguments[2];

                    ArgumentosComandos = arguments.filter(()=>{ return true });
                
                     comando = ArgumentosComandos.join(' ');
            
            }

            
            dataJson = readFile.getData();
                let jsonArguments = {comando,diretorio};
                let n = 0;

            if (dataJson.length) {

                  for (var j = 0; j < dataJson.length; j++) {	
                
                    if (dataJson[j][nomeProjeto]) {
                        dataJson[j][nomeProjeto].push(jsonArguments);
                        n = dataJson[j][nomeProjeto].length;
                    }else{
                        n = 0;
                    }
            
                }

             }else{
                 dataJson.push({[nomeProjeto]:[jsonArguments]});
                 n = 1;
             }

             if(!n){
                dataJson.push({[nomeProjeto]:[jsonArguments]});
             }

         
          readFile.saveData(dataJson);
             console.log(`Comando inserido no ambiente ${nomeProjeto}, rode clip run <nomeProjeto> para iniciar o ambiente`);
                
        }

    }else{
        console.log('Argumentos invalidos');
        console.log("Exemplo do comando: clip config <nomeAmbiente> <diretorio> <comando>");
    }
}

module.exports = config;