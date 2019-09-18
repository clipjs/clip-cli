# [Clip CLI](https://www.clipjs.com)
 
> Agrupador e Gereciador de Console 
> Inicie toda familia React, Sass ou Docker e qualquer outro serviço necessário no ambiente de desenvolvimento do seu projeto.

### Requisitos

- [Instale node.js](http://nodejs.org/) versão `>=4.0.0`
 
### Instalação

    $ npm i -g clip-cli

### Começando

    $ clip -a --nome deliveri --diretorio "teste" --comando "nodemon"   
    # Para criar um novo ambiente ou adicionar comandos a um ambiente já criado
 
### Como usar

    Uso: clip --run --nome deliveri

    Description:

     Em todo projeto existe a necessidade de "subir" serviços de ferramentas como reactjs, sass, Phonegap serve, Nodejs do lado servidor e varios outros serviços.
    E sempre que preciso iniciar o ambiente de desenvolvimento o desenvolvedor tem a tarefa de subir serviço por serviço de forma manual, sendo assim o Projeto Clip nasceu, com o objetivo de automatizar e organizar serviços.

    Comandos:

   -V, --version            output the version number
   -a, --adicionar          add comando
   -n, --nome [value]       Nome do projeto
   -d, --diretorio [value]  Diretorio do projeto
   -c, --comando [value]    Comando a ser iniciado ou execultado
   -nc, --novoComando       Adicionar um novo comando a um projeto já salvo
   -l, --listar             Listar um projeto
   -rc, --removerComando    Remover um comando do projeto
   -r, --remover            Remover um projeto
   --run                    Subir scripts de um projeto
   -h, --help               output usage information

###### [@despossivel](https://instagram.com/despossivel) 