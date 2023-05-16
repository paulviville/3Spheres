import * as THREE from './three.module.js';
import { OrbitControls } from './OrbitsControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xeeeeee);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.001, 1000.0);
camera.position.set(0, 0.5, 5);
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

let ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
let pointLight0 = new THREE.PointLight(0xffffff, 1);
pointLight0.position.set(10,8,5);
scene.add(pointLight0);

const orbit_controls = new OrbitControls(camera, renderer.domElement)







const radius0 = 0.5;
const radius1 = 0.35;
const radius2 = 0.45;

const sphereGeo0 = new THREE.SphereGeometry(radius0, 64, 64);
const sphereGeo1 = new THREE.SphereGeometry(radius1, 64, 64);
const sphereGeo2 = new THREE.SphereGeometry(radius2, 64, 64);

const sphereMat0 = new THREE.MeshLambertMaterial({color: 0xff0000, wireframe: false, transparent: true, opacity:0.5});
const sphereMat1 = new THREE.MeshLambertMaterial({color: 0x00ff00, wireframe: false, transparent: true, opacity:0.5});
const sphereMat2 = new THREE.MeshLambertMaterial({color: 0x0000ff, wireframe: false, transparent: true, opacity:0.5});

const sphere0 = new THREE.Mesh(sphereGeo0, sphereMat0);
const sphere1 = new THREE.Mesh(sphereGeo1, sphereMat1);
const sphere2 = new THREE.Mesh(sphereGeo2, sphereMat2);

sphere0.position.set(0.5, 0.5, -0.3)
sphere1.position.set(-0.35, 0.7, 0.3)
sphere2.position.set(-0.27, -0.3, -0.47)

scene.add(sphere0)
scene.add(sphere1)
scene.add(sphere2)




const geometry = new THREE.Geometry();
geometry.vertices.push(sphere0.position.clone());
geometry.vertices.push(sphere1.position.clone());
geometry.vertices.push(sphere2.position.clone());

let f = new THREE.Face3(0,1,2);
geometry.faces.push(f);
geometry.computeFaceNormals();
let triangleMat = new THREE.MeshLambertMaterial({color: 0xffffff, side: THREE.DoubleSide});
let triangle = new THREE.Mesh(geometry, triangleMat);

scene.add(triangle)

function update(t)
{

}

function render()
{
	renderer.render(scene, camera);
}


function mainloop(t)
{
    update(t);
    render();
	requestAnimationFrame(mainloop);
}

mainloop(0);