var fs = require('fs');
 

 var obj = {

 	create: function(nomeProjeto,json){
		

 		fs.readdir(`${__dirname}/core_sh/${nomeProjeto}`, function(err,files){
 				if (err) { 
					//caso o diretorio do projeto não exista, criar
					fs.mkdir(`${__dirname}/core_sh/${nomeProjeto}`, function(err){
						if (err) { return 'error ao criar diretorio do projeto'; }
						return 'sucesso ao criar diretorio';
					});
 				}
 			
 			//criar arquivo sh no diretorio do projeto
			var stream = fs.createWriteStream(`${__dirname}/core_sh/${nomeProjeto}/${nomeProjeto}.sh`);
				stream.once('open', function(fd) {
				  stream.write("#!/bin/bash\n");
				  stream.write(`cd ${json.diretorio} && ${json.comando}`);
				  stream.end();
				});
		 	});


 	},
 //	createDir:function(nomeProjeto){
//		//caso o diretorio do projeto não exista, criar
//		fs.mkdir(`${__dirname}/core_sh/${nomeProjeto}`, function(err){
//			if (err) { return 'error ao criar diretorio do projeto'; }
//			return 'sucesso ao criar diretorio';
//		});
 //	}

 };


module.exports = obj;

//module.exports.sh = function(nomeProjeto,json) {
//	return new Promise((resolve, reject) => {
//	});
//}