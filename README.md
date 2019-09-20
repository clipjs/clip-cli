# [Clip CLI](https://www.clipjs.com)
 
> Agrupador e Gereciador de Console 
> Inicie toda familia React, Sass, Docker e qualquer outro serviço necessário no ambiente de desenvolvimento do seu projeto.

### Requisitos

- [Instale node.js](http://nodejs.org/) versão `>=8.0.0`
 
### Instalação

    $ sudo npm i -g clip-cli
    #Para instalar de forma global

### Começando

    $ clip --adicionar --nome deliveri --diretorio "/home/deliveri/api" --comando "nodemon"   
    # Para criar um novo ambiente 
    
    $ clip --novoComando --nome deliveri --diretorio "/home/deliveri/api" --comando "mocha"
    #Para adicionar comandos a um ambiente já criado
 
### Como iniciar um ambiente

    $ clip --run --nome deliveri


### Ver todos ambientes existes

    $ clip --listar

### Ver um ambiente expecifico 

    $ clip --listar  --nome deliveri

### Remover um comando de um ambiente 

    $ clip --removerComando --nome deliveri --comando "mocha"

### Remover todo um ambiente

    $ clip --remover --nome deliveri




    Description:

     Em todo projeto existe a necessidade de "subir" serviços de ferramentas como reactjs, sass, Phonegap serve, Nodejs do lado servidor e varios outros serviços ou ferramentas.
    E sempre que preciso iniciar o ambiente de desenvolvimento o desenvolvedor tem a tarefa de subir serviço por serviço de forma manual, sendo assim o Projeto Clip nasceu, com o objetivo de automatizar e organizar serviços.

    Comandos:

Options:
  -V, --version        output the version number
  --adicionar          add comando
  --nome [value]       Nome do projeto
  --diretorio [value]  Diretorio do projeto
  --comando [value]    Comando a ser iniciado ou execultado
  --novoComando        Adicionar um novo comando a um projeto já salvo
  --listar             Listar um projeto
  --removerComando     Remover um comando do projeto
  --remover            Remover um projeto
  --editor [value]     Abrir seu editor de codigo nos diretorios do projeto
  --run                Subir scripts de um projeto
  -h, --help           output usage information

###### [@despossivel](https://instagram.com/despossivel) 