var fs = require('fs')
  , readFile = {
    getFileDb: function () {
        return  __dirname + '/../config_/projetos.json';
    },
    getData: function () {
        var db = this.getFileDb();
        var fileContent = fs.readFileSync(db, 'utf8');
        var fileJson = [];
        if (fileContent) {
            fileJson = JSON.parse(fileContent);
        }
        return fileJson;
    },
 
    saveData: function (fileJson) {
        var db = this.getFileDb();
        var data = JSON.stringify(fileJson);

        fs.writeFileSync(db, data, 'utf8');
        return data;
    },
    checkLog: (log) =>{
        return new Promise((resolve,reject)=>{
           fs.readFile(log, 'utf-8', function(err, data){
               var linhas = data.split(/\r?\n/);
               resolve(linhas);
           });
       });
    }
    
};
 
module.exports = readFile;