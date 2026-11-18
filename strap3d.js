// Model 3D strap tumbler: dua tali yang dipilin membentuk loop, plus ring silikon.
// Ditulis dengan WebGL murni, tanpa library luar.
(function () {
  const VS = `
    attribute vec3 aPos; attribute vec3 aNor; attribute float aAlong;
    uniform mat4 uProj, uView, uModel;
    varying vec3 vNor; varying vec3 vPos; varying float vAlong;
    void main() {
      vec4 wp = uModel * vec4(aPos, 1.0);
      vPos = wp.xyz; vNor = mat3(uModel) * aNor; vAlong = aAlong;
      gl_Position = uProj * uView * wp;
    }`;
  const FS = `
    precision mediump float;
    uniform vec3 uColor; uniform float uWeave; uniform float uShine;
    varying vec3 vNor; varying vec3 vPos; varying float vAlong;
    void main() {
      vec3 n = normalize(vNor);
      vec3 L1 = normalize(vec3(0.6, 0.8, 1.0));
      vec3 L2 = normalize(vec3(-0.7, -0.2, 0.6));
      vec3 V = normalize(vec3(0.0, 0.0, 6.0) - vPos);
      float d = max(dot(n, L1), 0.0) * 0.85 + max(dot(n, L2), 0.0) * 0.25;
      vec3 H = normalize(L1 + V);
      float s = pow(max(dot(n, H), 0.0), 36.0) * uShine;
      float weave = 1.0 - uWeave * (0.5 + 0.5 * sin(vAlong));
      float rim = pow(1.0 - max(dot(n, V), 0.0), 3.0) * 0.18;
      vec3 c = uColor * (0.32 + d) * weave + vec3(s) + rim;
      gl_FragColor = vec4(c, 1.0);
    }`;

  const hex = (h) => { const n = parseInt(h.replace('#', ''), 16); return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255]; };
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
  const mul = (a, s) => [a[0] * s, a[1] * s, a[2] * s];
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const norm = (a) => { const l = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0] / l, a[1] / l, a[2] / l]; };

  // Bentuk loop strap (tetesan memanjang), di bidang XY
  function loopCurve(t) {
    const a = t * Math.PI * 2;
    const x = Math.sin(a) * (0.95 - 0.35 * Math.cos(a));
    const y = -Math.cos(a) * 1.55 - 0.25;
    return [x, y, 0];
  }

  // Tabung di sepanjang fungsi path(t), t di [0,1], tertutup
  function tube(path, segs, sides, radius, alongFreq, squash) {
    squash = squash || 1;
    const pos = [], nor = [], along = [], idx = [];
    for (let i = 0; i <= segs; i++) {
      const t = i / segs, e = 1 / segs / 4;
      const p = path(t);
      const T = norm(sub(path(t + e), path(t - e)));
      let ref = Math.abs(T[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
      const u = norm(cross(T, ref)), v = cross(T, u);
      for (let j = 0; j <= sides; j++) {
        const a = j / sides * Math.PI * 2;
        const n = norm(add(mul(u, Math.cos(a)), mul(v, Math.sin(a) / squash)));
        const q = add(p, add(mul(u, Math.cos(a) * radius), mul(v, Math.sin(a) * radius * squash)));
        pos.push(q[0], q[1], q[2]); nor.push(n[0], n[1], n[2]); along.push(t * alongFreq + a);
      }
    }
    for (let i = 0; i < segs; i++) for (let j = 0; j < sides; j++) {
      const a = i * (sides + 1) + j, b = a + sides + 1;
      idx.push(a, b, a + 1, b, b + 1, a + 1);
    }
    return { pos, nor, along, idx };
  }

  function strand(phase, twists, r) {
    const Z = [0, 0, 1];
    return (t) => {
      t = ((t % 1) + 1) % 1;
      const c = loopCurve(t);
      const e = 1e-4;
      const T = norm(sub(loopCurve(t + e), loopCurve(t - e)));
      const N = norm(cross(Z, T));
      const ph = t * twists * Math.PI * 2 + phase;
      return add(c, add(mul(N, Math.cos(ph) * r), mul(Z, Math.sin(ph) * r)));
    };
  }

  function ringPath(t) {
    const a = t * Math.PI * 2, R = 0.82;
    return [Math.cos(a) * R, 1.62 + Math.sin(a) * R * 0.98, 0];
  }

  // ---- matriks ----
  function persp(fov, asp, n, f) { const t = 1 / Math.tan(fov / 2); return [t / asp, 0, 0, 0, 0, t, 0, 0, 0, 0, (f + n) / (n - f), -1, 0, 0, 2 * f * n / (n - f), 0]; }
  function mm(a, b) { const o = new Array(16).fill(0); for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) for (let k = 0; k < 4; k++) o[c * 4 + r] += a[k * 4 + r] * b[c * 4 + k]; return o; }
  function rotY(a) { const c = Math.cos(a), s = Math.sin(a); return [c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1]; }
  function rotX(a) { const c = Math.cos(a), s = Math.sin(a); return [1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1]; }
  function trans(x, y, z) { return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1]; }
  function scale(s) { return [s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 0, 0, 0, 0, 1]; }

  window.initStrap3D = function (canvas, opts) {
    const gl = canvas.getContext('webgl', { antialias: true, alpha: true, premultipliedAlpha: false });
    if (!gl) return null;
    const prog = gl.createProgram();
    [[gl.VERTEX_SHADER, VS], [gl.FRAGMENT_SHADER, FS]].forEach(([type, src]) => {
      const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); gl.attachShader(prog, s);
    });
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
    gl.useProgram(prog);
    const loc = {
      aPos: gl.getAttribLocation(prog, 'aPos'), aNor: gl.getAttribLocation(prog, 'aNor'), aAlong: gl.getAttribLocation(prog, 'aAlong'),
      uProj: gl.getUniformLocation(prog, 'uProj'), uView: gl.getUniformLocation(prog, 'uView'), uModel: gl.getUniformLocation(prog, 'uModel'),
      uColor: gl.getUniformLocation(prog, 'uColor'), uWeave: gl.getUniformLocation(prog, 'uWeave'), uShine: gl.getUniformLocation(prog, 'uShine'),
    };
    function upload(m) {
      const mk = (data, target, T) => { const b = gl.createBuffer(); gl.bindBuffer(target, b); gl.bufferData(target, new T(data), gl.STATIC_DRAW); return b; };
      return { p: mk(m.pos, gl.ARRAY_BUFFER, Float32Array), n: mk(m.nor, gl.ARRAY_BUFFER, Float32Array), a: mk(m.along, gl.ARRAY_BUFFER, Float32Array),
        i: mk(m.idx, gl.ELEMENT_ARRAY_BUFFER, Uint16Array), count: m.idx.length };
    }
    const meshes = {
      s1: upload(tube(strand(0, 26, 0.075), 900, 10, 0.072, 520)),
      s2: upload(tube(strand(Math.PI, 26, 0.075), 900, 10, 0.072, 520)),
      ring: upload(tube(ringPath, 160, 20, 0.06, 0, 3.2)),
    };
    let colors = { a: hex('#7D1830'), b: hex('#F3E3CF'), ring: hex('#5B0E1E') };
    function setColors(c) { colors = { a: hex(c.a), b: hex(c.b), ring: hex(c.ring) }; }
    if (opts && opts.colors) setColors(opts.colors);

    function draw(m, color, weave, shine) {
      gl.bindBuffer(gl.ARRAY_BUFFER, m.p); gl.enableVertexAttribArray(loc.aPos); gl.vertexAttribPointer(loc.aPos, 3, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, m.n); gl.enableVertexAttribArray(loc.aNor); gl.vertexAttribPointer(loc.aNor, 3, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, m.a); gl.enableVertexAttribArray(loc.aAlong); gl.vertexAttribPointer(loc.aAlong, 1, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, m.i);
      gl.uniform3fv(loc.uColor, color); gl.uniform1f(loc.uWeave, weave); gl.uniform1f(loc.uShine, shine);
      gl.drawElements(gl.TRIANGLES, m.count, gl.UNSIGNED_SHORT, 0);
    }

    let yaw = -0.4, pitch = 0.12, vy = 0, vp = 0, dragging = false, lx = 0, ly = 0, idle = 0;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    canvas.addEventListener('pointerdown', (e) => { dragging = true; lx = e.clientX; ly = e.clientY; canvas.setPointerCapture(e.pointerId); });
    canvas.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      vy = (e.clientX - lx) * 0.008; vp = (e.clientY - ly) * 0.006; lx = e.clientX; ly = e.clientY; idle = 0;
    });
    const end = () => { dragging = false; };
    canvas.addEventListener('pointerup', end); canvas.addEventListener('pointercancel', end);

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth, h = canvas.clientHeight;
      if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) { canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr); }
      gl.viewport(0, 0, canvas.width, canvas.height);
    }
    gl.enable(gl.DEPTH_TEST); gl.clearColor(0, 0, 0, 0);
    let visible = true, last = performance.now();
    new IntersectionObserver((en) => { visible = en[0].isIntersecting; }).observe(canvas);

    function frame(now) {
      const dt = Math.min((now - last) / 16.67, 3); last = now;
      if (visible) {
        resize();
        idle += dt;
        if (!dragging) { vy *= Math.pow(0.94, dt); vp *= Math.pow(0.9, dt); if (idle > 40 && !reduce) yaw += 0.006 * dt; }
        yaw += vy; pitch = Math.max(-0.7, Math.min(0.7, pitch + vp - pitch * 0.02 * dt));
        const t = now / 1000;
        const bob = reduce ? 0 : Math.sin(t * 1.2) * 0.05;
        const model = mm(trans(0, bob - 0.3, 0), mm(rotX(pitch + 0.08), mm(rotY(yaw), scale(0.78))));
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.uniformMatrix4fv(loc.uProj, false, persp(0.62, canvas.width / canvas.height, 0.1, 50));
        gl.uniformMatrix4fv(loc.uView, false, trans(0, 0, -7.0));
        gl.uniformMatrix4fv(loc.uModel, false, model);
        draw(meshes.s1, colors.a, 0.22, 0.35);
        draw(meshes.s2, colors.b, 0.22, 0.35);
        draw(meshes.ring, colors.ring, 0.0, 0.8);
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
    return { setColors };
  };
})();
