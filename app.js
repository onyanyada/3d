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

    // スライダーの設定
    const sliders = {
        'nose-height-slider': 0, // NoseHight: シェイプキーのインデックス0
        'nose-bridge-slider': 1, // NoseBridge: シェイプキーのインデックス1
        'lip-thickness-slider': 2, // LipThickness: シェイプキーのインデックス2
    };

    Object.keys(sliders).forEach((sliderId) => {
        const slider = document.getElementById(sliderId);
        slider.addEventListener('input', (event) => {
            const value = parseFloat(event.target.value);
            const morphIndex = sliders[sliderId];

            model.traverse((child) => {
                if (child.isMesh && child.morphTargetInfluences) {
                    child.morphTargetInfluences[morphIndex] = value; // シェイプキー調整
                }
            });
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
