#!/bin/bash 

echo Enter name of file to parse
read FILENAME

python createWebsite.py -$FILENAME

git add -A
git commit -m 'update'
git push