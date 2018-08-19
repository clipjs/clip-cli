#!/bin/bash
	
chmod 777 -R "./"

#gnome-terminal --execute bash -c "./sh/react.sh  ; bash" # > ./logs/react.log
gnome-terminal --execute bash -c "./_sh/sass.sh  ; bash" #  > ./logs/sass.log
gnome-terminal --execute bash -c "./_sh/server.sh  ; bash" # 
sh ./_sh/react.sh

##cat < ./logs/reactlog >> full.log


##echo "##SAIDA REACTJS"
##tail -f ./logs/react.log > ./logs/full.log
##tail -f ./logs/sass.log >

##echo "##SAIDA SERVER"
##tail -f ./logs/server.log


