var fs = require('fs')
  , obj = {
	createFile: function(dirFile){
		return new Promise((resolve,reject)=>{
			var stream = fs.createWriteStream(dirFile)
			resolve(stream);
		});
	},
	openFile:function(stream,data){
	stream.once('open', function(fd) {
	 });
	},
	stream:function(dirFile,data){
		this.createFile(dirFile).then((resolve)=>{
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
		if (err) {
			reject(err);
		}
			resolve(1);
		}))
	}
};

module.exports = obj;