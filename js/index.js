var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var using = false;

var lastPoint = {
    x: undefined,
    y: undefined
}
listenToUser(context);
autoSetCanvasSize(canvas);


function autoSetCanvasSize(canvas) {
    resizePageHeightWidth()
    window.onresize = function () {
        resizePageHeightWidth()
    }

}


// 颜色控制

black.onclick = function () {
    black.classList.add('active');
    red.classList.remove('active');
    green.classList.remove('active');
    yellow.classList.remove('active');
    context.strokeStyle='black'
}
red.onclick = function () {
    red.classList.add('active');
    black.classList.remove('active');
    green.classList.remove('active');
    yellow.classList.remove('active');
    context.strokeStyle='red'
}
green.onclick = function () {
    green.classList.add('active');
    red.classList.remove('active');
    black.classList.remove('active');
    yellow.classList.remove('active');
    context.strokeStyle='green'
}
yellow.onclick = function () {
    yellow.classList.add('active');
    red.classList.remove('active');
    green.classList.remove('active');
    black.classList.remove('active');
    context.strokeStyle='yellow'
}


/*
* 橡皮擦监控制
* 初始值：false(不使用)
*
* */

var eraserEnabled = false;
brush.onclick = function () {
    eraserEnabled = false;
    brush.classList.add('active');
    eraser.classList.remove('active');
}
eraser.onclick = function () {
    eraserEnabled = true;
    eraser.classList.add('active');
    brush.classList.remove('active');
}


function resizePageHeightWidth() {
    var pageWidth = document.documentElement.clientWidth;
    var pageHeight = document.documentElement.clientHeight;
    canvas.width = pageWidth;
    canvas.height = pageHeight;

}

function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    // context.strokeStyle = '#666';
    context.moveTo(x1, y1);
    context.lineWidth = 5;
    context.lineTo(x2, y2);
    context.stroke();
}

function listenToUser(context) {

    //特性检测
    if (document.body.ontouchstart !== undefined) {
        //触屏设备
        console.log('触屏设备');
        canvas.ontouchstart = function (e) {
            var clientX = e.touches[0].clientX;
            var clientY = e.touches[0].clientY;
            lastPoint = {x: clientX, y: clientY};
            using = true;
            if (eraserEnabled) {
                context.clearRect(clientX - 5, clientY - 5, 10, 10)
            } else {
                // console.log(lastPoint)
            }

            // console.log(a.touches[0].clientX)
        }
        canvas.ontouchmove = function (e) {

            var clientX = e.touches[0].clientX;
            var clientY = e.touches[0].clientY;
            var newPoint = {x: clientX, y: clientY}
            if (eraserEnabled) {
                if (using) {
                    context.clearRect(clientX - 5, clientY - 5, 10, 10)
                }
            } else {
                // drawCircle(clientX, clientY, 1)
                if (using) {
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                    lastPoint = newPoint;
                }

            }
        }
        canvas.ontouchend = function (e) {
            using = false;
        }

    } else {
        //非触屏设备
        canvas.onmousedown = function (e) {
            var clientX = e.clientX;
            var clientY = e.clientY;
            lastPoint = {x: clientX, y: clientY};
            using = true;
            if (eraserEnabled) {
                context.clearRect(clientX - 5, clientY - 5, 10, 10)
            } else {
                // console.log(lastPoint)
            }


            //原生实现
            // var dot = document.createElement('div');
            // console.log(e)
            // dot.style =
            //     "background:white;"
            //     + "width:6px;height:6px;"
            //     + "border-radius:3px;"
            //     + "position:absolute;left:"
            //     + (clientX - 3) + "px;"
            //     + "top:" + (clientY - 3) + "px;";
            // canvas.appendChild(dot);

        }
        canvas.onmousemove = function (e) {
            var clientX = e.clientX;
            var clientY = e.clientY;
            var newPoint = {x: clientX, y: clientY}
            if (eraserEnabled) {
                if (using) {
                    context.clearRect(clientX - 5, clientY - 5, 10, 10)
                }
            } else {
                // drawCircle(clientX, clientY, 1)
                if (using) {
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                    lastPoint = newPoint;
                }

            }

        }
        canvas.onmouseup = function (e) {
            using = false;
        }
    }

}
