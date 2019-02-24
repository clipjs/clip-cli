const list = (dataJson)=>{
    let lengthAmbientes = dataJson.length;
    console.log(`Listar todos os Ambientes
Numero de ambientes:  ${lengthAmbientes}\n`);
  
         for (var i = lengthAmbientes - 1; i >= 0; i--) {
             
            Object.entries(dataJson[i]).forEach(([key, value]) => {
                var lengthComandos = value.length;
                    console.log(`${i} - ${key} possui ${lengthComandos} comandos`);    
                for (var c = lengthComandos - 1; c >= 0; c--) {
                    if (value[c]) {
                        console.log(`  '-- ${c} - ${value[c]['comando']}`);
                    }else{
                        console.log(`  '-- Nenhum comando está inserido neste ambiente.`);
                    }
                }
            });
            console.log('\n');
         }
 
    console.log('Para editar um ambiente execute: clip edit <nome ambiente>\n');
}

module.exports = list;