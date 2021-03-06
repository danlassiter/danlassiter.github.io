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
            // and record it as current stimulus
        $('#currentStim').html(trialdata.stimulus);
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
