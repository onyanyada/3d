// シーンとカメラのセットアップ
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 環境光
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

// 3Dモデルのロード
const loader = new THREE.GLTFLoader();
loader.load('nose2.glb', (gltf) => {
    const model = gltf.scene;
    scene.add(model);
    camera.position.z = 3;

    // 鼻の幅スライダー
    const slider = document.getElementById('nose-slider');
    slider.addEventListener('input', (event) => {
        const value = parseFloat(event.target.value);
        model.traverse((child) => {
            if (child.isMesh) {
                child.morphTargetInfluences[0] = value; // シェイプキー調整
            }
        });
    });
});

// カメラ操作
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// レンダリングループ
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
