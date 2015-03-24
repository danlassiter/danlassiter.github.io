---
layout: post
title:  "WebExp basics: A simple working example"
date:   2015-03-22 13:20:23
categories: jekyll update
---

Click [here](http://danlassiter.github.io/websites/basic.html) for an extremely simple experiment. After running through it and seeing what it does, let's break it down.

Here is the HTML:

{% highlight HTML linenos %}
<html>
<head>
<title>Basic experiment</title>
<script type="text/javascript" src="jquery-1.7.1.min.js"></script>
<script type="text/javascript" src="mmturkey.0.5.js"></script> 
<script type="text/javascript" src="basic.js"></script>
<link rel="stylesheet" href="basic.css"></link>
</head>
<body>

<div class='slide' id='intro'>
Intro slide, with short description of experiment and perhaps also legal information. (The latter may be better placed on a separate slide.)
<br><br>
<button type='button' id='gotoInstructions'>Proceed to instructions</button>
</div>

<div class='slide' id='instructions'>
Detailed instructions for participants here.
<br><br>
<button type='button' id='startbutton'>Start experiment</button>
</div>

<div class='slide' id='stage'>
<p>Your stimulus will display here:</p>
<span id='currentStim'>{{{IF YOU SEE THIS SOMETHING IS WRONG!}}}</span>
<br>
<p>Some response options:</p>
<form id='responseForm'>
<table>
<tr>
<td><input type='radio' class='response' name='response' id='unacceptable' value='unacceptable' /></td>
<td><input type='radio' class='response' name='response' id='acceptable' value='acceptable' /></td>
</tr>
<tr>
<td><label for='v1'>Unacceptable&nbsp;&nbsp;</label></td>
<td><label for='v2'>&nbsp;&nbsp;Acceptable</label></td>
</tr>
</table>
</form>
<button type='button' id='continue'>Continue</button>
</div>

<div class='slide' id='finish'>
You're finished - thanks for participating! Submitting to Mechanical Turk...
</div>
</body>
</html>
{% endhighlight %}

Here is some JavaScript code, which we'd package as the "basic.js" file referenced above. We use some basic JQuery for dynamic content. Note the use of '#' to get ids (which must be unique), vs. '.' to get classes (which usually aren't).

{% highlight javascript linenos %}
var stimuli = shuffle(['Bill doesn\'t have any money', 
                        'Bill has any money', 
                        'Colorless green ideas sleep furiously', 
                        'Furiously sleep green ideas colorless']);
var data = {}; 
var trialnum = 0;

$(document).ready(function() {
    showSlide("intro");
    $('#gotoInstructions').click(function() {
        showSlide('instructions');
    });
    $('#startbutton').click(function() {
        stepExperiment();
    });
});

function showSlide (slideName) {
    $('.slide').hide();
    $('#' + slideName).show();
}

function stepExperiment () {
    if (stimuli.length == 0) { // end the experiment
        showSlide('finish');
        setTimeout(function() { turk.submit(data)}, 1000);
    } else { 
        trialnum += 1;
        var trialdata = {
            trialnum: trialnum
        };
            // create object to hold data from current trial
        trialdata.stimulus = stimuli.shift(); 
            // remove 1st element of shuffled stimuli array
            // and assign it as current stimulus
        $('#currentStim').html(stim);
            // then, write it into 'currentStim' HTML placeholder
        showSlide('stage'); 
            // reveal the result to participant
        $('#continue').click(function() {
            response = $('#responseForm').serialize();
            if (response.length > 0) { 
                    // check for valid answer
                $("#continue").unbind('click');
                    // make continue button available for re-use 
                $(".response").prop('checked', false);
                    // ensure response options unticked next time
                trialdata.response = response;
                    // record response
                data['trial' + trialnum] = trialdata;
                    // write trial data into global data object
                stepExperiment();
                    // go to next trial
            }
        });
    }
}

function shuffle(v) { // non-destructive.
    newarray = v.slice(0);
    for (var j, x, i = newarray.length; i; j = parseInt(Math.random() * i), x = newarray[--i], newarray[i] = newarray[j], newarray[j] = x);
    return newarray;
}
{% endhighlight %}
At the end of the experiment, we'd have to do something with the data we've collected to send it to MTurk. More on this later.

Here is some CSS, which we'd package as the "basic.css" file referenced above:

{% highlight css linenos %}
body {
    padding: 0;
    margin: 0;
    font-family: Palatino Linotype, Bookman Antiqua, Palatino, serif;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
    width: 95%;
    height: 95%;
}

table, td {margin: 0 auto; text-align: center}

button {
    font-family: Georgia, serif; 
    font-size: 14px;
    border: 1px solid #999;
    margin: 0 auto;
    padding-left: 5px;
    padding-right: 5px;
    height: 29px;
    min-width: 70px;
}

.slide {
    width: 95%;
    height: 95%;
    display: none;
    position: absolute;
    margin: 0;
    margin-left: 0.5%;
    padding: 1% 2% 1% 2%;
}
{% endhighlight %}

Further materials:

* [Long Ouyang's Even-Odd Tutorial](http://longouyang.github.io/even-odd/docs/even-odd.html), from which some of the concepts and code here are borrowed.

* Codeacademy's [HTML/CSS](http://www.codecademy.com/en/tracks/web), [Javascript](http://www.codecademy.com/tracks/javascript), and [JQuery](http://www.codecademy.com/en/tracks/jquery) mini-courses 

* [A bunch of different experiments](http://web.stanford.edu/~danlass/experiment/) written in the style described here, with variations (progress bars, sliders, graphics, ...). You may take ideas/code from any of these if you find them useful.

* [Eloquent JavaScript](http://eloquentjavascript.net/), a free online book which introduces programming through JavaScript

* [JavaScript: The Good Parts](http://shop.oreilly.com/product/9780596517748.do), a wonderful little book by Douglas Crockford on good and bad aspects of JavaScript, useful for those with some (but not necessarily lots of) programming chops

* [JSLint](http://www.jslint.com/), Crockford's (fairly demanding) style-checking tool for JavaScript. (Note: my code does not always conform to Crockford's recommendations, since I wrote a lot of it before encountering his book and probably have still not fully absorbed it; but it would be better if it did.)
