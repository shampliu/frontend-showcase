(function() {
    var GRAVITY = .00098; // pixel per square millisecond
    var INITIAL_VELOCITY_X = .12; // pixel per millisecond
    var INITIAL_VELOCITY_Y = 0;
    var BOUNCE_RATE = 0.7;
    var FPS = 60;

    var INITIAL_X = 10;
    var INITIAL_Y = 10;
    var SIZE = 50;

    var ball = document.getElementById('ball');
    setStyle(ball, {
        top: INITIAL_Y,
        left: INITIAL_X,
        width: SIZE,
        height: SIZE
    });

    document.addEventListener("DOMContentLoaded", function() {
        var newVelY = INITIAL_VELOCITY_Y;
        var newVelX = INITIAL_VELOCITY_X;
        var newTop = INITIAL_Y;
        var newLeft = INITIAL_X;
        var delta = 1000 / FPS;

        var prevX;
        var prevY;

        var drop = function() {

            newVelY += delta * GRAVITY;
            newTop += newVelY * delta;
            newLeft += newVelX * delta;
            setStyle(ball, {
                top: newTop,
                left: newLeft
            })

            if (newTop >= window.innerHeight - SIZE) {
                newTop = window.innerHeight - SIZE;
                newVelY *= -BOUNCE_RATE;
            }

            if (newTop <= 0) {
                newTop = 0;
                newVelY *= -BOUNCE_RATE;
            }

            if (newLeft >= window.innerWidth - SIZE) {
                newLeft = window.innerWidth - SIZE;
                newVelX *= -BOUNCE_RATE;
            }

            if (newLeft <= 0) {
                newLeft = 0;
                newVelX *= -BOUNCE_RATE;
            }



        };
        var dropInterval;

        document.addEventListener('mouseup', function(e) {
            if (e.target === ball) {
                document.removeEventListener('mousemove', moveBall);
                dropInterval = setInterval(drop, delta);
            }
        })

        ball.addEventListener('mousedown', function(e) {
            clearInterval(dropInterval);

            document.addEventListener('mousemove', moveBall)
        })

        function moveBall(e) {

            newVelX = prevX === undefined ? 0 : Math.abs(prevX - e.pageX) / delta;
            newVelY = prevY === undefined ? 0 : Math.abs(prevY - e.pageY) / delta;

            newTop = e.pageY - SIZE / 2;
            newLeft = e.pageX - SIZE / 2;

            setStyle(ball, {
                top: newTop,
                left: newLeft
            })

            prevX = e.pageX;
            prevY = e.pageY;
        }
    });
})();


function setStyle(obj, options) {
    for (var i in options) {
        obj.style[i] = options[i];
    }
}


