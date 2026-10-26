/* ASCII jellyfish ocean, copied verbatim from the tjeastmond.com design canvas (adapted from the Kurage dashboard background). */
export function createOcean(host, canvas, startMode, startPlaying) {
  const ctx = canvas.getContext('2d');
  const off = document.createElement('canvas');
  const octx = off.getContext('2d', { willReadFrequently: true });
  const SS = 2;
  const PALETTES = {
    biolum: { a: [92, 226, 240], b: [164, 140, 255], tempo: 1, size: 1 },
    reef: { a: [98, 240, 192], b: [92, 194, 255], tempo: 1.3, size: .9 },
    dusk: { a: [168, 132, 255], b: [238, 140, 214], tempo: .7, size: 1.1 }
  };
  const ACCENTS = ['#f9a8d4', '#fcd34d', '#86efac', '#c4b5fd'];
  const RAMP = [['.', ','], ["'", '`'], [':', "'"], [';', ':'], ['o', ';'], ['t', 'o'], ['%', 't'], ['S', '%'], ['X', 'S'], ['8', 'X'], ['@', '8'], ['#', '@']];
  const SNOW = ['.', '.', '.', '-', '-', "'", ',', '·'];
  const FONT = '"Geist Mono", ui-monospace, "SF Mono", Menlo, Consolas, monospace';

  let W = 0, H = 0, dpr = 1, cw = 10, ch = 15, cols = 0, rows = 0, ow = 0, oh = 0, fs = 11;
  let jellies = [], snow = [];
  let time = 0, last = 0, acc = 0, raf = 0;
  let playing = startPlaying, visible = !document.hidden;
  const clonePal = (p) => ({ a: p.a.slice(), b: p.b.slice(), tempo: p.tempo, size: p.size });
  let pal = clonePal(PALETTES[startMode] || PALETTES.biolum), palFrom = null, palTo = null, palT = 1, palQ = -1;
  const pointer = { x: -1e5, y: -1e5 };
  const styles = new Map();

  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp = (v, lo, hi) => v < lo ? lo : v > hi ? hi : v;
  const ease = (t) => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  function hash(x, y, t) {
    let h = Math.imul(x, 374761393) ^ Math.imul(y, 668265263) ^ Math.imul(t, 1103515245);
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  }
  function contraction(p) {
    return p < .28 ? Math.sin(p / .28 * Math.PI / 2) : .5 + .5 * Math.cos((p - .28) / .72 * Math.PI);
  }
  function baseRadius() { return clamp(Math.min(W, 1125) * .074, 40, 98); }

  function anchor(j, t, c) {
    const rx = j.R * (1 - .17 * c), ry = j.R * .8 * (1 + .1 * c);
    const lx = t.u * rx * (t.arm ? 1 : .95);
    const ly = t.arm ? ry * .05 : -ry * .03 * (1 - Math.abs(t.u));
    const cs = Math.cos(j.theta), sn = Math.sin(j.theta);
    return { x: j.x + lx * cs - ly * sn, y: j.y + lx * sn + ly * cs };
  }
  function resetTentacles(j) {
    const hx = Math.sin(j.theta), hy = -Math.cos(j.theta);
    for (const t of j.tents) {
      const a = anchor(j, t, 0);
      t.pts = [];
      for (let k = 0; k < t.n; k++) {
        const x = a.x - hx * k * t.seg * j.R, y = a.y - hy * k * t.seg * j.R;
        t.pts.push({ x, y, px: x, py: y });
      }
    }
  }
  function makeJelly(x, y, z) {
    const R0 = baseRadius() * (.62 + .55 * z) * (.88 + Math.random() * .24);
    const j = { x, y, z, R0, R: R0 * pal.size, vx: 0, vy: 0, theta: (Math.random() - .5) * .6, phase: Math.random(), c: 0,
      rate: .86 + Math.random() * .28, mix: Math.random(), wander: Math.random() * 100, tents: [] };
    for (let i = 0; i < 9; i++) j.tents.push({ u: -.92 + 1.84 * i / 8, n: 15, seg: .25, w0: .075, w1: .022, sw: .6 + Math.random() * .8, seed: Math.random() * 6.28, arm: false, pts: [] });
    for (const u of [-.3, -.1, .1, .3]) j.tents.push({ u, n: 10, seg: .2, w0: .17, w1: .05, sw: 1.1 + Math.random() * .5, seed: Math.random() * 6.28, arm: true, pts: [] });
    resetTentacles(j);
    return j;
  }
  function shiftJelly(j, dx, dy) {
    j.x += dx; j.y += dy;
    for (const t of j.tents) for (const q of t.pts) { q.x += dx; q.px += dx; q.y += dy; q.py += dy; }
  }

  // The ocean spans the whole page, so jellyfish are spread down its full height.
  const HUES = [.12, .9, .3, .78, .55, .04];
  const desiredCount = () => clamp(Math.round(W * H / 300000), 3, 12);
  function seedJellies() {
    jellies = [];
    const n = desiredCount();
    for (let i = 0; i < n; i++) {
      const side = i % 2 ? .55 + Math.random() * .37 : .08 + Math.random() * .37;
      const y = H * (i + .25 + Math.random() * .5) / n;
      const j = makeJelly(W * side, y, .5 + Math.random() * .5);
      j.mix = HUES[i % HUES.length];
      jellies.push(j);
    }
    jellies.sort((a, b) => a.z - b.z);
  }
  function respawn(j) {
    j.y = H + j.R * (1.2 + Math.random());
    j.x = W * (.06 + Math.random() * .88);
    j.vx = 0; j.vy = 0; j.theta = (Math.random() - .5) * .5;
    j.mix = Math.random() < .5 ? Math.random() * .35 : .65 + Math.random() * .35;
    resetTentacles(j);
  }
  function seedSnow() {
    snow = [];
    const n = Math.round(cols * rows / 80);
    for (let i = 0; i < n; i++) {
      const a = .14 + Math.random() * .3;
      snow.push({ x: Math.random() * W, y: Math.random() * H, vy: 3 + Math.random() * 8, vx: (Math.random() - .5) * 3, seed: Math.random() * 6.28,
        g: SNOW[(Math.random() * SNOW.length) | 0], run: Math.random() < .16 ? 2 + ((Math.random() * 3) | 0) : 1, style: 'rgba(150,172,205,' + a.toFixed(3) + ')' });
    }
  }

  function step(dt) {
    time += dt;
    if (palT < 1) {
      palT = Math.min(1, palT + dt / .9);
      const q = Math.round(palT * 18);
      if (q !== palQ) {
        palQ = q;
        const t = ease(q / 18);
        pal = { a: palFrom.a.map((v, i) => lerp(v, palTo.a[i], t)), b: palFrom.b.map((v, i) => lerp(v, palTo.b[i], t)),
          tempo: lerp(palFrom.tempo, palTo.tempo, t), size: lerp(palFrom.size, palTo.size, t) };
        styles.clear();
      }
    }
    const tempo = pal.tempo;
    for (const j of jellies) {
      j.R += (j.R0 * pal.size - j.R) * Math.min(1, dt * 1.4);
      j.phase += dt * (1 / 2.6) * j.rate * tempo;
      if (j.phase >= 1) j.phase -= 1;
      const c = contraction(j.phase), dc = c - j.c;
      j.c = c;
      const hx = Math.sin(j.theta), hy = -Math.cos(j.theta);
      if (dc > 0) { const thrust = 62 * (.5 + .5 * j.z) * Math.sqrt(tempo); j.vx += hx * dc * thrust; j.vy += hy * dc * thrust; }
      const drag = Math.exp(-dt * 1.15);
      j.vx *= drag; j.vy *= drag;
      j.vx += Math.sin(time * .07 + j.wander) * 1.6 * dt;
      j.x += j.vx * dt; j.y += j.vy * dt;
      const want = Math.sin(time * .11 + j.wander) * .5;
      const pdx = j.x - pointer.x, pdy = j.y - pointer.y, pd = Math.hypot(pdx, pdy) || 1;
      if (pd < j.R * 2.4) { const push = (1 - pd / (j.R * 2.4)) * 42 * dt; j.vx += pdx / pd * push; j.vy += pdy / pd * push; }
      j.theta += (want - j.theta) * Math.min(1, dt * .32);

      if (j.y < -j.R * 4.4) respawn(j);
      else if (j.x < -j.R * 3.2) shiftJelly(j, W + j.R * 3, 0);
      else if (j.x > W + j.R * 3.2) shiftJelly(j, -W - j.R * 3, 0);
      else if (j.y > H + j.R * 6) shiftJelly(j, 0, -(H + j.R * 9));

      const cs = Math.cos(j.theta), sn = Math.sin(j.theta);
      const trail = .42 + .25 * (1 - c);
      const sway = time * 1.5 * pal.tempo;
      for (const t of j.tents) {
        const p = t.pts, a = anchor(j, t, c), seg = t.seg * j.R;
        p[0].x = a.x; p[0].y = a.y; p[0].px = a.x; p[0].py = a.y;
        const flare = t.arm ? 0 : t.u * c * .7;
        for (let k = 1; k < p.length; k++) {
          const q = p[k], pr = p[k - 1], f = k / p.length;
          const vx = (q.x - q.px) * .88, vy = (q.y - q.py) * .88;
          q.px = q.x; q.py = q.y;
          const s = Math.sin(sway - k * .42 + t.seed) * t.sw * (.25 + f) * .55 + flare * (1 - f);
          q.x += vx - hx * trail + cs * s;
          q.y += vy - hy * trail + sn * s;
          const ex = q.x - pointer.x, ey = q.y - pointer.y, ed = ex * ex + ey * ey;
          if (ed < 12100) { const d = Math.sqrt(ed) || 1, push = (1 - d / 110) * 2.6; q.x += ex / d * push; q.y += ey / d * push; }
          const dx = q.x - pr.x, dy = q.y - pr.y, d = Math.hypot(dx, dy) || 1;
          q.x = pr.x + dx / d * seg; q.y = pr.y + dy / d * seg;
        }
      }
    }
    for (const s of snow) {
      s.y += s.vy * dt;
      s.x += (s.vx + Math.sin(time * .3 + s.seed) * 2) * dt;
      if (s.y > H + ch) { s.y = -ch; s.x = Math.random() * W; }
      if (s.x < -cw * 8) s.x += W + cw * 8; else if (s.x > W + cw) s.x -= W + cw * 8;
    }
  }

  function col(m, k, w) {
    return 'rgb(' + (Math.min(255, (1 - m) * k * 255) | 0) + ',' + (Math.min(255, w * 255) | 0) + ',' + (Math.min(255, m * k * 255) | 0) + ')';
  }
  function drawField() {
    octx.setTransform(1, 0, 0, 1, 0, 0);
    octx.globalCompositeOperation = 'source-over';
    octx.fillStyle = '#000';
    octx.fillRect(0, 0, ow, oh);
    octx.setTransform(SS / cw, 0, 0, SS / ch, 0, 0);
    octx.globalCompositeOperation = 'lighter';
    octx.lineCap = 'round'; octx.lineJoin = 'round';
    for (const j of jellies) {
      const k = .54 + .56 * j.z, m = j.mix;
      for (const t of j.tents) {
        const p = t.pts, n = p.length;
        for (let s = 0; s < n - 1; s += 3) {
          const f = s / (n - 1);
          octx.lineWidth = lerp(t.w0, t.w1, f) * j.R;
          octx.strokeStyle = col(m, k * (t.arm ? .5 : .46) * (1 - f * .82), t.arm ? .1 * k : 0);
          octx.beginPath();
          octx.moveTo(p[s].x, p[s].y);
          for (let q = s + 1; q <= Math.min(n - 1, s + 3); q++) octx.lineTo(p[q].x, p[q].y);
          octx.stroke();
        }
      }
      const c = j.c, rx = j.R * (1 - .17 * c), ry = j.R * .8 * (1 + .1 * c);
      octx.save();
      octx.translate(j.x, j.y);
      octx.rotate(j.theta);
      octx.beginPath();
      octx.moveTo(-rx, 0);
      octx.bezierCurveTo(-rx, -ry * .58, -rx * .56, -ry, 0, -ry);
      octx.bezierCurveTo(rx * .56, -ry, rx, -ry * .58, rx, 0);
      octx.quadraticCurveTo(0, -ry * .2, -rx, 0);
      octx.closePath();
      const g = octx.createRadialGradient(0, -ry * .38, rx * .1, 0, -ry * .3, rx * 1.05);
      g.addColorStop(0, col(m, k * .34, .1 * k));
      g.addColorStop(.7, col(m, k * .42, .03 * k));
      g.addColorStop(1, col(m, k * .66, .08 * k));
      octx.fillStyle = g;
      octx.fill();
      octx.lineWidth = Math.max(5, j.R * .085);
      octx.strokeStyle = col(m, k * .55, .2 * k);
      octx.stroke();
      octx.lineWidth = Math.max(3, j.R * .05);
      octx.strokeStyle = col(m, k * .14, .52 * k);
      for (let i = 0; i < 4; i++) {
        const ang = Math.PI / 4 + i * Math.PI / 2;
        octx.beginPath();
        octx.ellipse(Math.cos(ang) * rx * .26, -ry * .44 + Math.sin(ang) * ry * .2, rx * .14, ry * .12, ang, 0, Math.PI * 2);
        octx.stroke();
      }
      octx.fillStyle = col(m, k * .4, .36 * k);
      for (let i = 0; i <= 8; i++) {
        const u = -.95 + 1.9 * i / 8;
        octx.beginPath();
        octx.arc(u * rx, -ry * .03 * (1 - Math.abs(u)), Math.max(2.5, j.R * .034), 0, Math.PI * 2);
        octx.fill();
      }
      octx.restore();
    }
  }
  function style(tb, lv, wb) {
    const key = (tb * 12 + lv) * 3 + wb;
    let s = styles.get(key);
    if (s) return s;
    const t = tb / 5, L = (lv + .5) / 12, w = [0, .3, .62][wb];
    const base = [0, 1, 2].map((i) => lerp(pal.a[i], pal.b[i], t));
    const hot = lv >= 10 && wb > 0;
    const tileMix = hot ? .5 + w * .3 : 0;
    const tile = base.map((v) => lerp(v * .58, 236, tileMix) | 0);
    const mixW = clamp(.12 + L * .5 + w * .34, 0, .94);
    const glyph = hot ? [6, 10, 16] : base.map((v) => lerp(v, 246, mixW) | 0);
    s = {
      tile: 'rgba(' + tile.join(',') + ',' + (hot ? .9 : .1 + L * .5).toFixed(3) + ')',
      glyph: hot ? 'rgb(' + glyph.join(',') + ')' : 'rgba(' + glyph.join(',') + ',' + (.4 + L * .6).toFixed(3) + ')'
    };
    styles.set(key, s);
    return s;
  }
  function render() {
    if (!W) return;
    drawField();
    const d = octx.getImageData(0, 0, ow, oh).data;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.font = '500 ' + fs + 'px ' + FONT;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const ty = ch / 2 + .5, tx = cw / 2;
    for (const s of snow) {
      const cx = Math.floor(s.x / cw), cy = Math.floor(s.y / ch);
      ctx.fillStyle = s.style;
      for (let r = 0; r < s.run; r++) ctx.fillText(s.run > 1 ? '-' : s.g, (cx + r * 2) * cw + tx, cy * ch + ty);
    }
    const row = ow * 4;
    for (let cy = 0; cy < rows; cy++) {
      for (let cx = 0; cx < cols; cx++) {
        const i = (cy * SS * ow + cx * SS) * 4;
        const a = (d[i] + d[i + 4] + d[i + row] + d[i + row + 4]) / 1020;
        const w = (d[i + 1] + d[i + 5] + d[i + row + 1] + d[i + row + 5]) / 1020;
        const b = (d[i + 2] + d[i + 6] + d[i + row + 2] + d[i + row + 6]) / 1020;
        const L = Math.min(1, a + b + w * .55);
        if (L < .055) continue;
        const tb = Math.round(b / (a + b + 1e-4) * 5);
        const lv = Math.min(11, (L * 12) | 0);
        const wb = w < .12 ? 0 : w < .32 ? 1 : 2;
        const st = style(tb, lv, wb);
        const x = cx * cw, y = cy * ch;
        if (lv >= 1) { ctx.fillStyle = st.tile; ctx.fillRect(x + 1, y + 1, cw - 2, ch - 2); }
        const tick = Math.floor(time * 1.4 + ((cx * 7 + cy * 13) & 15) / 16);
        const h = hash(cx, cy, tick);
        ctx.fillStyle = lv >= 4 && lv < 10 && h > .986 ? ACCENTS[(h * 1e4 | 0) & 3] : st.glyph;
        ctx.fillText(RAMP[lv][h < .55 ? 0 : 1], x + tx, y + ty);
      }
    }
  }
  function loop(now) {
    raf = requestAnimationFrame(loop);
    if (!last) { last = now; return; }
    const dt = (now - last) / 1000;
    last = now;
    acc += Math.min(dt, .1);
    if (acc < 1 / 30) return;
    const n = Math.max(1, Math.min(6, Math.round(acc * 60))), h = acc / n;
    for (let i = 0; i < n; i++) step(h);
    acc = 0;
    render();
  }
  function sync() {
    const should = playing && visible && W > 0;
    if (should && !raf) { last = 0; raf = requestAnimationFrame(loop); }
    else if (!should && raf) { cancelAnimationFrame(raf); raf = 0; }
  }
  function resize() {
    const r = host.getBoundingClientRect();
    const nW = Math.round(r.width), nH = Math.round(r.height);
    if (nW < 1 || nH < 1 || (nW === W && nH === H)) return;
    const sx = W ? nW / W : 1, sy = H ? nH / H : 1, first = !W;
    W = nW; H = nH;
    dpr = Math.min(2, window.devicePixelRatio || 1);
    cw = W < 600 ? 8 : W < 1100 ? 9 : 10;
    ch = Math.round(cw * 1.5);
    fs = Math.round(ch * .74);
    cols = Math.ceil(W / cw); rows = Math.ceil(H / ch);
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    ow = cols * SS; oh = rows * SS;
    off.width = ow; off.height = oh;
    host.style.backgroundSize = cw + 'px ' + ch + 'px';
    if (first) {
      seedJellies();
      for (let i = 0; i < 200; i++) step(1 / 60);
    } else {
      for (const j of jellies) shiftJelly(j, j.x * (sx - 1), j.y * (sy - 1));
      const n = desiredCount();
      while (jellies.length > n) jellies.pop();
      while (jellies.length < n) { const j = makeJelly(W * Math.random(), H + 80, .5 + Math.random() * .4); respawn(j); jellies.unshift(j); }
    }
    seedSnow();
    render();
    sync();
  }
  const onVis = () => { visible = !document.hidden; sync(); };
  document.addEventListener('visibilitychange', onVis);
  let ro = null;
  if (typeof ResizeObserver !== 'undefined') { ro = new ResizeObserver(() => requestAnimationFrame(resize)); ro.observe(host); }
  window.addEventListener('resize', resize);
  resize();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { styles.clear(); render(); });

  return {
    setPlaying(v) { playing = v; sync(); if (!v) render(); },
    setPointer(x, y) { pointer.x = x; pointer.y = y; },
    setMode(m) {
      const p = PALETTES[m] || PALETTES.biolum;
      if (!playing || !W) { pal = clonePal(p); palT = 1; styles.clear(); render(); return; }
      palFrom = clonePal(pal); palTo = p; palT = 0; palQ = -1;
    },
    destroy() {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      if (ro) ro.disconnect();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVis);
    }
  };
}
