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
