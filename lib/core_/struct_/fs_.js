var fs = require('fs');

var obj = {
	createFile: function(dirFile){
		return new Promise((resolve,reject)=>{
			var stream = fs.createWriteStream(dirFile)
			resolve(stream);
		});
	},
	openFile:function(stream,data){
		stream.once('open', function(fd) {
	  		
			console.log(data);
	  		//stream.write("#!/bin/bash\n");
    		//stream.write(`chmod 777 -R "./" \n`);
			//stream.write(sh);
			//stream.end();

		});
	},
	stream:function(dirFile,data){
		this.createFile(dirFile).then((resolve)=>{
			//console.log(resolve);
			this.openFile(resolve,data);
		});
	},
	checkDirOrFile:function(dirOrFile){
		return new Promise((resolve,reject)=> fs.exists(dirOrFile, function(exists) {
				resolve(exists);
			}) );
	},
	createDir:function(dir){
		return new Promise((resolve,reject)=>fs.mkdir(dir, function(err){
						if (err) { //console.log('Error ao criar diretorio do projeto'); 
							reject(err); //console.log('Sucesso ao criar diretorio');
						}
						resolve(1);
					}))
	}


};

module.exports = obj;