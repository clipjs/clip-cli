var readFile = require('./readFile.js'),
	sh = require('./sh.js'),
    exec = require('child_process').exec;

 
module.exports.principal = function (opcao,arguments){
	let length = arguments.length;

		switch(opcao){
			
			case 'help':
			case '-h':
				console.log('Blugy 1.0 \n');
				console.log("######################\n");
				console.log('Comands \n');
				console.log('r      rodar projeto');
				console.log('-c nomeProjeto diretorio commando   =   Configurar Projeto');
				console.log('\n');
			break;

			case '-r':

				//	console.log('gerar arquivos SH do projeto selecionado e rodar');
				 if (length == 2) {
				 		let nomeProjeto  = arguments[1];
				 		dataJson = readFile.getData();

				 		
						//console.log(dataJson);
						  for (var i = 0; i < dataJson.length; i++) {
								
								if (dataJson[i][nomeProjeto]) {
									console.log(dataJson[i][nomeProjeto]);
									console.log('roda comandos');

									var yourscript = exec(`sh ${__dirname}/core_sh/${nomeProjeto}/${nomeProjeto}.sh`,(error, stdout, stderr) => {			           
											            console.log(`${stdout}`);
											            console.log(`${stderr}`);
											            if (error !== null) {
											                console.log(`exec error: ${error}`);
											            }
											        });
									

								}else{
							       console.log('Projeto ainda não foi configurado');
								}
						
						  }


				 }else{
				 	console.log('informe projeto para rodar');
				 }
		



		
			break;

			case '-c':
				//nome Projeto
				//diretorio 
				//comando
				 dataJson = readFile.getData(); 

				if (length == 4) {

					let nomeProjeto  = arguments[1];
					let diretorio = arguments[2];
					let comando = arguments[3];
					let jsonArguments = {comando,diretorio};

						dataJson = readFile.getData();
						
						if (dataJson.length) {
						  for (var i = 0; i < dataJson.length; i++) {	
							if (dataJson[i][nomeProjeto]) {
								dataJson[i][nomeProjeto].push(jsonArguments);
							}else{
						    	dataJson.push({[nomeProjeto]:[jsonArguments]});
							}
						  }
						 }else{
						 	   	dataJson.push({[nomeProjeto]:[jsonArguments]});
						 }

						 	sh.create(nomeProjeto,jsonArguments);
						  	readFile.saveData(dataJson);
							console.log('Comando inserido, rode clip -r nomeProjeto para iniciar');
									
				}else{
					console.log('argumentos invalidos');
				}
				

			break;

			default:
				console.log('Blugy 1.0 \n');
				console.log("######################\n");
				console.log('Comands \n');
				console.log('r      rodar projeto');
				console.log('c      Configurar Projeto');
				console.log('\n');
			break;

		}


	}
