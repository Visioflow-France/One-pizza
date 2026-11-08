'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * WebGL particle field rendered with three.js. Pauses via IntersectionObserver
 * when off-screen, respects reduced-motion, and reduces particle count on
 * coarse pointers. Rendered with dynamic(ssr:false) from the layout.
 */
export function ParticleField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const coarse = window.matchMedia('(pointer: coarse)').matches;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    );
    camera.position.z = 8;

    const COUNT = coarse ? 600 : 1200;
    const positions = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);
    const offsets = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
      sizes[i] = Math.random() * 1.4 + 0.3;
      offsets[i] = Math.random() * Math.PI * 2;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute('aOffset', new THREE.BufferAttribute(offsets, 1));

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(0xd6362b) },
      },
      vertexShader: `
        attribute float aSize; attribute float aOffset;
        uniform float uTime; varying float vAlpha;
        void main() {
          vec3 p = position;
          p.y += sin(uTime*0.3 + aOffset) * 0.4;
          p.x += cos(uTime*0.25 + aOffset*0.7) * 0.2;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_PointSize = aSize * (180.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
          vAlpha = 0.45 + 0.45 * sin(uTime*0.6 + aOffset);
        }`,
      fragmentShader: `
        varying float vAlpha; uniform vec3 uColor;
        void main() {
          vec2 uv = gl_PointCoord - vec2(0.5);
          if (length(uv) > 0.5) discard;
          gl_FragColor = vec4(uColor, smoothstep(0.5, 0.0, length(uv)) * vAlpha * 0.4);
        }`,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    scene.add(new THREE.Points(geo, mat));

    let mx = 0;
    let my = 0;
    const onMouseMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 0.15;
      my = (e.clientY / window.innerHeight - 0.5) * 0.15;
    };
    if (!coarse) window.addEventListener('mousemove', onMouseMove);

    let visible = true;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        visible = e.isIntersecting;
      });
    });
    observer.observe(canvas);

    const clock = new THREE.Clock();
    let raf = 0;
    const render = () => {
      if (visible) {
        const t = clock.getElapsedTime();
        mat.uniforms.uTime.value = t;
        scene.rotation.y += (mx - scene.rotation.y) * 0.04;
        scene.rotation.x += (my - scene.rotation.x) * 0.04;
        renderer.render(scene, camera);
      }
      raf = requestAnimationFrame(render);
    };
    render();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
      geo.dispose();
      mat.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas id="particles" ref={ref} />;
}
