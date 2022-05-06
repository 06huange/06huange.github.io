var clock = new THREE.Clock();
var cameraStatus = 0;
let mixer;
const scene = new THREE.Scene();
raycaster = new THREE.Raycaster();
mouse = new THREE.Vector2()
const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 1000);
// const camera = new THREE.OrthographicCamera( -1, 1, 1, -1, 0.1, 1000 );

// Creates a rendering context (similar to canvas.getContext(webgl))
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.addEventListener("click", function(event){
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
    raycaster.setFromCamera(mouse, camera);
  
    var intersects = raycaster.intersectObject(scene, true);
  
    if (intersects.length > 0) {
      
        var object = intersects[0].object;
        object.material.color.set( Math.random() * 0xffffff );

    }
      
      renderer.render(scene, camera);
  }, false);

// Create camera controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
camera.position.z = 900;
camera.position.y = 15;
controls.update(); //controls.update() must be called after any manual changes to the camera's transform

// Adds a canvas element with that context to the HTML body
document.body.appendChild(renderer.domElement);



var pivot = new THREE.Object3D();
// Instantiate a loader
var purplePlanet;
var earth;
var jupiter;
var mars;
var pluto;
var satellite1;
var fire;
var rocket;
var rocketTimer;
var rocketObjects = []
var objects = [[earth,15],[jupiter,30],[mars,23],[pluto,45],[satellite1,17],[fire,15],[rocket,15]];

var loader = new THREE.GLTFLoader();
loader.load('models/earth/scene.gltf', function( gltf ){
    earth = gltf.scene;
    earth.scale.set(0.0005,0.0005,0.0005);
    earth.position.x = 15;
    earth.children[0].children[0].children[0].children[0].children[0].children[0].children[0].material.metalness = 0.5;
    console.log(earth);

    scene.add(earth);
});

loader.load('models/purple_planet/scene.gltf', function( gltf ){
    purplePlanet = gltf.scene;
    purplePlanet.castshadow = true;
    purplePlanet.scale.set(4,4,4);
    scene.add(purplePlanet);
});

loader.load('models/jupiter/scene.gltf', function( gltf ){
    jupiter = gltf.scene;
    jupiter.castshadow = true;
    jupiter.scale.set(0.002,0.002,0.002);
    jupiter.position.x = 30;
    scene.add(jupiter);
});

loader.load('models/mars/scene.gltf', function( gltf ){
    mars = gltf.scene;
    mars.castshadow = true;
    mars.scale.set(1.2,1.2,1.2);

    mars.position.x = 23;
    scene.add(mars);
});

loader.load('models/pluto/scene.gltf', function( gltf ){
    pluto = gltf.scene;
    pluto.position.x = 45;
    pluto.scale.set(0.01,0.01,0.01);
    scene.add(pluto);
});

loader.load('models/fire_animation/scene.gltf', function( gltf ){
    fire = gltf.scene;
    mixer = new THREE.AnimationMixer(fire);
	mixer.clipAction(gltf.animations[0]).play();
    fire.position.x = 0;
    fire.position.y = -5;
    fire.scale.set(1,1,1);
    fire.rotation.z = 3.14;
    scene.add(fire);
});

loader.load('models/satellite/scene.gltf', function( gltf ){
    satellite1 = gltf.scene;
    satellite1.position.x = 17;
    satellite1.scale.set(0.7,0.7,0.7);
    scene.add(satellite1);
});

loader.load('models/rocket/scene.gltf', function( gltf ){
    rocket = gltf.scene;
    rocket.position.x = 15;
    rocket.scale.set(0.2,0.2,0.2);
    rocket.add(fire);
    scene.add(rocket);
});

function makeRocket(){
    var userFire
    loader.load('models/fire_animation/scene.gltf', function( gltf ){
        userFire = gltf.scene;
        mixer = new THREE.AnimationMixer(fire);
        mixer.clipAction(gltf.animations[0]).play();
        userFire.position.x = 0;
        userFire.position.y = -5;
        userFire.scale.set(1,1,1);
        userFire.rotation.z = 3.14;
        scene.add(userFire);
    });

    loader.load('models/rocket/scene.gltf', function( gltf ){
        rocketUser = gltf.scene;
        rocketUser.position.x = 15;
        rocketUser.scale.set(0.2,0.2,0.2);
        rocketUser.add(userFire);
        rocketObjects.push(rocketUser);
        scene.add(rocketUser);
    });
}

loader.load('models/hand/scene.gltf', function( gltf ){
    model = gltf.scene;

    //scale
    model.scale.set(60,60,60);

    //rotation
    model.rotation.x = 3;
    model.rotation.z = 1;

    //translate
    model.position.x = -20;
    model.position.y = -20;
    model.castshadow = true;
    scene.add(model);
});


// Creates a point light source
const light1 = new THREE.PointLight( 0xffffff, 1, 100 );
light1.position.set(10, 10, 10);
scene.add(light1);

// Creates a point light source
const light2 = new THREE.PointLight( 0xffffff, 1, 100 );
light2.position.set(1, 1, 1);
scene.add(light2);

const light3 = new THREE.AmbientLight( 0xffffff, 1 );
scene.add(light3);

//Create a matrix
var matrix = new THREE.Matrix4();
//Rotate the matrix
matrix.makeRotationY((Math.PI / 2)/200);

var matrix1 = new THREE.Matrix4();
//Rotate the matrix
matrix1.makeRotationY(Math.PI / 2);

window.addEventListener("click",function(event){
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObject(scene, true);

    if (intersects.length > 0) {
    
        var object = intersects[0].object;
        if(object.name == "EARTHLayer8_06_0"){
            if (cameraStatus == 0){
                cameraStatus = 1;
                var elem = document.getElementById('earth');
                elem.style.display = "block";
            }
            else{
                makeRocket();
            }
            camera.position.set(0,10,0);
        }
        else{
            object.material.color.set( Math.random() * 0xffffff );
        }
    }
})

window.addEventListener("keydown",(e) => {
    if(e.key == "Escape"){
        cameraStatus = 0;
        camera.position.set(0,15,40);
        var elem = document.getElementById('earth');
        elem.style.display = "none";
    }
});

function draw() {
    requestAnimationFrame(draw);

    if(clock.elapsedTime > 5 && clock.elapsedTime < 10){
            camera.position.y = 15;
            camera.position.z -= (camera.position.z-40)/80;
            camera.lookAt(0,0,0);

    }
    if(purplePlanet){
        purplePlanet.rotation.y += 0.01;
    }
    if(earth){
        earth.rotation.y += 0.01;
        earth.position.applyMatrix4(matrix);
    }
    if(satellite1){
        /// step 1: calculate move direction and move distance:
        satellite1.rotation.y += 0.01;
        satellite1.rotation.x += 0.01;

        satellite1.position.applyMatrix4(matrix);
    }
    if(jupiter){
        jupiter.rotation.y += 0.01;
        jupiter.position.applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI / 540));
    }
    if(mars){
        mars.rotation.y += 0.01;
        mars.position.applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI / 340));
    }
    if(pluto){
        pluto.rotation.y += 0.01;
        pluto.position.applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI / 460));
    }
    if ( mixer ) mixer.update( clock.getDelta() );
    
    if(rocket){
        if(earth){
            rocket.position.x = earth.position.x;
            rocket.position.z = earth.position.z;
        }
        if(clock.elapsedTime > 15){
            rocket.position.y += 0.01;
        }
        if(rocket.position.y > 20){
            rocket.position.y = 0;
        }
    }
    rocketObjects.forEach(function(element,i) {
        if(element){
            if(rocket.position.y < 20){
                element.position.x = earth.position.x;
                element.position.z = earth.position.z;
                rocket.position.y += 0.01;
            }
            else{
                scene.remove(element);
                rocketObjects.splice(i,1);
            }
        }
    })
    
    if(clock.elapsedTime > 10){
    switch (cameraStatus){
        case 0:
            camera.lookAt(0,0,0);
            camera.position.applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI / 840));
            break;
        case 1:
            camera.lookAt(earth.position);
            camera.position.applyMatrix4(matrix);
            break;    
    }
}
    renderer.render(scene, camera);
}


draw();
