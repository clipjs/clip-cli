var readFile = require('./readFile.js'),
	sh = require('./sh.js'),
    exec = require('child_process').exec;

 
module.exports.principal = function (opcao,arguments){
	let lengthArguments = arguments.length;
	let dataJson = readFile.getData(); 

		switch(opcao){
			
			case 'help':
				console.log('Clip 1.0.0 \n'); 
				console.log('Comandos: \n');
				console.log('config nomeAmbiente diretorio comando = Para configurar um ambiente\n');
				console.log('list = Para listar todos ambientes\n');
				console.log('run ambiente =  Para inicar um ambiente\n\n\n');

			break;

			case 'run':

				//	console.log('gerar arquivos SH do projeto selecionado e rodar');
				 if (lengthArguments == 2) {


				 		let nomeProjeto  = arguments[1];
				 		dataJson = readFile.getData();
				 		let lengthProjetos = dataJson.length;

				 		if (lengthProjetos > 0) {

						//console.log(dataJson);
						  for (var i = 0; i < dataJson.length; i++) {
								
								if (dataJson[i][nomeProjeto]) {
									//console.log(dataJson[i][nomeProjeto]);
									//console.log('roda comandos');
									//var yourscript = 
									exec(`sh ${__dirname}/../core_sh/${nomeProjeto}/${i}.sh`,(error, stdout, stderr) => {			           
											            console.log(`${stdout}`);
											            console.log(`${stderr}`);
											            if (error !== null) {
											                console.log(`exec error: ${error}`);
											            }
											        });
									

								}else{
							       console.log('Ambiente ainda não foi configurado'); 
							       console.log('Rode clip config para iniciar um ambiente');
								}
						
						  }

				 		}else{
					       	console.log('Ambiente ainda não foi configurado'); 
							console.log('Rode clip config para iniciar um ambiente');
		 		}


				 }else{
				 	console.log('Ambiente ainda não foi configurado'); 
					console.log('Rode clip config para iniciar um ambiente')
				 }
		



		
			break;

			case 'config':
				//nome Projeto
				//diretorio 
				//comando

				if (lengthArguments >= 4) {

					let nomeProjeto  = arguments[1];
					let diretorio = arguments[2];
					let comando = arguments[3];
					let jsonArguments = {comando,diretorio};

						dataJson = readFile.getData();
						let n = 0;
						if (dataJson.length) {
						  for (var i = 0; i < dataJson.length; i++) {	
							if (dataJson[i][nomeProjeto]) {
								dataJson[i][nomeProjeto].push(jsonArguments);
							}else{
						    	dataJson.push({[nomeProjeto]:[jsonArguments]});
							}
							n++;
						  }
						 }else{
						 	   	dataJson.push({[nomeProjeto]:[jsonArguments]});
						 }

						 	sh.create(nomeProjeto,jsonArguments,n);
						  	readFile.saveData(dataJson);
							console.log(`Comando inserido no ambiente ${nomeProjeto}, rode clip run nomeProjeto para iniciar o ambiente`);
									
				}else{
					console.log('Argumentos invalidos');
					console.log("Exemplo do comando: clip config nomeAmbiente diretorio comando");
				}
				

			break;

			case 'list':
				let lengthAmbientes = dataJson.length;
					console.log('Listar todos os Ambientes');
					console.log(`Numero de ambientes:  ${lengthAmbientes}\n\n`);
				
				for (var i = lengthAmbientes - 1; i >= 0; i--) {
					console.log(dataJson[i]);						
				}


			break;


			default:
				console.log('Clip 1.0.0 \n'); 
				console.log('Comandos: \n');
				console.log('config nomeAmbiente diretorio comando = Para configurar um ambiente\n');
				console.log('list = Para listar todos ambientes\n');
				console.log('run ambiente =  Para inicar um ambiente\n\n\n');
			break;

		}


	}
