// ページの読み込みを待つ
window.addEventListener('load', init);
function init() {

  // サイズを取得
  const width = window.innerWidth;
  const height = window.innerHeight;

  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#myCanvas')
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height);
  // カメラの初期座標を設定
  camera.position.set(0, 0, 1000);

  // カメラコントローラーを作成
  const controls = new THREE.OrbitControls(camera);

  
  const textureLoader = new THREE.TextureLoader();
  let texture = textureLoader.load('./night_sky.jpg');
  
  //const materials = new THREE.MeshPhongMaterial();
  //materials.map = texture;
  const row = 5;
  const column = 3;
  const oneside = 250;
  const boxies = [column*row];
  
  for(var i=0;i<column;i++){
    for(var j=0; j<row;j++){
      // 箱を作成
      const geometry = new THREE.BoxGeometry(oneside, oneside, oneside);
      for (let k = 0 ; k < geometry.faceVertexUvs[0].length ; k++) {
        let uv;
        if (k % 2 === 0) {
          uv = [
            new THREE.Vector2(1/row * j, 1/column * (i+1)),
            new THREE.Vector2(1/row * j, 1/column * i),
            new THREE.Vector2(1/row * (j + 1), 1/column * (i+1))
          ];
        } else {
          uv = [
            new THREE.Vector2(1/row * j, 1/column * i),
            new THREE.Vector2(1/row * (j + 1), 1/column * i),
            new THREE.Vector2(1/row * (j + 1), 1/column * (i+1))
          ];
        }
        geometry.faceVertexUvs[0][k] = uv;
      }
      const materials = [
        new THREE.MeshLambertMaterial({color: 0x00ff00}),
        new THREE.MeshLambertMaterial({color: 0x0000ff}),
        new THREE.MeshLambertMaterial({color: 0x0000ff}),
        new THREE.MeshLambertMaterial({color: 0xff0000}),
        new THREE.MeshBasicMaterial({map: texture}),
        new THREE.MeshLambertMaterial({color: 0xff0000})
      ];
      boxies[i * row + j] = new THREE.Mesh(geometry, materials);
      boxies[i * row + j].position.set(j * (oneside) - ((row - 1) / 2) * (oneside), (i * (oneside) - ((column - 1) / 2) * (oneside)), 0);
      scene.add(boxies[i * row + j]);
    }
  }

  // 平行光源
  // const directionalLight = new THREE.DirectionalLight(0xFFFFFF);
  // directionalLight.position.set(1, 1, 1);
  // シーンに追加
  // scene.add(directionalLight);

  // 環境光源
  const ambientLight = new THREE.AmbientLight(0xFFFFFF);
  // シーンに追加
  scene.add(ambientLight);

  let rot = 0; // 角度
  let mouseX = 0; // マウス座標

  // マウス座標はマウスが動いた時のみ取得できる
  document.addEventListener("mousemove", (event) => {
    mouseX = event.pageX;
  });

  tick();

  // 毎フレーム時に実行されるループイベントです
  function tick() {

    // リサイズイベント発生時に実行
    window.addEventListener('resize', onResize);

    // レンダリング
    renderer.render(scene, camera);

    requestAnimationFrame(tick);
  }
  function onResize() {
    // サイズを取得
    const width = window.innerWidth;
    const height = window.innerHeight;
  
    // レンダラーのサイズを調整する
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
  
  }
}
