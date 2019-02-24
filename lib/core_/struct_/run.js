const readFile = require('./readFile.js'),
    fs = require('fs'),  
    exec = require('child_process').exec;


const run = (arguments,dataJson)=> {
    let lengthArguments = arguments.length; 
    
    if (lengthArguments == 2) {

        let ambiente  = arguments[1];
        dataJson = readFile.getData();

            for (var i = dataJson.length - 1; i >= 0; i--) {
                if (dataJson[i][ambiente]) {

                   let log = `${__dirname}/../clip.log`;

                   fs.writeFile(log, "", function(erro) {
                       if(erro) {throw erro;}
                   }); 
                    
                    for (var j = dataJson[i][ambiente].length - 1; j >= 0; j--) {
                    
                          exec(`cd ${dataJson[i][ambiente][j]['diretorio']} && ${dataJson[i][ambiente][j]['comando']} >> ${log}`,(error, stdout, stderr) => {		 // > /home/matheus/Documentos/apps_node/clip-cli/lib/core_/clip.log	           
                               console.log(`Clip Iniciou seu ambiente com sucesso!!!`);
                               if (error !== null) {
                                   console.log(`exec error: ${error}\n`);
                               }
                       });
                    

                    }	

               
                    let linhasLog = 0;

                       setInterval(()=>{	
                           readFile.checkLog(log).then((log)=>{
                               if(linhasLog !== log.length){
                                   linhasLog = log.length;
                                   log.forEach(function(linha){
                                       console.log(linha); // aqui podes fazer o que precisas com cada linha
                                   })
                               }
                           });
                       },1000);
           
                    
                }else{
                  console.log(`Ambiente ainda não foi configurado
Rode: clip config <nome ambiente> <diretorio projeto> <comando do serviço>
para criar ${ambiente} como um ambiente`); 
                   return;
               }

            }

}else{
    console.log(`Ambiente ainda não foi configurado
Rode: clip config <nome ambiente> <diretorio projeto> <comando do serviço>
para criar um ambiente`); 
   return;
}
 
}

module.exports = run;