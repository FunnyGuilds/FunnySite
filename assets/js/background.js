$(function () {
    if (!isMobile.any()) run();
});

function run() {
    setTimeout(init, 100);
}

function init() {
    (function (window, document, undefined) {
        'use strict';

        var canvas = document.getElementById('background'),
            ctx = canvas.getContext('2d'),
            scale = 30,
            thickness = 0.6,
            lineCap = 'round',
            lines = [],
            count = 0;

        function onWindowResize() {
            canvas.width = screen.width;
            canvas.height = screen.height;
            ctx.lineWidth = thickness;
            ctx.strokeStyle = "DeepSkyBlue";
            ctx.lineCsp = lineCap;
            ctx.globalCompositeOperation = "lighter";
            render();
        }

        function createLineA(i, x, y, step, thickness) {
            this.i = i;
            this.x = x;
            this.y = y;
            this.step = 15;
            this.thickness = thickness;
            this.draw = function () {
                ctx.lineWidth = this.thickness;
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.x + this.step, this.y + this.step);
                ctx.stroke();
            }
            this.animate = function () {
                var r = Math.random();
                TweenMax.fromTo(this, 5, {step: 0}, {
                    step: this.step,
                    delay: 0.0003 * this.i,
                    ease: Expo.easeInOut,
                    repeat: -1,
                    yoyo: true
                });
                //TweenMax.fromTo(this, 7, {thickness:r}, { thickness:this.thickness, delay:0.0005*this.i, ease:Expo.easeInOut, repeat:-1, yoyo:true });
            };
            this.animate();
        }

        function createLineB(i, x, y, step, thickness) {
            this.i = i;
            this.x = x;
            this.y = y;
            this.step = 5;
            this.thickness = thickness;
            this.draw = function () {
                ctx.lineWidth = this.thickness;
                ctx.beginPath();
                ctx.moveTo(this.x + this.step, this.y);
                ctx.lineTo(this.x, this.y + this.step);
                ctx.stroke();
            };
            this.animate = function () {
                var r = Math.random();
                TweenMax.fromTo(this, 5, {step: 0}, {
                    step: this.step,
                    delay: 0.0003 * this.i,
                    ease: Expo.easeInOut,
                    repeat: -1,
                    yoyo: true
                });
                //TweenMax.fromTo(this, 7, {thickness:r}, { thickness:this.thickness, delay:0.0005*this.i, ease:Expo.easeInOut, repeat:-1, yoyo:true });
            };
            this.animate();
        }

        function fillGrid() {
            var _w = canvas.width,
                _h = canvas.height,
                _step = scale;

            for (var iy = 0; iy < _h; iy += _step) {
                for (var ix = 0; ix < _w; ix += _step) {
                    count++;
                    var _toggle = (Math.random() * 2) | 0;
                    var _thickness = Math.random() * thickness;
                    if (_toggle === 0) {
                        var line = new createLineA(count, ix, iy, _step, _thickness);
                        lines.push(line);
                    } else {
                        var line = new createLineB(count, ix, iy, _step, _thickness);
                        lines.push(line);
                    }
                }
            }
        }

        function render() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (var i = lines.length; i--;) {
                lines[i].draw();
            }
            ;
        }

        function animate() {
            requestAnimationFrame(animate);
            render();
        }

        function init() {
            onWindowResize();
            $(window).on('resize', onWindowResize);
            fillGrid();
        }

        $(document).ready(function () {
            init();
            animate();
        });


    })(this, this.document);
}

var isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};