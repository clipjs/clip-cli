var readFile = require('./readFile.js'),
	help = require('./help'),
	config = require('./config'),
	run = require('./run'),
	list = require('./list'),
	edit = require('./edit'),
	fs = require('fs');

module.exports.principal =  (opcao,arguments)=>{
	let lengthArguments = arguments.length;
	let dataJson = readFile.getData(); 

		switch(opcao){
			
			case 'help':
				help();
			break;

			case 'run':
				run(arguments,dataJson);
			break;

			case 'config':
				config(arguments,dataJson,readFile);
			break;

			case 'list':
				list(dataJson);
			break;

			case 'edit':
				edit(arguments,dataJson);
			break;

			default:
				help();
			break;

		}

	}