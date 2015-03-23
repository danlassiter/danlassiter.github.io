---
layout: post
title:  "WebExp basics"
date:   2015-03-22 13:20:23
categories: jekyll update
---

Click [here](http://danlassiter.github.io/basic.html) for an extremely simple experiment. After running through it and seeing what it does, let's break it down.

Here is the HTML:

{% highlight HTML linenos %}
<html>
<head>
<title/>
<script type="text/javascript" src="jquery-1.7.1.min.js"></script>
<script type="text/javascript" src="basic.js"/>
<link rel="stylesheet" href="basic.css"/>
</head>
<body>
<div class='slide' id='instructions'>
Instructions for participants here.
<button type="button" id='startbutton'>Start</button>
</div>

<div class='slide' id='stage'>
<p>Your stimulus will display here:</p>
<span id="currentStim">{{{}}}</span>

<p>Some response options:</p>
<div class='response' id='ratings'>
<td>
<input type='radio' id='false' value='false' /></td>
<th><label for='v2'>False</label></th></td>
<td><input type='radio' id='true' value='true'/>True</td>
<th><label for='v1'>Yes</label></th></div>

<button type="button" id='nextbutton'>Next</button>
</div>

<div class='slide' id='finish'>
Thanks! You're all done ...
</div>
</body>
{% endhighlight %}

Here is some JavaScript code, which we'd package as the "template.js" file referenced above. We use some basic JQuery for dynamic content. Note the use of '#' to get ids (which must be unique), vs. '.' to get classes (which usually aren't).

{% highlight javascript linenos %}
var stimuli = ['stim1', 'stim2', 'stim3'];
var data = []; 
var counter = 0;
$('#instructions').show();
$('#startbutton').click(function() {
    if (stimuli.length == 0) { // end the experiment
        $('.slide').hide();
        $('#finish').show();
    } else { 
        counter += 1;
        var trialdata = {
            trialnum: counter;
        };
        var stim = myStimuli.shift(); 
            // remove 1st element of shuffled stimuli array
        trialdata.stimulus = stim;
        $('#stimtext').html(stim);
            // write it as the 'currentStim' text
        $('.slide').hide();
        $('#stage').show(); // reveal the result to participant
        $('#nextbutton').click(){
            if ()
            data.push(trialdata);
        }
    }
});
{% endhighlight %}
At the end of the experiment, we'd have to do something with the data we've collected to send it to MTurk. More on this later.

Here is some CSS, which we'd package as the "style.css" file referenced above:

{% highlight css linenos %}
.slide {
    width: 95%;
    height: 95%;
    display: none;
    position: absolute;
    margin: 0;
    margin-left: 0.5%;
    padding: 1% 2% 1% 2%;
}
.stim { <!-- overrides more general slide styles -->
    text-align: center;
}
{% endhighlight %}



