var readFile = require('./readFile.js'),
	fs = require('fs'),
	sh = require('./sh.js'),
	mongoDB = require('./_crud_/mongoDB.js');
    exec = require('child_process').exec;


//mongoDB.find('ambientes').then((json)=>{
//	console.log(json);
//});
//console.log();

 
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


				 		let ambiente  = arguments[1];
				 		dataJson = readFile.getData();
				 		let lengthProjetos = dataJson.length;

				 		 //		exec(`chmod 777 -R ${__dirname}/../core_sh/${ambiente}`);

				 		
				 		/*
								fs.mkdir(`${__dirname}/../core_sh/${ambiente}/logs`, function(err){
								if (err) { //console.log('Error ao criar diretorio do projeto'); 
									return //console.log('Sucesso ao criar diretorio');
								}
								});
								
								var stream = fs.createWriteStream(`${__dirname}/../core_sh/${ambiente}/logs/clip.log`);
										stream.once('open', function(fd) {
									  		stream.write(`Clip iniciando ${ambiente}`);
											stream.end();
										});	
						*/
					

						   //     mongoDB.find('ambientes').then((json)=>{
									// 	console.log(json);
									// });
						       
						 
				 		if (lengthProjetos > 0) {

	
						  for (var i = 0; i < dataJson.length; i++) {
								
								if (dataJson[i][ambiente]) {
									let lengthComandos = dataJson[i][ambiente].length;

										//exec(`nohup ${__dirname}/../core_sh/${ambiente}/run.sh`,(error, stdout, stderr) => {			           
								        //    console.log(`${stdout}`);
								        //    console.log(`${stderr}`);
								        //    if (error !== null) {
								        //        console.log(`exec error: ${error}`);
								        //    }
								        for (var j = lengthComandos - 1; j >= 0; j--) {

							       	 		exec(`cd ${dataJson[i][ambiente][j]['diretorio']} && ${dataJson[i][ambiente][j]['comando']} > /home/matheus/Documentos/apps_node/clip-cli/lib/core_/clip.log`,(error, stdout, stderr) => {			           
									            console.log(`${stdout}`);
									            console.log(`${stderr}`);
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
				//nome Projeto
				//diretorio 
				//comando

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
 

						   // 	sh.create(nomeProjeto,jsonArguments,n);
						  	readFile.saveData(dataJson);
						

						 //  	mongoDB.insert('ambientes',dataJson).then((json)=>{
							// 	console.log(json);
							// });



							console.log(`Comando inserido no ambiente ${nomeProjeto}, rode clip run nomeProjeto para iniciar o ambiente`);
							

					}


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
