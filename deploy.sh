#!/bin/bash
# Script de Atualização Automática via GitHub
if [ -d "/var/www/html" ]; then
    cd /var/www/html
elif [ -d "/www/wwwroot/brivanne.com" ]; then
    cd /www/wwwroot/brivanne.com
elif [ -d "/www/wwwroot/seudominio.com.br" ]; then
    cd /www/wwwroot/seudominio.com.br
fi
git pull origin main
echo "Site e mídias atualizados com sucesso via GitHub!"
