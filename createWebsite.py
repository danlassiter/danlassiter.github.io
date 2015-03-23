#!/usr/bin/python

import sys, re
f = open('_posts/' + sys.argv[1], 'r')
#f = open('2015-03-22-webexp-basics.markdown', 'r')
lines = f.readlines()
f.close()

parsing = False
counter = 0
parseType = ''
files = {
	'html': '',
	'css': '',
	'javascript': ''
}

while counter < len(lines):
	line = lines[counter]
	counter = counter + 1
	if line == '{% endhighlight %}\n':
		parsing = False
		parseType = ''
	elif line[0:2] == '{%' and line[-3:-1] == '%}':
		parsing = True
		for t in ['html', 'javascript', 'css']:
			if re.search(t, line, re.IGNORECASE):
				parseType = t
	elif parsing:
		files[parseType] = files[parseType] + line

site_name = sys.argv[2]

html = open('websites/' + site_name + '.html', 'w')
html.write(files['html'])
html.close()

css = open('websites/' + site_name + '.css', 'w')
css.write(files['css'])
css.close()

javascript = open('websites/' + site_name + '.js', 'w')
javascript.write(files['javascript'])
javascript.close()