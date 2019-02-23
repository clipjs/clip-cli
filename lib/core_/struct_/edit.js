const edit = (arguments,dataJson)=>{


    let ambiente = arguments[1];
    let posicao = arguments[2];
    let edit = arguments[3];				

if (edit == 'comando') {

    let novoValor = arguments[4];

    let lengthAmbientes = dataJson.length;
    for (var i = lengthAmbientes - 1; i >= 0; i--) {
    Object.entries(dataJson[i]).forEach(([key, value]) => {
            
        if (key == ambiente) {

            
                console.log(dataJson[i][ambiente][posicao]);
         
        }

        
    });
}
 

}else if(edit == 'dir'){
    let novoValor = arguments[4];

    dataJson[0][ambiente][0]['diretorio'] = novoValor;


}else if(edit == 'excluir'){
        let lengthAmbientes = dataJson.length;


console.log('remover comando de posicao '+posicao+' no ambiente '+ambiente);

    for (var i = lengthAmbientes - 1; i >= 0; i--) {
        if (dataJson[i][ambiente]) {

            delete dataJson[i][ambiente][posicao]

        }
    }

}
else{
    console.log('opção de alteração desconhecida');
    return
}
}

module.exports = edit;