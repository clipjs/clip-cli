const help = () =>{

console.log(`Clip 0.0.3 \n
Use clip <comando>\n
Onde <comando> é um dos:
	 config, run, list, edit, remove\n
clip config <nome ambiente> <diretorio projeto> <comando do serviço> .... Para configurar um ambiente
clip run <nome ambiente> ................................................ Para iniciar um ambiente
clip list ............................................................... Para listar todos ambientes
clip edit <nome ambiente> ............................................... Para editar um ambiente
clip remove <nome ambiente> ............................................. Para remover um ambiente`); 

} 

 module.exports = help;