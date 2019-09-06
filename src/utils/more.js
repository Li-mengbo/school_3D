/*缓存数据*/
/*
function openDB (dbName, version, storeName) {
    return new Promise((resolve, reject) => {
      const indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
      const request = indexedDB.open(dbName, version)
      request.onsuccess = function (e) {
        resolve(e.target.result)
      } 
      request.onerror = function (e) {
        reject(e)
      } 
      request.onupgradeneeded = function (e) {
        const db = e.target.result
        if (!db.objectStoreNames.contains(storeName)) {
          const objectStore = db.createObjectStore(storeName, {
            keyPath: 'id',
            autoIncrement: true
          })
          objectStore.createIndex('index', 'filename', {
            unique: false
          })
          localStorage.setItem('storageDB', true);
        }
      } 
    })
}

function doSomethingToDb (dbName, version, storeName, data) {
    openDB(dbName, version, storeName)
      .then(db => {
        const tx = db.transaction(storeName, 'readwrite')
        const store = tx.objectStore(storeName)
        const req = store.put(data)
        req.onsuccess = res => {
          console.log('保存成功', res)
        } 
      })
      .catch(err => {
        console.error(err)
      })
}
*/

//  Files
/*
if(storageDB) {
    const request = indexedDB.open('worldDB', 1);

    request.addEventListener('success', e => {
        const db = e.target.result;
        const tx = db.transaction('Files','readwrite');

        const store = tx.objectStore('Files');

        // 获取数据
        const reqGet = store.get(index);

        reqGet.addEventListener('success', e => {
            if(!reqGet.result) {
                return false;
            }
            // console.log('--------------------------------------------', reqGet.result);
            const content = JSON.parse(reqGet.result.content);
            const position = JSON.parse(reqGet.result.position);
            const rotation = JSON.parse(reqGet.result.rotation);
            const scale = JSON.parse(reqGet.result.scale);
            // console.log(content)
            content.forEach((items, index) => {
                loader = new THREE.ObjectLoader();
                loader.parse(items, function(e) {
                    
                    var mesh = new THREE.Mesh( e.geometry, e.material );
                    // 修改大小
                    mesh.scale.set(scale[index].x, scale[index].y, scale[index].z)
                    // 定义旋转
                    mesh.rotation.set(rotation[index]._x, rotation[index]._y, rotation[index]._z);
                    // 修改位置坐标
                    mesh.position.y = position[index].y;
                    mesh.position.x = position[index].x;
                    mesh.position.z = position[index].z;
                    scene.add( mesh );
                }, '.');
            })

        })
    });
}else {
    loader = new THREE.GLTFLoader();
    //  
    loader.load(`${process.env.BASE_API}3dschool/School/${item.name}/${item.name}.gltf`, function (obj) {
        console.log(`模型返回值=====${item.name}`,obj)
        let gltfChildren = obj.scene.children;
        let scales = [];
        let positions = [];
        let rotations = [];
        let meshGeometry = [];
        let meshMaterial = [];
        let meshs = [];
        gltfChildren.forEach(items => {
            const scale = JSON.parse(JSON.stringify(items.scale));
            const position = JSON.parse(JSON.stringify(items.position));
            const rotation = JSON.parse(JSON.stringify(items.rotation));
            var mesh = new THREE.Mesh( items.geometry, items.material );
            // console.log(`模型返回值=====${item.name}`,JSON.parse(JSON.stringify(items)))
            // 定义大小
            mesh.scale.set(scale.x, scale.y, scale.z);
            // 定义旋转
            mesh.rotation.set(rotation._x, rotation._y, rotation._z);
            // 修改位置坐标
            mesh.position.y = position.y;
            mesh.position.x = position.x;
            mesh.position.z = position.z;
            scales.push(scale);
            positions.push(position);
            rotations.push(rotation);
            // meshGeometry.push(items.geometry);
            // meshMaterial.push(items.material);
            meshs.push(mesh)
            scene.add(mesh);
        })
        doSomethingToDb('worldDB', 1, 'Files', {
            "filename": item.name,
            "id": index,
            "content": JSON.stringify(meshs),
            // "contentGeometry": JSON.stringify(meshGeometry),
            // "meshMaterial": JSON.stringify(meshMaterial),
            "position": JSON.stringify(positions),
            "scale": JSON.stringify(scales),
            "rotation": JSON.stringify(rotations)
        })
    }, function (xhr) {

        console.log((xhr.loaded / xhr.total * 100) + '% loaded');

    }, function (error) {

        console.log('load error!' + error.getWebGLErrorMessage());

    })
}
*/