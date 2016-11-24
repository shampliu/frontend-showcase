var mask1 = document.getElementById('mask1');
var mask2 = document.getElementById('mask2');

var deg1 = 90;
var deg2 = -90;

mask1.style.transform = 'rotate(' + deg1 + 'deg)';
mask2.style.transform = 'rotate(' + deg2 + 'deg)';

var progressInterval;
var fps = 10;

document.addEventListener("DOMContentLoaded", function(event) {
    var percent = 0;
    // progressInterval = setInterval(progress(mask1, mask2, percent), 1000);
    progressInterval = setInterval(function() {
        progress(mask1, mask2, percent);
        percent++;
    }, 1000/fps)
});

function progress(mask1, mask2, percent) {
    if (percent < 50) {
        deg1 += 360/100;
        mask1.style.transform = 'rotate(' + deg1 + 'deg)';
    } else {
        if (percent == 50) {
            convert(mask1); }
        if (percent >= 100) {
            clearInterval(progressInterval);
            return;
        }

        deg2 += 360/100;
        mask2.style.transform = 'rotate(' + deg2 + 'deg)';

    }
}

function convert(mask) {
    Object.assign(mask.style, {
        borderTop: "3px solid red",
        borderLeft: "3px solid red",
        borderRight: "3px solid red",
        transform: "rotate(90deg)",
        background: "white",
        transition: "none"
    })
}
