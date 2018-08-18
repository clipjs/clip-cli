let menu = require('./core_/struct_/menu.js'),
    projetos = [],
    opcao;

var arguments = process.argv.splice(2, process.argv.length -1); //join(' ');
	
menu.principal(arguments[0],arguments);


	// do{

	// 		opcao = scanf('%s');
	// 		menu.principal(opcao);


	// }while(opcao !== 'exit')



