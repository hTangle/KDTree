Qt.include("three.js")

var camera, scene, renderer;
var cube;

function initializeGL(canvas,centreX,centreY) {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(30,
                                         canvas.width/canvas.height, 1, 1000);
    camera.position.set(0, 0, 100);//设置相机位置
    camera.lookAt(new THREE.Vector3(0,0,0));//让相机指向原点
//    camera.fov=300;
    renderer = new THREE.Canvas3DRenderer(
                { canvas: canvas, antialias: true, devicePixelRatio: canvas.devicePixelRatio });
    renderer.setSize(canvas.width, canvas.height);
    var ambientLight = new THREE.AmbientLight( 0x606060 );
    scene.add( ambientLight );
    //平行光源
    var directionalLight = new THREE.DirectionalLight( 0xffffff );
    directionalLight.position.set( 1, 0.75, 0.5 ).normalize();
    scene.add( directionalLight );
    createParticles(centreX,centreY);
    plane();
}

function resizeGL(canvas) {
    camera.aspect = canvas.width / canvas.height;
    camera.updateProjectionMatrix();

    renderer.setPixelRatio(canvas.devicePixelRatio);
    renderer.setSize(canvas.width, canvas.height);
}

function paintGL(canvas) {
    renderer.render(scene, camera);
}
function addMulGeometry(arrX, arrZ, height) {
    // var arrX=[4,0,0,2.5,4];
    // var arrZ=[4,4,0,-2,0];
    // var height=4;
    var arrLength = arrX.length;
    var geometry = new THREE.Geometry();
    for (var i = 0; i < arrLength; i++) {
        geometry.vertices.push(new THREE.Vector3(arrX[i], height, arrZ[i]));
    }
    for (var i = 0; i < arrLength; i++) {
        geometry.vertices.push(new THREE.Vector3(arrX[i], 0, arrZ[i]));
    }
    for (var i = 0; i < arrLength; i++) {
        if (i + arrLength + 1 == 2 * arrLength) {
            geometry.faces.push(new THREE.Face3(i, (i + 1) % arrLength, arrLength));
            geometry.faces.push(new THREE.Face3(i, arrLength, i + arrLength));
        } else {
            geometry.faces.push(new THREE.Face3(i, (i + 1) % arrLength, i + arrLength + 1));
            geometry.faces.push(new THREE.Face3(i, i + arrLength + 1, i + arrLength));
        }
    }
    for (var i = 0; i < arrLength - 2; i++) {
        geometry.faces.push(new THREE.Face3(0, i + 2, i + 1));
    }
    for (var i = 0; i < arrLength - 2; i++) {
        geometry.faces.push(new THREE.Face3(arrLength, arrLength + i + 1, arrLength + i + 2));
    }
    geometry.computeFaceNormals();
    var material = new THREE.MeshLambertMaterial({//创建材料
                                                     color: 0x8DEEEE,
                                                     wireframe: false
                                                 });
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
}
//创建一个平面
function plane(){
    var planeGeo = new THREE.PlaneGeometry(100,100,10,10);//创建平面
    var planeMat = new THREE.MeshLambertMaterial({  //创建材料
                                                     color:0x666666,
                                                     wireframe:false
                                                 });
    var planeMesh = new THREE.Mesh(planeGeo, planeMat);//创建网格模型
    planeMesh.position.set(0, 0, -20);//设置平面的坐标
    planeMesh.rotation.x = -0.5 * Math.PI;//将平面绕X轴逆时针旋转90度
    scene.add(planeMesh);//将平面添加到场景中
}
//创建一个立方体
function cube(){
    var cubeGeo = new THREE.CubeGeometry(20, 20, 20, 5, 5, 5);//创建立方体
    var cubeMat = new THREE.MeshLambertMaterial({//创建材料
                                                    color:0x003300,
                                                    wireframe:false
                                                });
    var cubeMesh = new THREE.Mesh(cubeGeo, cubeMat);//创建立方体网格模型
    cubeMesh.position.set(20, 10, 0);//设置立方体的坐标
    scene.add(cubeMesh);//将立方体添加到场景中
}
var cloud;
function createParticles(centreX,centreY) {
    //几何体
    var geom = new THREE.Geometry();
    //粒子系统材质，
    var material = new THREE.PointsMaterial({
                                                    size: 1.5,
                                                    transparent: 1,
                                                    opacity: 0.6,
                                                    vertexColors: true,
                                                    sizeAttenuation: true,
                                                    blending:true,
                                                    color: 0xffffff
                                                });

    var range = 500;
    var createNums=500;
    for (var i = 0; i < centreX.length; i++) {
        var particle = new THREE.Vector3(centreX[i],
                                        centreY[i],0);
        console.log(centreX[i],centreY[i]);
        geom.vertices.push(particle);//点加入
        var color = new THREE.Color(0x00ff00);//默认,关于颜色的设置只在vertexColors设置为true时使用
        color.setHSL(color.getHSL().h, color.getHSL().s, 0.5);
        geom.colors.push(color);//颜色加入
    }
    cloud = new THREE.Points(geom, material);//粒子云系统
    cloud.name = 'particles';//命名名字，在重绘的时候使用
    scene.add(cloud);
}

