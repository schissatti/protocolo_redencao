#!/bin/bash
# Script de Atualização Automática via GitHub no aaPanel
cd /www/wwwroot/seudominio.com.br
git pull origin main
echo "Site e mídias atualizados com sucesso via GitHub!"
