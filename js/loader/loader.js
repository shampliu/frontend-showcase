var mask1 = document.getElementById('mask1');
var mask2 = document.getElementById('mask2');
var perc = document.getElementById('perc');

var startDeg = 90;

var progressInterval;
var fps = 60;

document.addEventListener("DOMContentLoaded", function(event) {
    var percent = 0;
    perc.innerHTML = percent;
    progressInterval = setInterval(function() { // in order to use function with args
        percent++;
        progress(mask1, mask2, percent);
        perc.innerHTML = percent;
    }, 1000/fps)
});

function progress(mask1, mask2, percent) {
    var newDeg = startDeg + (360/100) * percent;
    mask1.style.transform = 'rotate(' + newDeg + 'deg)';

    if (percent >= 100) {
        clearInterval(progressInterval);
        return;
    }

    if (percent == 50) {
        convert(mask2);
    }
}

function convert(mask) {
    Object.assign(mask.style, {
        borderTop: "3px solid red",
        borderLeft: "3px solid red",
        borderRight: "3px solid red",
        transform: "rotate(90deg)",
        background: "white"
    })
}
