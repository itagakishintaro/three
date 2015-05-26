'use strict';

// ---------- Scene ----------
createScene( $('#three') );

// ---------- Mesh ----------
for (var i = 1; i <= 10; i++) {
    var image = addImage(5, 5, 'img/img.png');
    image.position.x = -5 + Math.random() * 10;
    image.position.y = -5 + Math.random() * 10;
    image.position.z = -Math.random() * 50;
}
var cube = addCube(1, 1, 1, 'red');
var plane = addPlane(1, 1, 'blue');
plane.position.x += 2;
var sphere = addSphere(1, 'yellow');
sphere.position.y += 2;

// ---------- Camera ----------
setCamera();

// ---------- Render ----------
// render();
renderWithAnimation(function() {
    // cube.rotation.x += 0.01;
    // plane.rotation.x += 0.01;
    // sphere.rotation.x += 0.01;
    // camera.rotation.y += 0.01;
});

// ---------- Events ----------
// // scroll
// var lastScrollTop = 0;
// $(window).on('scroll', function(e) {
//     var st = $(this).scrollTop();
//     camera.position.z -= st - lastScrollTop;
//     lastScrollTop = st;
// });

// click
addEventListner([cube, plane, sphere], 'click', function(){ alert('clicked!'); });

// zoom
var zoomIntervalID;
var ZOOM_SPEED = 0.03;
$('#zoom-in').on('click', function(){
    clearInterval(zoomIntervalID);
    zoomIntervalID = setInterval(function(){
        camera.position.z -= ZOOM_SPEED;
    }, 10);
});
$('#zoom-out').on('click', function(){
    clearInterval(zoomIntervalID);
    zoomIntervalID = setInterval(function(){
        camera.position.z += ZOOM_SPEED;
    }, 10);
});

$('#zoom-stop').on('click', function(){
    clearInterval(zoomIntervalID);
});

// rotation
var rotationIntervalID;
var ROTATION_SPEED = 0.03;
$('#rotation-x').on('click', function(){
    clearInterval(rotationIntervalID);
    rotationIntervalID = setInterval(function(){
        camera.rotation.x += ROTATION_SPEED;
    }, 10);
});
$('#rotation-y').on('click', function(){
    clearInterval(rotationIntervalID);
    rotationIntervalID = setInterval(function(){
        camera.rotation.y += ROTATION_SPEED;
    }, 10);
});
$('#rotation-z').on('click', function(){
    clearInterval(rotationIntervalID);
    rotationIntervalID = setInterval(function(){
        camera.rotation.z += ROTATION_SPEED;
    }, 10);
});
$('#rotation-stop').on('click', function(){
    clearInterval(rotationIntervalID);
});