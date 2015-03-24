$(document).ready(function() { /// load as soon as script is invoked
    $('#change').click(function() {
            // when you click the button with id 'change', do this:
        var randomNumber = Math.random();
            // pick a random floating-point number in [0,1]
        $('#changeMeTxt').html('Your random number is: ' + randomNumber);
            // replace HTML inside the span with id 'changeMeTxt'
    });
    $('#changeMultiple').click(function() {
            // when you click the button with id 'change', do this:
        var randomInt = Math.floor(100 * Math.random());
            // pick a random integer between 0 and 99
        $('.changeMultipleTxt').html('Random int: ' + randomInt);
            // for anything with class 'changeMultipleTxt', replace HTML
    });
});
