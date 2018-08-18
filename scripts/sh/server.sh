#!/bin/bash
cd /home/matheus/Documentos/apps_node/pinpper_serve/www && pm2 start index.js --watch
pm2 logs