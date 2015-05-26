'use strict';

var scene, camera, renderer, WIDTH, HEIGHT;
var defaultBacgroundColor = 'gray';
var defaultBackgroundAlpha = 1;

// ---------- Scene ----------
function createScene(dom, color, alpha) {
    WIDTH = dom.width();
    HEIGHT = dom.height();

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(WIDTH, HEIGHT);
    if( color === undefined ){
        color = defaultBacgroundColor;
    }
    if( alpha === undefined ){
        alpha = defaultBackgroundAlpha;
    }
    renderer.setClearColor( color, alpha );
    dom.append(renderer.domElement);
}

// ---------- Mesh ----------
function addCube(width, height, depth, color) {
    var geometry = new THREE.BoxGeometry(width, height, depth);
    var material = new THREE.MeshBasicMaterial({
        color: color
    });
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    return cube;
}

function addPlane(width, height, color) {
    var geometry = new THREE.PlaneGeometry(width, height);
    var material = new THREE.MeshBasicMaterial({
        color: color,
        side: THREE.DoubleSide
    });
    var plane = new THREE.Mesh(geometry, material);
    scene.add(plane);
    return plane;
}

function addSphere(radius, color) {
    var geometry = new THREE.SphereGeometry( radius, 32, 32 );
    var material = new THREE.MeshBasicMaterial( {color: color} );
    var sphere = new THREE.Mesh( geometry, material );
    scene.add( sphere );
    return sphere;
}

function addImage(width, height, image) {
    // THREE.ImageUtils.crossOrigin = '';
    var geometry = new THREE.PlaneGeometry(width, height);
    var material = new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture(image, {}, function() {
            renderer.render(scene, camera);
        })
    });
    var image = new THREE.Mesh(geometry, material);
    scene.add(image);
    return image;
}

// ---------- Camera ----------
function setCamera() {
    camera.position.z = 5;
}

// ---------- Render ----------
function render(animation) {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

function renderWithAnimation(animation) {
    function render() {
        requestAnimationFrame(render);
        if (animation) {
            animation();
        }
        renderer.render(scene, camera);
    }
    render();
}

// ---------- Events ----------
// http://gupuru.hatenablog.jp/entry/2013/12/02/190413
// http://qiita.com/edo_m18/items/5aff5c5e4f421ddd97dc
function addEventListner(objects, events, func) {
    $(window).on(events, function(e){
        if (e.target == renderer.domElement) {
            // スクリーン上のマウス位置を取得する
            var rect = e.target.getBoundingClientRect();
            var mouseX = e.clientX - rect.left;
            var mouseY = e.clientY - rect.top;

            // 取得したスクリーン座標を-1〜1に正規化する（WebGLは-1〜1で座標が表現される）
            mouseX = (mouseX / WIDTH) * 2 - 1;
            mouseY = -(mouseY / HEIGHT) * 2 + 1;

            // マウスベクトル
            var vector = new THREE.Vector3(mouseX, mouseY, 1);

            // vector はスクリーン座標系なので, オブジェクトの座標系に変換
            vector.unproject(camera);

            // 始点, 向きベクトルを渡してレイを作成
            var ray = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());

            // クリック(交差)判定
            var obj = ray.intersectObjects(objects);
            // 引数は取得対象となるMeshの配列を渡す。以下はシーン内のすべてのオブジェクトを対象に。
            // var objs = ray.intersectObjects(scene.children);
            //ヒエラルキーを持った子要素も対象とする場合は第二引数にtrueを指定する
            //var objs = ray.intersectObjects(scene.children, true);

            // クリックしていたら関数を実行  
            if (obj.length > 0) {
                func();
            }
        }
    });
}