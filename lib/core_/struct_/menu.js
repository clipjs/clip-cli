var readFile = require('./readFile.js'),
	fs = require('fs'),  
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
 				 if (lengthArguments == 2) {

				 		let ambiente  = arguments[1];
				 		dataJson = readFile.getData();
				 		let lengthProjetos = dataJson.length;
						 
				 		if (lengthProjetos > 0) {

						  for (var i = 0; i < dataJson.length; i++) {
								
								if (dataJson[i][ambiente]) {
									let lengthComandos = dataJson[i][ambiente].length;

								        for (var j = lengthComandos - 1; j >= 0; j--) {

							       	 		exec(`cd ${dataJson[i][ambiente][j]['diretorio']} && ${dataJson[i][ambiente][j]['comando']} >> ${__dirname}/../clip.log`,(error, stdout, stderr) => {		 // > /home/matheus/Documentos/apps_node/clip-cli/lib/core_/clip.log	           
									            console.log(`Clip Iniciou seu ambiente com sucesso!!!`);
									     		const fileLog = '/home/matheus/Documentos/apps_node/clip-cli/lib/core_/clip.log';
									     		 

									     		fs.readFile (fileLog, 'utf8',(err, dados) => { 
												    if (err) throw err; 
												 	console.log(dados); 
												}); 

									
									            if (error !== null) {
									                console.log(`exec error: ${error}`);
									            }
									        });

								        }

								}else{
							       console.log('Ambiente ainda não foi configurado'); 
							       console.log('Rode clip config para iniciar um ambiente');
									return;
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

				if (lengthArguments >= 4) {

					let nomeProjeto  = arguments[1];
					let diretorio = arguments[2];
					let comando = arguments[3];
					let ArgumentosComandos = [];

					if(nomeProjeto.includes('/')){

						console.log('Argumento invalido!\n');
						console.log('Antes do diretorio informe o nome do ambiete.');

					}else{

						if (lengthArguments > 4) {
							let  quantidadeArumentos = lengthArguments-4;
							for (var i = lengthArguments - 1; i >= 4; i--) {
								comando = comando+' '+arguments[i];
							}
						}

						dataJson = readFile.getData();
						let n = 0;
						let jsonArguments = {comando,diretorio};

						if (dataJson.length) {
						  for (var i = 0; i < dataJson.length; i++) {	
							if (dataJson[i][nomeProjeto]) {
								dataJson[i][nomeProjeto].push(jsonArguments);
								n = dataJson[i][nomeProjeto].length;
							}else{
						    	dataJson.push({[nomeProjeto]:[jsonArguments]});
								n = 1;
							}
						  }
						 }else{
						 	dataJson.push({[nomeProjeto]:[jsonArguments]});
						 	n = 1;
						 }

						readFile.saveData(dataJson);
						console.log(`Comando inserido no ambiente ${nomeProjeto}, rode clip run <nomeProjeto> para iniciar o ambiente`);
							
					}

				}else{
					console.log('Argumentos invalidos');
					console.log("Exemplo do comando: clip config <nomeAmbiente> <diretorio> <comando>");
				}
				
			break;

			case 'list':
				let lengthAmbientes = dataJson.length;
					console.log('Listar todos os Ambientes');
					console.log(`Numero de ambientes:  ${lengthAmbientes}`);
					console.log('########################################\n');
					 	for (var i = lengthAmbientes - 1; i >= 0; i--) {
					 		
							Object.entries(dataJson[i]).forEach(([key, value]) => {
								var lengthComandos = value.length;
								console.log(`${i} - ${key} possui ${lengthComandos} comandos`);    
								for (var c = lengthComandos - 1; c >= 0; c--) {
									console.log(`  '-- ${c} - ${value[c]['comando']}`);
								}

							});
							console.log('\n');
					 	}

					console.log('########################################');
					console.log('Para editar um ambiente execute Clip edit <ambiente>\n');
			 	 
			break;

			case 'edit':

				console.log('buscar comandos do ambiente para editar\n');

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
