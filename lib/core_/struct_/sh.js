var fs = require('fs');
 

 var obj = {
 	getFileSh: function(ambiente) {
        return  `${__dirname}/core_sh/${ambiente}/run.sh`;
    },
    getData: function () {
        var run = this.getFileDb();
        var fileContent = fs.readFileSync(run, 'utf8');
        var fileJson = [];
        if (fileContent) {
            fileJson = JSON.parse(fileContent);
        }
        return fileJson;
    },
 	create: function(ambiente,json,i){
		var run = this.getFileSh(ambiente);
		var sh = `gnome-terminal --execute bash -c "./${i}.sh ; bash"`;
		//var dataJson = readFile.getData();
		var diretorio = json.diretorio;
		var comando = json.comado;
			
			fs.exists(run, function(exists) {
			    if (!exists) {
				  var stream = fs.createWriteStream(`${__dirname}/../core_sh/${ambiente}/run.sh`);
						stream.once('open', function(fd) {
						  stream.write("#!/bin/bash\n");
						  stream.write(`chmod 777 -R "./"`);
						  stream.write(sh);
						  stream.end();
						});	
			    
			    }else{
			    	fs.writeFile(run, sh, function(erro) {
					    if(erro) {
					        throw erro;
					    }
					    console.log("Arquivo salvo");
					}); 
					
		    	}
			    
			});

 	//	fs.readdir(`${__dirname}/core_sh/${ambiente}`, function(err,files){
 			fs.exists(`${__dirname}/core_sh/${ambiente}`, function(exists) {
 				if (!exists) { 
					//caso o diretorio do projeto não exista, criar
					fs.mkdir(`${__dirname}/../core_sh/${ambiente}`, function(err){
						if (err) { //console.log('Error ao criar diretorio do projeto'); 
							return 
						}
						console.log('Sucesso ao criar diretorio');
					});
 				}
 			
 			//criar arquivo sh no diretorio do projeto
			var stream = fs.createWriteStream(`${__dirname}/../core_sh/${ambiente}/${i}.sh`);
				stream.once('open', function(fd) {
				  stream.write("#!/bin/bash\n");
				  stream.write(`cd ${json.diretorio} && ${json.comando}`);
				  stream.end();
				});
		 	});
 		
 	},
 //	createDir:function(ambiente){
//		//caso o diretorio do projeto não exista, criar
//		fs.mkdir(`${__dirname}/core_sh/${ambiente}`, function(err){
//			if (err) { return 'error ao criar diretorio do projeto'; }
//			return 'sucesso ao criar diretorio';
//		});
 //	}

 };


module.exports = obj;

//module.exports.sh = function(ambiente,json) {
//	return new Promise((resolve, reject) => {
//	});
//}