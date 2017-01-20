var shake = (function() {
    var Shaketime = 0;
    var SHAKE_THRESHOLD = 4000;
    var last_update = 0;
    var x = y = z = last_x = last_y = last_z = 0;
    var media;
    var cbhandle;
    var disabled = true;

    function init(callback) {
        cbhandle = callback;

        last_update = new Date().getTime();
        media = document.getElementById("musicBox");
        if (window.DeviceMotionEvent) {
            window.addEventListener('devicemotion', deviceMotionHandler, false);
        } else {
            alert('not support mobile event');
        }
    }

    function deviceMotionHandler(eventData) {
        if (shake.disabled) return;
        var acceleration = eventData.accelerationIncludingGravity;
        var curTime = new Date().getTime();
        if ((curTime - last_update) > 50) {
            var diffTime = curTime - last_update;
            last_update = curTime;
            x = acceleration.x;
            y = acceleration.y;
            z = acceleration.z;

            var speed = Math.max(Math.abs(x - last_x), Math.abs(y - last_y), Math.abs(z - last_z));

            if (speed > 30) {
                cbhandle();
                Shaketime++;
            }

            last_x = x;
            last_y = y;
            last_z = z;
        }
    }

    return {
        init: init,
        disabled: disabled,
        Shaketime: Shaketime
    }
})();