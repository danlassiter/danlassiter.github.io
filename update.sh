#!/bin/bash 

echo Enter name of markdown file to parse
read FILENAME

echo Enter name of experiment files to create
read OUTPUT

python createWebsite.py -$FILENAME -$OUTPUT

echo Updating .git repository ...
git add -A
git commit -m 'update'
git push

echo Alldone