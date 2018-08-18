var fs = require('fs');
 

 var obj = {

 	create: function(nomeProjeto,json){
		var stream = fs.createWriteStream(`${__dirname}/core_sh/${nomeProjeto}.sh`);
		stream.once('open', function(fd) {
		  stream.write("#!/bin/bash\n");
		  stream.write(`cd ${json.diretorio} && ${json.comando}`);
		  stream.end();
		});
 	}

 };


module.exports = obj;

//module.exports.sh = function(nomeProjeto,json) {
//	return new Promise((resolve, reject) => {
//	});
//}