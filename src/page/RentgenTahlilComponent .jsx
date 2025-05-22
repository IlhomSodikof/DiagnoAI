import React, { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

// Mock DICOM ma'lumotlari
const createMockVolumeData = () => {
  const size = 128;
  const data = new Uint8Array(size * size * size);

  // Radius suyagi modeli
  for (let z = 0; z < size; z++) {
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const dx = x - size / 2;
        const dy = y - size / 2;
        const dz = z - size / 2;
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

        // Radius suyagi
        if (distance > 40 && distance < 50) {
          data[z * size * size + y * size + x] = 200; // Suyak
        }
        // Sinish joyi
        else if (x > 60 && x < 70 && distance < 55) {
          data[z * size * size + y * size + x] = 250; // Sinish
        }
        // Yumshoq to'qima
        else if (distance < 55) {
          data[z * size * size + y * size + x] = 50 + Math.random() * 30;
        }
      }
    }
  }

  return {
    data,
    dimensions: { x: size, y: size, z: size },
    spacing: { x: 1, y: 1, z: 1 },
    origin: [0, 0, 0]
  };
};

// 3D Volume ko'rinishi
const VolumeView = ({ volumeData }) => {
  const meshRef = useRef();
  const { scene, camera } = useThree();
  const [lut, setLut] = useState(() => {
    const lut = new THREE.Lut('rainbow', 512);
    lut.setMax(2000);
    lut.setMin(0);
    return lut;
  });

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.01;
    }
  });

  useEffect(() => {
    if (!volumeData) return;

    // Texture yaratish
    const texture = new THREE.DataTexture3D(
      volumeData.data,
      volumeData.dimensions.x,
      volumeData.dimensions.y,
      volumeData.dimensions.z
    );
    texture.format = THREE.RedFormat;
    texture.type = THREE.UnsignedByteType;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.unpackAlignment = 1;
    texture.needsUpdate = true;

    // Material yaratish
    const material = new THREE.ShaderMaterial({
      uniforms: {
        u_data: { value: texture },
        u_size: {
          value: new THREE.Vector3(
            volumeData.dimensions.x,
            volumeData.dimensions.y,
            volumeData.dimensions.z
          )
        },
        u_clim: { value: new THREE.Vector2(0, 2000) },
        u_renderstyle: { value: 0 },
        u_renderthreshold: { value: 0.5 },
        u_cmdata: { value: lut.texture }
      },
      vertexShader: `
        varying vec3 vPosition;
        varying vec4 vProjTexCoord;
        uniform mat4 texture_matrix;
        void main() {
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          vProjTexCoord = texture_matrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D u_cmdata;
        uniform sampler2D u_data;
        uniform vec3 u_size;
        uniform vec2 u_clim;
        uniform int u_renderstyle;
        uniform float u_renderthreshold;
        varying vec3 vPosition;
        varying vec4 vProjTexCoord;

        void main() {
          vec3 texCoord = (vPosition + 0.5) / u_size;
          float value = texture(u_data, texCoord).r;

          // Normalize value to [0, 1] range
          float normalizedValue = (value - u_clim.x) / (u_clim.y - u_clim.x);
          normalizedValue = clamp(normalizedValue, 0.0, 1.0);

          // Color mapping
          vec4 color = texture(u_cmdata, vec2(normalizedValue, 0.5));

          // Threshold rendering
          if (u_renderstyle == 1 && normalizedValue < u_renderthreshold) {
            discard;
          }

          gl_FragColor = color;
        }
      `,
      side: THREE.DoubleSide,
      transparent: true
    });

    // Mesh yaratish
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    meshRef.current = mesh;

    // Kamera pozitsiyasi
    camera.position.z = 2;

    return () => {
      scene.remove(mesh);
      texture.dispose();
      material.dispose();
      geometry.dispose();
    };
  }, [volumeData, scene, camera, lut]);

  return null;
};

// Asosiy komponent
const RentgenTahlilComponent = () => {
  const [volumeData, setVolumeData] = useState(null);
  const [windowLevel, setWindowLevel] = useState({ width: 2000, center: 1000 });
  const [viewMode, setViewMode] = useState('3d');
  const [abnormalities, setAbnormalities] = useState([]);

  useEffect(() => {
    // Mock ma'lumotlarni yaratish
    const mockData = createMockVolumeData();
    setVolumeData(mockData);

    // Mock anormalliklar
    setAbnormalities([
      {
        type: 'fracture',
        location: { x: 0.55, y: 0.5, z: 0.5 },
        size: { x: 0.1, y: 0.2, z: 0.1 },
        confidence: 0.87,
        description: 'Radius suyagi sinishi'
      },
      {
        type: 'lesion',
        location: { x: 0.4, y: 0.6, z: 0.5 },
        size: { x: 0.15, y: 0.15, z: 0.15 },
        confidence: 0.72,
        description: 'Shishli o\'zgarish'
      }
    ]);
  }, []);

  const handleWindowLevelChange = (type, value) => {
    const newWindowLevel = { ...windowLevel };
    if (type === 'width') newWindowLevel.width = value;
    if (type === 'center') newWindowLevel.center = value;
    setWindowLevel(newWindowLevel);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Boshqaruv paneli */}
      <div className="bg-white shadow-sm p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Rentgen Tahlil Dasturi</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setViewMode(viewMode === '3d' ? '2d' : '3d')}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            {viewMode === '3d' ? '2D Ko\'rinish' : '3D Ko\'rinish'}
          </button>
        </div>
      </div>

      {/* Asosiy ish maydoni */}
      <div className="flex-1 flex">
        {/* 3D Vizualizatsiya */}
        <div className="flex-1 bg-black relative">
          <Canvas camera={{ position: [0, 0, 2], fov: 75 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            {volumeData && <VolumeView volumeData={volumeData} />}
            <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
          </Canvas>
        </div>

        {/* Tahlil paneli */}
        <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto p-4">
          <h2 className="text-lg font-bold mb-4">Tahlil Natijalari</h2>

          <div className="mb-6">
            <h3 className="font-medium mb-2">Tasvir Sozlamalari</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm mb-1">Yorqinlik: {windowLevel.width}</label>
                <input
                  type="range"
                  min="500"
                  max="3000"
                  value={windowLevel.width}
                  onChange={(e) => handleWindowLevelChange('width', parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Kontrast: {windowLevel.center}</label>
                <input
                  type="range"
                  min="0"
                  max="2000"
                  value={windowLevel.center}
                  onChange={(e) => handleWindowLevelChange('center', parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-medium mb-2">Anormalliklar</h3>
            <ul className="space-y-2">
              {abnormalities.map((ab, idx) => (
                <li key={idx} className="p-2 border rounded-lg">
                  <div className="flex items-start">
                    <div
                      className={`w-3 h-3 rounded-full mt-1 mr-2 ${ab.type === 'fracture' ? 'bg-red-500' : 'bg-blue-500'
                        }`}
                    />
                    <div>
                      <p className="font-medium">{ab.description}</p>
                      <p className="text-sm text-gray-600">
                        Ishonchlilik: {Math.round(ab.confidence * 100)}%
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-2">Tashxis</h3>
            <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <p>Radius suyagi sinishi va yumshoq to'qimalarda shishli o'zgarishlar</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentgenTahlilComponent;