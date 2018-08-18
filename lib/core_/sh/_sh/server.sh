#!/bin/bash
cd /home/matheus/Documentos/pinpper/serve-side_0.2/www  && pm2 start index.js --watch && pm2 logs