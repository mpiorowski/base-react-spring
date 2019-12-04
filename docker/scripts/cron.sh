#write out current crontab
crontab -l > mycron
#echo new cron into cron file
echo "00 23 * * * sh /home/mat/pbs-diary/prod/dump.sh" >> mycron
#install new cron file
crontab mycron
rm mycron
