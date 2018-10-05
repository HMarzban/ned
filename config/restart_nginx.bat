@ECHO OFF
cd /nginx
taskkill /f /IM nginx.exe
start nginx
EXIT