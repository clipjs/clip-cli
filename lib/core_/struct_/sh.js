var fs = require('fs');
var fs_ = require('./fs_.js');
 

 var obj = {
 	getFileSh: function(ambiente) {
        return  `${__dirname}/../core_sh/${ambiente}/run.sh`;
    },
    getData: function (ambiente) {
        var run = this.getFileSh(ambiente);
        var fileContent = fs.readFileSync(run, 'utf8');
        var fileSh = [];
        if (fileContent) {
            fileSh = fileContent;
        }
        return fileSh;
    },
 	create: function(ambiente,json,i){
		var run = this.getFileSh(ambiente);
		var dataSh;
		var sh = `gnome-terminal --execute bash -c "./${i}.sh; bash"\n`; //> ${__dirname}/../core_sh/${ambiente}/logs/clip.log
		var diretorio = json.diretorio;
		var comando = json.comado;

		fs_.checkDirOrFile(run).then((res)=>{
			if (res) {
				dataSh = this.getData(ambiente);
			}
		});









			//verifica pasta do ambiente
 			fs.exists(`${__dirname}/core_sh/${ambiente}`, function(exists) {
 				if (!exists) { 

					//caso o diretorio do projeto não exista, criar
					
					fs.mkdir(`${__dirname}/../core_sh/${ambiente}`, function(err){
						if (err) { //console.log('Error ao criar diretorio do projeto'); 
							return //console.log('Sucesso ao criar diretorio');
						}

					});
					

 				}
 						//
						//verifica arquivo run do ambiente
						
					fs.exists(run, function(exists) {
								if (!exists) {

								    	var stream = fs.createWriteStream(`${__dirname}/../core_sh/${ambiente}/run.sh`);
										stream.once('open', function(fd) {
									  		stream.write("#!/bin/bash\n");
								    		//stream.write(`chmod 777 -R "./" \n`);
											stream.write(sh);
											stream.end();
										});	
							    	
							    	return 0;


							    }else{
							    
						    		var stream = fs.createWriteStream(run);
						    		stream.once('open', function(fd){
						    			stream.write(`${dataSh}\n${sh}`);
						    			stream.end();
						    		});

									return 1;
						    	}
						});	
			
 			//criar arquivo sh no diretorio do projeto
 	
			var stream = fs.createWriteStream(`${__dirname}/../core_sh/${ambiente}/${i}.sh`);
				stream.once('open', function(fd) {
				  stream.write("#!/bin/bash\n");
				  stream.write(`cd ${json.diretorio} && ${json.comando}`); // > ${__dirname}/../core_sh/${ambiente}/logs/clip.log 
				  stream.end();
				});
		


		 	});

				


/*
			fs_.checkDirOrFile(`${__dirname}/core_sh/${ambiente}`).then((resolve)=>{

				console.log(resolve);

				if (!resolve) {
					fs_.createDir(`${__dirname}/../core_sh/${ambiente}`).then((resolve)=>{
						if (resolve) {
							return;
						}
					});
				}

					fs_.checkDirOrFile(run).then((resolve)=>{
						if (!resolve) {

							fs_.stream(`${__dirname}/../core_sh/${ambiente}/run.sh`,["#!/bin/bash\n",`chmod 777 -R "./" \n`,sh]);

						}else{


						}
					});

			});
	
*/



 		
 	},
 };


module.exports = obj;

//module.exports.sh = function(ambiente,json) {
//	return new Promise((resolve, reject) => {
//	});
//}