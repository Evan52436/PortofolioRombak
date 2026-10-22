import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Scene3DProps {
  isDark: boolean;
}

export const Scene3D: React.FC<Scene3DProps> = ({ isDark }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDarkRef = useRef(isDark);
  isDarkRef.current = isDark;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    const lightBg = new THREE.Color(0x07070a);
    const darkBg = new THREE.Color(0x07070a);
    const currentBg = darkBg.clone();

    scene.fog = new THREE.FogExp2(0x07070a, 0.02);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      200
    );
    camera.position.set(0, 0, 16);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    container.appendChild(renderer.domElement);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xfff6e8, 2.0);
    dirLight1.position.set(10, 15, 12);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xb8c5e6, 1.2);
    dirLight2.position.set(-10, -10, -5);
    scene.add(dirLight2);

    const mouseLight = new THREE.PointLight(0xd4a359, 2.5, 25);
    scene.add(mouseLight);

    // --- Mouse & Scroll State ---
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const scroll = {
      current: 0,
      target: 0,
      velocity: 0,
      last: 0,
    };
    const darkTransition = { current: isDarkRef.current ? 1 : 0 };

    // --- SECTION 1: HERO - Celestial Armillary Sphere ---
    const heroGroup = new THREE.Group();
    heroGroup.position.set(0, 0, 0);

    // Golden / Bronze material & Obsidian material
    const bronzeMat = new THREE.MeshStandardMaterial({
      color: 0x9c7a3c,
      roughness: 0.35,
      metalness: 0.75,
    });
    const darkRingMat = new THREE.MeshStandardMaterial({
      color: 0x222329,
      roughness: 0.5,
      metalness: 0.5,
    });
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x3d3a33,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });

    // 3 Concentric Rings
    const ring1 = new THREE.Mesh(
      new THREE.TorusGeometry(3.6, 0.035, 16, 100),
      bronzeMat
    );
    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(3.1, 0.03, 16, 100),
      darkRingMat
    );
    const ring3 = new THREE.Mesh(
      new THREE.TorusGeometry(2.6, 0.025, 16, 100),
      bronzeMat
    );

    // Inner Core: Icosahedron
    const coreGeo = new THREE.IcosahedronGeometry(1.6, 1);
    const coreWire = new THREE.Mesh(coreGeo, wireMat);
    const innerCore = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.9, 0),
      new THREE.MeshStandardMaterial({
        color: 0xbfa15f,
        roughness: 0.2,
        metalness: 0.8,
      })
    );

    // Small Orbiting Satellite
    const orbiter = new THREE.Mesh(
      new THREE.SphereGeometry(0.18, 16, 16),
      new THREE.MeshStandardMaterial({
        color: 0x111218,
        roughness: 0.2,
        metalness: 0.9,
      })
    );
    orbiter.position.set(3.1, 0, 0);
    const orbiterGroup = new THREE.Group();
    orbiterGroup.add(orbiter);

    heroGroup.add(ring1, ring2, ring3, coreWire, innerCore, orbiterGroup);
    scene.add(heroGroup);

    // --- SECTION 2: ABOUT - Vitruvian Monolith & Coordinates Grid ---
    const aboutGroup = new THREE.Group();
    aboutGroup.position.set(0, -18, 0);

    const monolithGeo = new THREE.BoxGeometry(2.4, 4.2, 0.4);
    const monolithMat = new THREE.MeshStandardMaterial({
      color: 0x424039,
      roughness: 0.6,
      metalness: 0.3,
    });
    const monolith = new THREE.Mesh(monolithGeo, monolithMat);

    // Wireframe bounding frame
    const frameGeo = new THREE.BoxGeometry(3.2, 5.0, 1.2);
    const frameWire = new THREE.Mesh(
      frameGeo,
      new THREE.MeshBasicMaterial({
        color: 0x7a776c,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      })
    );

    // Floating corner nodes
    const cornerNodes: THREE.Mesh[] = [];
    const cornerGeo = new THREE.SphereGeometry(0.08, 12, 12);
    const cornerMat = new THREE.MeshBasicMaterial({ color: 0x9c7a3c });
    const cCoords = [
      [-1.6, -2.5, -0.6],
      [1.6, -2.5, -0.6],
      [-1.6, 2.5, -0.6],
      [1.6, 2.5, -0.6],
      [-1.6, -2.5, 0.6],
      [1.6, -2.5, 0.6],
      [-1.6, 2.5, 0.6],
      [1.6, 2.5, 0.6],
    ];
    cCoords.forEach(([x, y, z]) => {
      const node = new THREE.Mesh(cornerGeo, cornerMat);
      node.position.set(x, y, z);
      cornerNodes.push(node);
      aboutGroup.add(node);
    });

    aboutGroup.add(monolith, frameWire);
    scene.add(aboutGroup);

    // --- SECTION 3: INFRASTRUCTURE / HOMELAB - 3D Node Cluster ---
    const infraGroup = new THREE.Group();
    infraGroup.position.set(0, -36, 0);

    // Two main server nodes: Node A (Fedora Wyse), Node B (Armbian NAS)
    const serverMatA = new THREE.MeshStandardMaterial({
      color: 0x1f2937,
      roughness: 0.3,
      metalness: 0.7,
    });
    const serverMatB = new THREE.MeshStandardMaterial({
      color: 0xd4a359,
      roughness: 0.4,
      metalness: 0.6,
    });

    const serverA = new THREE.Mesh(
      new THREE.BoxGeometry(2.0, 1.0, 1.6),
      serverMatA
    );
    serverA.position.set(-2.2, 0.6, 0);

    const serverB = new THREE.Mesh(
      new THREE.BoxGeometry(2.0, 1.0, 1.6),
      serverMatB
    );
    serverB.position.set(2.2, -0.6, 0);

    // Wireframe cages
    const wireCageA = new THREE.Mesh(
      new THREE.BoxGeometry(2.3, 1.3, 1.9),
      new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        wireframe: true,
        transparent: true,
        opacity: 0.4,
      })
    );
    wireCageA.position.copy(serverA.position);

    const wireCageB = new THREE.Mesh(
      new THREE.BoxGeometry(2.3, 1.3, 1.9),
      new THREE.MeshBasicMaterial({
        color: 0x22c55e,
        wireframe: true,
        transparent: true,
        opacity: 0.4,
      })
    );
    wireCageB.position.copy(serverB.position);

    // Connecting Curve between Node A & Node B with pulsating packet
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-2.2, 0.6, 0),
      new THREE.Vector3(0, 1.8, 1.2),
      new THREE.Vector3(2.2, -0.6, 0),
    ]);
    const curvePoints = curve.getPoints(50);
    const curveGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);
    const curveLine = new THREE.Line(
      curveGeo,
      new THREE.LineBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.5,
      })
    );

    // 4 Pulsing data packets traveling along the curve
    const packetGeo = new THREE.SphereGeometry(0.12, 12, 12);
    const packetMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const packets = [0, 0.25, 0.5, 0.75].map((t) => {
      const mesh = new THREE.Mesh(packetGeo, packetMat);
      mesh.userData = { t };
      infraGroup.add(mesh);
      return mesh;
    });

    infraGroup.add(serverA, serverB, wireCageA, wireCageB, curveLine);
    scene.add(infraGroup);

    // --- SECTION 4: PROJECTS - Mathematical Torus Knot ---
    const projectsGroup = new THREE.Group();
    projectsGroup.position.set(0, -54, 0);

    const torusGeo = new THREE.TorusKnotGeometry(2.0, 0.5, 120, 24, 2, 3);
    const torusMat = new THREE.MeshStandardMaterial({
      color: 0xd4a359,
      roughness: 0.25,
      metalness: 0.85,
    });
    const torusMesh = new THREE.Mesh(torusGeo, torusMat);

    const torusWire = new THREE.Mesh(
      torusGeo,
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.15,
      })
    );

    projectsGroup.add(torusMesh, torusWire);
    scene.add(projectsGroup);

    // --- SECTION 5: SECURITY / COMPETITIONS - Cryptographic Cipher Ring ---
    const cipherGroup = new THREE.Group();
    cipherGroup.position.set(0, -72, 0);

    const cipherRotor1 = new THREE.Mesh(
      new THREE.CylinderGeometry(2.4, 2.4, 0.35, 32, 1, true),
      new THREE.MeshStandardMaterial({
        color: 0x24283b,
        roughness: 0.4,
        metalness: 0.8,
        side: THREE.DoubleSide,
      })
    );
    const cipherRotor2 = new THREE.Mesh(
      new THREE.CylinderGeometry(1.8, 1.8, 0.35, 24, 1, true),
      new THREE.MeshStandardMaterial({
        color: 0xb89047,
        roughness: 0.3,
        metalness: 0.7,
        side: THREE.DoubleSide,
      })
    );
    const octMesh = new THREE.Mesh(
      new THREE.OctahedronGeometry(1.2, 0),
      new THREE.MeshBasicMaterial({
        color: 0xef4444,
        wireframe: true,
        transparent: true,
        opacity: 0.6,
      })
    );

    cipherGroup.add(cipherRotor1, cipherRotor2, octMesh);
    scene.add(cipherGroup);

    // --- SECTION 6: CONTACT - Transmission Beacon ---
    const contactGroup = new THREE.Group();
    contactGroup.position.set(0, -90, 0);

    const beaconGeo = new THREE.CylinderGeometry(0.1, 0.6, 5.0, 16);
    const beaconMat = new THREE.MeshStandardMaterial({
      color: 0xb89047,
      roughness: 0.3,
      metalness: 0.9,
    });
    const beacon = new THREE.Mesh(beaconGeo, beaconMat);

    // Radiating signal rings
    const signalRings: THREE.Mesh[] = [];
    for (let i = 0; i < 4; i++) {
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.5 + i * 0.9, 0.55 + i * 0.9, 32),
        new THREE.MeshBasicMaterial({
          color: 0xd4a359,
          transparent: true,
          opacity: 0.4,
          side: THREE.DoubleSide,
        })
      );
      ring.rotation.x = Math.PI / 2;
      ring.position.y = 2.5;
      ring.userData = { initialScale: 1 + i * 0.4, speed: 0.02 + i * 0.005 };
      signalRings.push(ring);
      contactGroup.add(ring);
    }

    contactGroup.add(beacon);
    scene.add(contactGroup);

    // --- ATMOSPHERIC PARTICLES (Dust in light, Stardust in dark) ---
    const particleCount = 450;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 35;
      particlePos[i + 1] = -Math.random() * 95 + 10;
      particlePos[i + 2] = (Math.random() - 0.5) * 20;
    }
    particleGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(particlePos, 3)
    );

    const particleMat = new THREE.PointsMaterial({
      size: 0.09,
      color: 0x4a473f,
      transparent: true,
      opacity: 0.45,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // --- EVENT LISTENERS ---
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);

    // --- ANIMATION LOOP ---
    const clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const delta = Math.min(clock.getDelta(), 0.05);
      const elapsedTime = clock.getElapsedTime();

      // Mouse smoothing
      mouse.x += (mouse.targetX - mouse.x) * (delta * 6);
      mouse.y += (mouse.targetY - mouse.y) * (delta * 6);

      // Scroll interpolation
      const docHeight = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      const scrollY = (window as unknown as { __lenis?: { scroll: number } }).__lenis
        ? (window as unknown as { __lenis: { scroll: number } }).__lenis.scroll
        : window.scrollY;

      scroll.target = Math.min(Math.max(scrollY / docHeight, 0), 1);
      scroll.current += (scroll.target - scroll.current) * (delta * 8);
      scroll.velocity = scroll.current - scroll.last;
      scroll.last = scroll.current;

      const p = scroll.current;
      const targetCamY = -p * 90;

      // Camera motion with smooth parallax
      camera.position.x += (mouse.x * 0.9 - camera.position.x) * (delta * 4);
      camera.position.y += (targetCamY - camera.position.y) * (delta * 6);
      camera.position.z = 16 - Math.sin(p * Math.PI) * 1.5;

      const lookTarget = new THREE.Vector3(mouse.x * 0.8, camera.position.y - 0.5, 0);
      camera.lookAt(lookTarget);

      // Mouse point light follows cursor
      mouseLight.position.set(mouse.x * 10, camera.position.y + mouse.y * 6, camera.position.z - 4);

      // Fog & Theme color transition
      const targetDark = isDarkRef.current ? 1 : 0;
      darkTransition.current += (targetDark - darkTransition.current) * (delta * 3.5);

      currentBg.copy(lightBg).lerp(darkBg, darkTransition.current);
      scene.fog.color.copy(currentBg);

      // Update particle appearance based on dark mode
      if (darkTransition.current > 0.4) {
        particleMat.color.setHex(0xe2e8f0);
        particleMat.size = 0.12;
        particleMat.opacity = 0.55;
      } else {
        particleMat.color.setHex(0x4a473f);
        particleMat.size = 0.08;
        particleMat.opacity = 0.35;
      }

      // Visibility clipping helper for sections
      const updateSectionVisibility = (group: THREE.Group, anchorY: number, spread = 18) => {
        const dist = Math.abs(camera.position.y - anchorY);
        const visibility = Math.max(0, 1 - dist / spread);
        group.visible = visibility > 0.02;
        group.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            const mat = mesh.material;
            if (mat && !Array.isArray(mat)) {
              if (mat.transparent) {
                mat.opacity = (mat.userData.baseOpacity ?? 0.9) * visibility;
              }
            }
          }
        });
      };

      updateSectionVisibility(heroGroup, 0, 16);
      updateSectionVisibility(aboutGroup, -18, 16);
      updateSectionVisibility(infraGroup, -36, 16);
      updateSectionVisibility(projectsGroup, -54, 16);
      updateSectionVisibility(cipherGroup, -72, 16);
      updateSectionVisibility(contactGroup, -90, 16);

      // --- HERO ANIMATIONS ---
      ring1.rotation.x += 0.006 + scroll.velocity * 0.3;
      ring1.rotation.y += 0.008;
      ring2.rotation.y += 0.009;
      ring2.rotation.z += 0.007;
      ring3.rotation.z += 0.011;
      ring3.rotation.x += 0.005;
      coreWire.rotation.y += 0.005;
      innerCore.rotation.y += 0.008;
      innerCore.rotation.x += 0.006;
      orbiterGroup.rotation.y += 0.015;
      orbiterGroup.rotation.z += 0.008;

      // --- ABOUT ANIMATIONS ---
      monolith.rotation.y = Math.sin(elapsedTime * 0.8) * 0.2 + mouse.x * 0.3;
      monolith.rotation.x = mouse.y * 0.2;
      frameWire.rotation.y -= 0.004;

      // --- INFRASTRUCTURE ANIMATIONS ---
      wireCageA.rotation.y += 0.008;
      wireCageB.rotation.y -= 0.008;
      packets.forEach((packet) => {
        packet.userData.t = (packet.userData.t + delta * 0.4) % 1;
        const pt = curve.getPoint(packet.userData.t);
        packet.position.copy(pt);
      });

      // --- PROJECTS ANIMATIONS ---
      torusMesh.rotation.x += 0.007 + scroll.velocity * 0.4;
      torusMesh.rotation.y += 0.012;
      torusWire.rotation.x = torusMesh.rotation.x;
      torusWire.rotation.y = torusMesh.rotation.y;

      // --- CIPHER ANIMATIONS ---
      cipherRotor1.rotation.y += 0.01;
      cipherRotor2.rotation.y -= 0.015;
      octMesh.rotation.x += 0.012;
      octMesh.rotation.z += 0.009;

      // --- CONTACT BEACON ANIMATIONS ---
      beacon.rotation.y += 0.008;
      signalRings.forEach((ring) => {
        ring.scale.addScalar(ring.userData.speed);
        if (ring.scale.x > 3.0) {
          ring.scale.setScalar(0.2);
        }
      });

      // Drift particle system
      particleSystem.rotation.y = elapsedTime * 0.015 + p * 0.8;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[5]"
      aria-hidden="true"
    />
  );
};
