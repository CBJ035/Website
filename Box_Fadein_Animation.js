document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        // After the welcome message animation ends
        var boxes = document.querySelectorAll('.box');
        boxes.forEach(function(box) {
            box.style.opacity = 1; // Start the fade-in animation
        });
    }, 2000); // Adjust the time to match the duration of the welcome message animation
});