import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { USDZLoader } from 'three/examples/jsm/loaders/USDZLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

//import { USDZLoader } from "three-usdz-loader";


const USDZViewer = () => {
 const containerRef = useRef();

 useEffect(() => {
   let camera, scene, renderer;


   const init = async () => {
     camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
     camera.position.set(0, 0.75, -1);


     scene = new THREE.Scene();
     scene.background = new THREE.Color(0x808080);


     scene.add(new THREE.GridHelper(2, 4, 0xFFFFFF, 0xFFFFFF));


     const light = new THREE.DirectionalLight(0xffffff, 0);
     light.position.set(1, 1, 1);
     light.castShadow = true;
     scene.add(light);
     


     const light2 = new THREE.HemisphereLight(0xdddddd, 0xffffff, 30);
     //scene.add(light2);


     renderer = new THREE.WebGLRenderer({ antialias: true });
     renderer.setPixelRatio(window.devicePixelRatio);
     renderer.setSize(window.innerWidth, window.innerHeight);
     renderer.shadowMap.enabled = true;
     renderer.shadowMap.type = THREE.PCFSoftShadowMap;
     containerRef.current.appendChild(renderer.domElement);


     const controls = new OrbitControls(camera, renderer.domElement);
     controls.minDistance = 1;
     controls.maxDistance = 300;


     //USDZ
/*
     const loader = new USDZLoader();
     const group = new THREE.Group();
     scene.add(group);
     const loadedModel = await loader.loadFile("/baked.usdz", group);
     loadedModel.clean()
     */
/*
     const usdzloader = new USDZLoader();
     usdzloader.load('/convertedFinalmazlis.usdz', function (usd) {
       scene.add(usd);
     });


     */
     const hdrUrl = 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/dikhololo_night_2k.hdr'
     new RGBELoader().load(hdrUrl, texture => {
       const gen = new THREE.PMREMGenerator(renderer)
       const envMap = gen.fromEquirectangular(texture).texture
       scene.environment = envMap
       scene.environmentIntensity = 10 //controls the intensity 1 is the default 
       //scene.background = envMap
       
       texture.dispose()
       gen.dispose()
     })
      // Create a video element
      const videoMain = document.createElement('video');
      videoMain.src = 'Comp 1.mp4';  // Replace with your video file path
      videoMain.crossOrigin = 'anonymous';
      videoMain.loop = true;
      videoMain.muted = true;
      videoMain.play();
      // Create a video texture
      const videoTextureMain = new THREE.VideoTexture(videoMain);
      //videoTextureMain.wrapS = THREE.RepeatWrapping;
      //videoTextureMain.repeat.x = - 1;
      videoTextureMain.flipY = false
      videoTextureMain.minFilter = THREE.LinearFilter;
      videoTextureMain.magFilter = THREE.LinearFilter;
      videoTextureMain.format = THREE.RGBFormat

      // Create a video element
      const videowall = document.createElement('video');
      videowall.src = 'Walltv.mp4';  // Replace with your video file path
      videowall.crossOrigin = 'anonymous';
      videowall.loop = true;
      videowall.muted = true;
      videowall.play();
      // Create a video texture
      const videoTextureWall = new THREE.VideoTexture(videowall);
      videoTextureWall.flipY = false
      videoTextureWall.minFilter = THREE.LinearFilter;
      videoTextureWall.magFilter = THREE.LinearFilter;
      videoTextureWall.format = THREE.RGBFormat

      // Create a video element
      const video = document.createElement('video');
      video.src = '190624Finalzone1.mp4';  // Replace with your video file path
      video.crossOrigin = 'anonymous';
      video.loop = true;
      video.muted = true;
      video.play();
      // Create a video texture
      const videoTexture = new THREE.VideoTexture(video);
      videoTexture.flipY = false
      videoTexture.minFilter = THREE.LinearFilter;
      videoTexture.magFilter = THREE.LinearFilter;
      videoTexture.format = THREE.RGBFormat



     const loader = new GLTFLoader();
     try {
       const gltf = await loader.loadAsync('/finalmazlisFinal2.glb');
       const model = gltf.scene
       scene.add(model);
       model.traverse((child) => {
        if (child.isMesh && child.name === 'screens') {
          console.log(child.name)
          child.material.map = videoTextureMain;
          //child.material.emissive = new THREE.Color( 0x585858);
          //child.material.emissiveIntensity = 6
          //child.material.emissiveMap = videoTextureMain;
          child.material.needsUpdate = true;
          videoTextureMain.dispose()
        }
        if (child.isMesh && child.name === 'screensWall') {
          child.material.map = videoTextureWall;
          child.material.needsUpdate = true;
          videoTextureWall.dispose()
        }
        if(child.isMesh && child.name === 'tv') {
          child.material.map = videoTexture;
          child.material.needsUpdate = true;
          videoTexture.dispose()
        }
      });
     } catch (error) {
       console.error('An error occurred while loading the GLB file:', error);
     }




     window.addEventListener('resize', onWindowResize);
   };


   const onWindowResize = () => {
     camera.aspect = window.innerWidth / window.innerHeight;
     camera.updateProjectionMatrix();
     renderer.setSize(window.innerWidth, window.innerHeight);
   };


   const animate = () => {
     requestAnimationFrame(animate);
     renderer.render(scene, camera);
   };


   init();
   animate();


   return () => {
     window.removeEventListener('resize', onWindowResize);
     if (containerRef.current) {
       containerRef.current.removeChild(renderer.domElement);
     }
   };
 }, []);


 return (
   <div className="relative w-full h-screen">
     <div ref={containerRef} className="absolute inset-0" />
     <div id="info" className="absolute top-0 left-0 p-2 bg-white text-black z-10">
       <a href="https://threejs.org" target="_blank" rel="noopener noreferrer">
         three.js
       </a>{' '}
       - USDZLoader
     </div>
   </div>
 );
};


export default USDZViewer;
