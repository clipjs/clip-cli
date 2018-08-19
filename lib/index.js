let menu = require('./core_/struct_/menu.js'),
    arguments = process.argv.splice(2, process.argv.length -1); //join(' ');

menu.principal(arguments[0],arguments);