import * as THREE from 'three';
import { Vector3 } from 'three';
import { Scene } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; 
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';

const canvas = document.querySelector('#maincanvas');
const scene = new Scene();
const camera = new THREE.PerspectiveCamera(50, 2, 0.1, 50);
const renderer = new THREE.WebGLRenderer({canvas});

const loader = new THREE.TextureLoader();

const controls = new OrbitControls(camera, canvas);

camera.rotation.set(2, 0, 0);
camera.position.set(0, -8, 2.5);

controls.minDistance = 2;
controls.maxDistance = 25;
// controls.enablePan = true;
// controls.controls.panSpeed = 0.6;
// controls.screenSpacePanning = false;
// controls.enableDamping = true;
// controls.dampingFactor = 0.08;
// controls.minPolarAngle = Math.PI / 2;
// controls.maxPolarAngle = Math.PI / 2;
// controls.panSpeed = 3
// controls.maxPolarAngle = 1

controls.update();









let labelRenderer = new CSS2DRenderer();
labelRenderer.setSize( window.innerWidth, window.innerHeight );
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0';
labelRenderer.domElement.style.left = '0';
labelRenderer.domElement.style.pointerEvents = 'none';

document.querySelector('body').appendChild(labelRenderer.domElement)




// scene.add(new THREE.AxesHelper(20))



let ambient = new THREE.AmbientLight(0xffffff, 0.5);
ambient.position.set(-1, 2, 4);
scene.add(ambient);

let sunLight = new THREE.PointLight(0xddddaa, 1.5, 500);
sunLight.position.set(1, -2, -4);
scene.add(sunLight);




// scene.fog = new THREE.FogExp2(0x00050505, 0.04)

const toolip = {
    textConfig: '',
}


const star =  {

    onHover: 'back to main page',
    starLink: 'https://elberd-chakhiev.github.io/slider-metaverse/',
    distanceToStar: new Vector3(),

    addNameStar(){

        this.starDiv = document.createElement( 'div' )
        this.starDiv.className = 'label'
        this.starDiv.textContent = 'star' 
        this.starDiv.style.marginTop = '-55px'
        this.starLabel = new CSS2DObject(this.starDiv)
        return this.starLabel
    },
    
    addLinkToMainPage(){
        this.stardivLink = document.createElement('a')
        this.stardivLink.href = this.starLink
        this.stardivLink.className = 'starLink'
        this.stardivLink.style.width = '80px'
        this.stardivLink.style.height = '80px'

        this.starLabelLink = new CSS2DObject(this.stardivLink)
        return this.starLabelLink
    },

    createStar(starWidth, starHeight, starDepth){
        this.starGeometry = new THREE.SphereGeometry(starWidth, starHeight, starDepth);
        this.starTexture = new THREE.MeshPhongMaterial({
            color: 0x0076FD98,
            emissive: 0x00D59CE8,
            shininess: 10
        });
        this.mesh = new THREE.Mesh(this.starGeometry, this.starTexture);
        return this.mesh
    },

    createStarGlow(texture, color) {
        this.starGlow = new THREE.SpriteMaterial({
            map: new THREE.TextureLoader().load(texture), 
            color: color
        });
        this.glow = new THREE.Sprite(this.starGlow); 
        this.glow.scale.set(3, 3, 3) 
        return this.glow 
    },

    changeLinkSize(){
        if(this.stardivLink.style.width !== `${880 / camera.position.distanceTo(this.distanceToStar).toFixed(2) }px`){
            this.stardivLink.style.width = `${880 / camera.position.distanceTo(this.distanceToStar).toFixed(2) }px`
            this.stardivLink.style.height = this.stardivLink.style.width
        }
    }


}

scene.add(star.addNameStar());
scene.add(star.addLinkToMainPage());
scene.add(star.createStar(0.3, 24, 24));
scene.add(star.createStarGlow('./img/world_glow2.png', 0x00D59CE8));





const planetSizes = [
    [0.3, 0.31, 0.29, 0.5, 0.6, 0.44, 0.4, 0.38, 0.3],
    [0.3, 0.32, 0.3, 0.51, 0.63, 0.45, 0.41, 0.4, 0.31],
];


let angle = 0;
const hoverColorOrbit = 0x00D59CE8;
// 0x0076FD98

class Orbit {
    constructor(name, orbitRadius, ringColor, planetLink){
        this.name = name
        this.orbitRadius = orbitRadius
        this.ringColor = ringColor 
        this.planetLink = planetLink

        
        this.planetDiv = document.createElement( 'div' ) 
        this.planetDiv.className = 'label' 
        this.planetDiv.textContent = name 
        this.planetDiv.style.marginTop = '-40px' 
        this.planetLabel = new CSS2DObject(this.planetDiv)
        
        this.positionPlanet = new Vector3()

    }


    createRings(innerRadius, outerRadius, thetaSegments){

        this.ringMaterial = new THREE.MeshBasicMaterial({
            color: this.ringColor, 
            side: THREE.DoubleSide
        });	
        this.ringGeometry = new THREE.RingGeometry(innerRadius, outerRadius, thetaSegments);
        this.ring = new THREE.Mesh(this.ringGeometry, this.ringMaterial);
        return this.ring
    
    }
    createPlanet(planetWidth, planetHeight, planetDepth, colorPlanet, opacity, texture, reflectMap, normalMap){
        this.planetGeometry = new THREE.SphereGeometry(planetWidth, planetHeight, planetDepth);
        this.planetTexture = new THREE.MeshStandardMaterial({
            color: colorPlanet, 
            transparent: opacity,
            // roughnessMap: loader.load(reflectMap),
            // normalMap: loader.load(normalMap),
            map: loader.load(texture)
    });
    
        this.planet = new THREE.Mesh(this.planetGeometry, this.planetTexture);
        return this.planet;
    
    }
    createClouds(planetWidth, planetHeight, planetDepth, colorPlanet, opacity, texture){
        this.cloudsGeometry = new THREE.SphereGeometry(planetWidth, planetHeight, planetDepth);
        this.cloudsTexture = new THREE.MeshPhongMaterial({
            color: colorPlanet, 
            transparent: opacity,
            depthWrite: false,
            map: loader.load(texture)
            
    
    });
    
    

        this.clouds = new THREE.Mesh(this.cloudsGeometry, this.cloudsTexture);
        
        return this.clouds;
    
    }
    addLinkToSoloPlanet(){
        this.planetdivLink = document.createElement('a')
        this.planetdivLink.href = this.planetLink
        // this.planetdivLink.className = 'starLink'
        this.planetdivLink.style.width = '80px'
        this.planetdivLink.style.height = '80px'

        this.planetLabelLink = new CSS2DObject(this.planetdivLink)

        return this.planetLabelLink
    }
    changeLinkSize(planetSizeDiff){
        if(this.planetdivLink.style.width !== `${30*planetSizeDiff + ((planetSizeDiff*3300) / camera.position.distanceTo(this.positionPlanet).toFixed(2)) }px`){
            this.planetdivLink.style.width = `${30*planetSizeDiff + ((planetSizeDiff*3300) / camera.position.distanceTo(this.positionPlanet).toFixed(2)) }px`
            this.planetdivLink.style.height = this.planetdivLink.style.width
        }
    }


}




const randomizeSppedPlanet = [
    3, 110, 40, 30, 22, 19, 17, 14, 12
];

const orbits = [
    new Orbit('Fashion Planet', 0 + 1.3 * 0, 0x004C4C4C,      '#'),
    new Orbit('Charity Ocean', 1 + 1.3 * 1, 0x004C4C4C,       '#'),
    new Orbit('Party Planet', 2 + 1.3 * 2, 0x004C4C4C,        '#'),
    new Orbit('Art Planet', 3 + 1.3 * 3, 0x004C4C4C,          '#'),
    new Orbit('Kids Planet', 4 + 1.3 * 4, 0x004C4C4C,         'http://weimei9l.beget.tech/solar-system/solo'),
    new Orbit('Education Planet', 5 + 1.3 * 5, 0x004C4C4C,    '#'),
    new Orbit('XXX Planet', 6 + 1.3 * 6, 0x004C4C4C,          '#'),
    new Orbit('COMING SOON', 7 + 1.3 * 7, 0x004C4C4C,         '#'),
    new Orbit('COMING SOON', 8 + 1.3 * 8, 0x004C4C4C,         '#'),
];

for(let i = 0; i < orbits.length; i++){

     
    scene.add(orbits[i].createRings(Number(orbits[i].orbitRadius) - 0.05, orbits[i].orbitRadius, 128+i*3))

    scene.add(orbits[i].createPlanet(
            planetSizes[0][i], 
            24, 24, 0xFFFFFF, 
            false, 
            `./img/planets/${i}/planet_diffuse.png`, 
            // `./img/planets/4/planet_reflect.png`, 
            // `./img/planets/4/planet_normal.png`, 

        ))

    scene.add(orbits[i].createClouds(planetSizes[1][i], 24, 24, 0xFFFFFF, 0.8, './img/planets/clouddif_planet_1.png'))
    scene.add(orbits[i].addLinkToSoloPlanet())


    orbits[i].planetDiv.style.marginTop = `-${planetSizes[0][i] * 200}px`
    scene.add(orbits[i].planetLabel)
    orbits[i].planetDiv.style.opacity = '0';


    // scene.remove(orbits[0].planet)
    // scene.remove(orbits[0].clouds)    
}
scene.remove(orbits[0].planetLabelLink)
scene.remove(orbits[0].planet)
scene.remove(orbits[0].clouds)
orbits[0].planetDiv.textContent = 'Star'    

// scene.remove(orbits[8].planet)



// ==========================================

const plan4Glow = new THREE.SpriteMaterial(
    {
        map: new THREE.TextureLoader().load('./img/world_glow2.png'), 
        color: 0x00D59CE8
    });
    const glowplanet = new THREE.Sprite(plan4Glow); 
    glowplanet.scale.set(5, 5, 5) 

scene.add(glowplanet);
// ==========================================




const rotatePlanets = () =>{
    angle += 0.006

    for(let i = 0; i < orbits.length; i++){
        // orbits[i].earthLabel.position.set(orbits[i].planet.position.x, orbits[i].planet.position.y, orbits[i].planet.position.z)
        orbits[i].planet.position.set(
            (i + 1.28 * i) * Math.cos(angle + i * -randomizeSppedPlanet[i]  * ( angle / 100) ), 
            (i + 1.28 * i) * Math.sin(angle + i * -randomizeSppedPlanet[i]  * ( angle / 100) ), 
            0,
        )
        orbits[i].planetLabel.position.x = orbits[i].clouds.position.x = orbits[i].planet.position.x
        orbits[i].planetLabel.position.y = orbits[i].clouds.position.y = orbits[i].planet.position.y
        
        orbits[i].positionPlanet.x =  orbits[i].planet.position.x
        orbits[i].positionPlanet.y =  orbits[i].planet.position.y
        orbits[i].positionPlanet.z =  orbits[i].planet.position.z


        orbits[i].planetLabelLink.position.x = orbits[i].positionPlanet.x
        orbits[i].planetLabelLink.position.y = orbits[i].positionPlanet.y

        orbits[i].planet.rotation.z += 0.006
        orbits[i].clouds.rotation.z += 0.008

    }

    // =============================
    glowplanet.position.x = orbits[4].planet.position.x
    glowplanet.position.y = orbits[4].planet.position.y
    // =============================
}


const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();


const onPointerMove = (event) =>{

	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    // console.log(setOrbitConfig)
	
}  

// let setOrbitConfig = '';


const paintOrbit = (index) => {

	for(let count = 0; count < orbits.length; count++){
		// planets[count].material.color.set(0xffffff);
		orbits[count].ring.material.color.set(0x004C4C4C);
		orbits[count].planet.material.color.set(0xFFFFFF);
		orbits[count].clouds.material.color.set(0xFFFFFF);
        orbits[count].planetDiv.style.opacity = '0';
        orbits[count].planetDiv.style.opacity = '0';
        // star.starLink.style.opacity = '0';
        orbits[count].planetdivLink.classList.remove('starLink-beta')
        orbits[count].planetdivLink.classList.remove('starLink')
		
	}
	
	// planets[index].material.color.set(hoverColorOrbit);

    if(orbits[index] === orbits[4]){
        orbits[index].planetdivLink.classList.add('starLink')
        orbits[index].ring.material.color.set(hoverColorOrbit);
    }else{
        orbits[index].planetdivLink.classList.add('starLink-beta')
    }
    
    orbits[index].planetDiv.style.opacity = '1';
}



const onHoverPlanet = () =>{

	raycaster.setFromCamera( pointer, camera );
	const intersects = raycaster.intersectObjects( scene.children );

	for ( let i = 0; i < intersects.length; i++ ) {
        
        if(intersects[i].object === orbits[1].planet || 
        intersects[i].object === orbits[1].planetdivLink || 
            intersects[i].object === orbits[1].clouds){	
			paintOrbit(1)
		}else if(intersects[i].object === orbits[2].planet || 
            intersects[i].object === orbits[2].planetdivLink ||
            intersects[i].object === orbits[2].clouds){
            paintOrbit(2)
		}else if(intersects[i].object === orbits[3].planet || 
            intersects[i].object === orbits[3].planetdivLink ||
            intersects[i].object === orbits[3].clouds){
            paintOrbit(3)
		}else if(intersects[i].object === orbits[4].planet || 
            intersects[i].object === orbits[4].planetdivLink ||
            intersects[i].object === orbits[4].clouds){
            paintOrbit(4)
		}else if(intersects[i].object === orbits[5].planet || 
            intersects[i].object === orbits[5].planetdivLink ||
            intersects[i].object === orbits[5].clouds){
            paintOrbit(5)
		}else if(intersects[i].object === orbits[6].planet || 
            intersects[i].object === orbits[6].planetdivLink ||
            intersects[i].object === orbits[6].clouds){
            paintOrbit(6)
		}else if(intersects[i].object === orbits[7].planet || 
            intersects[i].object === orbits[7].planetdivLink ||
            intersects[i].object === orbits[7].clouds){
            paintOrbit(7)
		}else if(intersects[i].object === orbits[8].planet || 
            intersects[i].object === orbits[8].planetdivLink ||
            intersects[i].object === orbits[8].clouds){
            paintOrbit(8)
		}
	}	
	
}
















let resizeRenderToDisplaySize = renderer =>{
	const canvas = renderer.domElement;
	const width = canvas.clientWidth;
	const height = canvas.clientHeight;
	const needResize = canvas.width !== width || canvas.height !== height;

	if(needResize){
		renderer.setSize(width, height, false);
	}
	return needResize;
}


const render = time =>{

    
    
    time *= 0.001;
    


    // console.log(`--------------`)
    // console.log(`x: ${camera.position.x} y: ${camera.position.y} z: ${camera.position.z}`)
    // console.log(`x: ${camera.rotation.x} y: ${camera.rotation.y} z: ${camera.rotation.z}`)

    rotatePlanets()
    onHoverPlanet()
    star.changeLinkSize()

    for(let i = 0; i < orbits.length; i++){
        orbits[i].changeLinkSize(planetSizes[0][i])
    }



    

	if(resizeRenderToDisplaySize(renderer)){
		const canvas = renderer.domElement;
		camera.aspect = canvas.clientWidth / canvas.clientHeight;
		camera.updateProjectionMatrix();
	}
    
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);


    requestAnimationFrame(render);
}
window.addEventListener('mousemove', onPointerMove)

requestAnimationFrame(render);


