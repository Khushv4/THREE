import * as THREE from 'three';
import {OrbitControls} from "three/addons/controls/OrbitControls.js"
const canvas = document.getElementById('canvas');

//1.scene
const scene = new THREE.Scene();
scene.background= new THREE.Color('#F0F0F0')

//2. camera
const camera = new THREE.PerspectiveCamera(100, window.innerWidth/ window.innerHeight, 0.1, 1000 )
camera.position.z=5

//3.objects
const geometry =new THREE.DodecahedronGeometry()
const material = new THREE.MeshLambertMaterial({color:'#468585', emissive: '#468585'})
const dodecahedron = new THREE.Mesh(geometry, material)

const boxGeometry = new THREE.BoxGeometry(2,0.1,2)
const boxMaterial = new THREE.MeshStandardMaterial({color:'#B4B4B3', emissive:'#B4B4B3' })
const box = new THREE.Mesh(boxGeometry, boxMaterial)
box.position.y = -1.5

scene.add(dodecahedron)
scene.add(box)

//4.lights
const light = new THREE.SpotLight(0x006769, 100 )

light.position.set(1,1,1)
scene.add(light)


//5.renderer
const renderer = new THREE.WebGLRenderer({canvas})

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)



//6. controls
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.05
controls.enableZoom = true
controls.enablePan =true

//7.animate
function animate(){
  requestAnimationFrame(animate)
  dodecahedron.rotation.x +=0.01
  dodecahedron.rotation.y +=0.01

  box.rotation.y += 0.005

  controls.update()
  renderer.render(scene, camera)
}

//8. handle window resizing
window.addEventListener("resize", ()=>{
  camera.aspect = window.innerWidth/window.innerHeight
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight)
})
animate()