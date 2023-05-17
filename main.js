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
const radius1 = 0.15;
const radius2 = 0.25;

const c0 = new THREE.Vector3(0.5, 0.5, -0.3);
const c1 = new THREE.Vector3(-0.35, 0.7, 0.3);
const c2 = new THREE.Vector3(-0.27, -0.3, -0.47);


const d1 = c1.clone().sub(c0);
const d2 = c2.clone().sub(c0);
const n1 = d1.clone().normalize();
const n2 = d2.clone().normalize();
const n = n1.clone().cross(n2).normalize();

const thales1 = d1.length() *(radius1 / (radius0 - radius1) + 1);
const cosAlpha = radius0 / (thales1);
const p1 = c0.clone().addScaledVector(n1, radius0*cosAlpha);

const thales2 = d2.length()*(radius2 / (radius0 - radius2) + 1);
const cosBeta = radius0 / (thales2);
const p2 = c0.clone().addScaledVector(n2, radius0*cosBeta);

const q1 = n.clone().cross(n1);
const q2 = n2.clone().cross(n);

const originDiff = p2.clone().sub(p1);
const t = (originDiff.x * q2.y - originDiff.y * q2.x) / (q1.x * q2.y - q1.y * q2.x);
const p = p1.clone().addScaledVector(q1, t);

const radiusP = Math.sqrt(radius0*radius0 - c0.distanceTo(p) * c0.distanceTo(p))

const pointT0 = p.clone().addScaledVector(n, radiusP);

const tangent = pointT0.clone().sub(c0).normalize();
const tangentDown = tangent.clone().reflect(n)



const pointT1 = c1.clone().addScaledVector(tangent, radius1)
const pointT2 = c2.clone().addScaledVector(tangent, radius2)
const pointT0D = c0.clone().addScaledVector(tangentDown, radius0)
const pointT1D = c1.clone().addScaledVector(tangentDown, radius1)
const pointT2D = c2.clone().addScaledVector(tangentDown, radius2)
const radiusP1 = Math.sqrt(radius0*radius0 - c0.distanceTo(p1) * c0.distanceTo(p1))
const radiusP2 = Math.sqrt(radius0*radius0 - c0.distanceTo(p2) * c0.distanceTo(p2))


const vertex = new THREE.Mesh(new THREE.SphereGeometry(0.01, 32, 32), new THREE.MeshLambertMaterial({color: 0x000000}))


const sphereGeo0 = new THREE.SphereGeometry(radius0, 64, 64);
const sphereGeo1 = new THREE.SphereGeometry(radius1, 64, 64);
const sphereGeo2 = new THREE.SphereGeometry(radius2, 64, 64);

const sphereMat0 = new THREE.MeshLambertMaterial({color: 0xff0000, wireframe: false, transparent: true, opacity:0.5});
const sphereMat1 = new THREE.MeshLambertMaterial({color: 0x00ff00, wireframe: false, transparent: true, opacity:0.5});
const sphereMat2 = new THREE.MeshLambertMaterial({color: 0x0000ff, wireframe: false, transparent: true, opacity:0.5});

const sphere0 = new THREE.Mesh(sphereGeo0, sphereMat0);
const sphere1 = new THREE.Mesh(sphereGeo1, sphereMat1);
const sphere2 = new THREE.Mesh(sphereGeo2, sphereMat2);

sphere0.position.copy(c0)
sphere1.position.copy(c1)
sphere2.position.copy(c2)

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
let triangleMat = new THREE.MeshLambertMaterial({color: 0x000000, side: THREE.DoubleSide, wireframe: true});
let triangle = new THREE.Mesh(geometry, triangleMat);

scene.add(triangle)

const sphereP1 = vertex.clone();
sphereP1.position.copy(p1);
scene.add(sphereP1)

const sphereP2 = vertex.clone();
sphereP2.position.copy(p2);
scene.add(sphereP2)


const arrowN = new THREE.ArrowHelper(n, c0, 1, 0xff0000);
const arrowN1 = new THREE.ArrowHelper(n1, c0, 1, 0x00ff00);
const arrowN2 = new THREE.ArrowHelper(n2, c0, 1, 0x0000ff);
scene.add(arrowN);
scene.add(arrowN1);
scene.add(arrowN2);




const arrowQ1 = new THREE.ArrowHelper(q1, p1, radiusP1, 0x008800);
const arrowQ2 = new THREE.ArrowHelper(q2, p2, radiusP2, 0x000088);
scene.add(arrowQ1)
scene.add(arrowQ2)


const arrowP = new THREE.ArrowHelper(n, p, radiusP, 0xff0000);
scene.add(arrowP);
const sphereP = vertex.clone();
sphereP.position.copy(p);
scene.add(sphereP)

const sphereT0 = vertex.clone();
sphereT0.position.copy(pointT0);
scene.add(sphereT0)

const sphereT1 = vertex.clone();
sphereT1.position.copy(pointT1);
scene.add(sphereT1)

const sphereT2 = vertex.clone();
sphereT2.position.copy(pointT2);
scene.add(sphereT2)

const arrowT0 = new THREE.ArrowHelper(tangent, c0, radius0, 0x008800);
scene.add(arrowT0)
const arrowT00 = new THREE.ArrowHelper(tangentDown, c0, radius0, 0x008800);
scene.add(arrowT00)
const arrowT1 = new THREE.ArrowHelper(tangent, c1, radius1, 0x008800);
scene.add(arrowT1)
const arrowT2 = new THREE.ArrowHelper(tangent, c2, radius2, 0x008800);
scene.add(arrowT2)




// const tangentGeo = new THREE.Geometry();
// tangentGeo.vertices.push(pointT0.clone());
// tangentGeo.vertices.push(pointT1.clone());
// tangentGeo.vertices.push(pointT2.clone());
// tangentGeo.vertices.push(pointT0D.clone());
// tangentGeo.vertices.push(pointT1D.clone());
// tangentGeo.vertices.push(pointT2D.clone());
// let ft = new THREE.Face3(0,1,2);
// let ft2 = new THREE.Face3(3,4,5);
// tangentGeo.faces.push(ft);
// tangentGeo.faces.push(ft2);
// tangentGeo.computeFaceNormals();
let tangentMat = new THREE.MeshLambertMaterial({color: 0x000000, side: THREE.DoubleSide, wireframe: true});
// let tangenttriangle = new THREE.Mesh(tangentGeo, tangentMat);
// scene.add(tangenttriangle)


// const planeGeo = new THREE.PlaneGeometry(10, 10);
// const planeMat = new THREE.MeshLambertMaterial({color: 0xffffff, side: THREE.DoubleSide});
// const plane = new THREE.Mesh(planeGeo, planeMat);
// plane.lookAt(tangent)
// plane.position.copy(pointT1)
// // scene.add(plane)

const circle1Geo = new THREE.CircleGeometry(radiusP1, 128)
const circle2Geo = new THREE.CircleGeometry(radiusP2, 128)

const circleMat = new THREE.LineBasicMaterial({	color: 0x000000});
// for(let i = 1; i < circle1Geo.)
const Lcircle1Geo = new THREE.BufferGeometry().setFromPoints(circle1Geo.vertices.slice(1))
const circle1Line = new THREE.LineLoop(Lcircle1Geo, circleMat);
scene.add(circle1Line)
circle1Line.lookAt(n1);
circle1Line.position.copy(p1)

const Lcircle2Geo = new THREE.BufferGeometry().setFromPoints(circle2Geo.vertices.slice(1))
const circle2Line = new THREE.LineLoop(Lcircle2Geo, circleMat);
scene.add(circle2Line)
circle2Line.lookAt(n2);
circle2Line.position.copy(p2)

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