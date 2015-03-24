---
layout: post
title:  "WebExp basics"
date:   2015-03-22 13:20:23
categories: jekyll update
---

In our workflow, an experiment will generally consist of three parts: 

* a HTML file (.html), which specifies all static parts of the experiment;

* a CSS file (.css), which gives style and display options for the HTML;

* a JavaScript file (.js), which specifies the dynamic parts of the experiment.

The HTML file is what is actually opened; it will contain links to the CSS and JavaScript files. Here is a bare-bones example. We start by invoking JQuery, which helps the dynamic (JavaScript) part know what to do when modifying the HTML.  

{% highlight HTML linenos %}
<html>

<head>
<title>Title of page</title>
<script type="text/javascript" src="jquery-1.7.1.min.js"></script>
<script type="text/javascript" src="skeleton.js"></script>
<link rel="stylesheet" href="skeleton.css"></link>
</head>

<body>
Here is some static text. Below is a button. When you click it, the text inside the 'span' tags will change! This is because, in the JavaScript, we will link to the 'changeMeTxt' identifier and tell it to change the static HTML object enclosed in that identifier.

<br><br>

<span id='changeMeTxt'>You should only see this text when the page is initially loaded. If it remains after clicking the 'Change text' button, something is wrong.</span>

<br><br>

<button type='button' id='change'>Change text</button>

<br><br>

You can also modify multiple items that have the same class.

<table>
    <tr>
        <td><span class='changeMultipleTxt'>{{}}</span></td>
        <td><span class='changeMultipleTxt'>{{}}</span></td>
        <td><span class='changeMultipleTxt'>{{}}</span></td>
    </tr>
    <tr>
        <td><span class='changeMultipleTxt'>{{}}</span></td>
        <td><span class='changeMultipleTxt'>{{}}</span></td>
        <td><span class='changeMultipleTxt'>{{}}</span></td>
    </tr>
</table>

<br><br>

<button type='button' id='changeMultiple'>Change multiple</button>
</body>
</html>
{% endhighlight %}

Here is some JavaScript code, which we'd package as the "skeleton.js" file referenced above. In the calls to JQuery, which use '$', note the use of '#' to get ids (which must be unique), vs. '.' to get classes (which usually aren't).

{% highlight javascript linenos %}
$(document).ready(function() { /// load as soon as script is invoked
    showSlide("intro");
    $('#change').click(function() {
        // when you click the button with id 'change', do this:
        $('#changeMeTxt').html('Your random number is: ' + Math.random());
    });
    $('.changeMultiple').click(function() {
        // when you click the button with id 'change', do this:
        $('#changeMeTxt').html(Math.random());
    });
});
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
{% endhighlight %}