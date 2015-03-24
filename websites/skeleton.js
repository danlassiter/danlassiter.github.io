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
