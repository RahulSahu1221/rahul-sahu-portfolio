/* ==========================================================================
   GLASS BLOBS — irregular, liquid-glass decorative shapes.
   Each blob is an SVG circle pushed through feTurbulence + feDisplacementMap
   to break its outline into an organic, non-circular silhouette, with an
   inner highlight and soft rim to read as glass rather than a blurred dot.

   Fix: the blob layer is `position: fixed; inset: 0; overflow: hidden`
   (a full-viewport overlay, by design — cheap, always-on ambient backdrop).
   The previous blob positions assumed the layer scrolled with the page
   (one spec used top: 130vh), so most of them were silently clipped by
   the fixed container and never actually rendered. Positions below are
   all within the visible viewport, and instead of relying on scroll to
   "reveal" different blobs, each blob now visibly reacts to BOTH the
   mouse (parallax) and scroll position (bounded oscillating drift) on
   top of its own slow autonomous motion — three motion sources layered
   together, which is what actually reads as "floating".
   ========================================================================== */
(function () {
  function makeBlob({ id, size, hue1, hue2, top, left, right, bottom, seed }) {
    const highlightX = size * 0.34, highlightY = size * 0.3;
    return `
    <div class="glass-blob" data-blob-id="${id}" style="width:${size}px;height:${size}px;${top !== undefined ? `top:${top};` : ''}${left !== undefined ? `left:${left};` : ''}${right !== undefined ? `right:${right};` : ''}${bottom !== undefined ? `bottom:${bottom};` : ''}">
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="goo-${id}" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="${seed}" result="noise">
              <animate attributeName="baseFrequency" dur="34s" values="0.010;0.018;0.010" repeatCount="indefinite"/>
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="34" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
          <radialGradient id="fill-${id}" cx="40%" cy="35%" r="70%">
            <stop offset="0%" stop-color="${hue1}" stop-opacity="0.55"/>
            <stop offset="60%" stop-color="${hue2}" stop-opacity="0.22"/>
            <stop offset="100%" stop-color="${hue2}" stop-opacity="0.04"/>
          </radialGradient>
          <radialGradient id="hl-${id}" cx="35%" cy="30%" r="30%">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="0.55"/>
            <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <g filter="url(#goo-${id})">
          <circle cx="100" cy="100" r="82" fill="url(#fill-${id})" stroke="rgba(255,255,255,0.18)" stroke-width="1.4"/>
        </g>
        <circle cx="${highlightX}" cy="${highlightY}" r="${size * 0.16}" fill="url(#hl-${id})"/>
      </svg>
    </div>`;
  }

  function init() {
    const layer = document.getElementById('glass-blob-layer');
    if (!layer) return;
    const perf = window.PortfolioPerf;

    // Session-unique variation: each blob's turbulence seed is randomized
    // per page load, so no two visits render pixel-identical background art.
    const allSpecs = [
      { id: 'a', size: 380, hue1: '#c8a96e', hue2: '#4a9eff', top: '4vh',  left: '-3vw',  seed: Math.floor(Math.random()*100), mouseDepth: 16, scrollAmp: 34, scrollFreq: 0.0011, scrollDir: 1,  phase: 0.0 },
      { id: 'b', size: 300, hue1: '#4a9eff', hue2: '#c8a96e', top: '56vh', right: '-2vw', seed: Math.floor(Math.random()*100), mouseDepth: 10, scrollAmp: 26, scrollFreq: 0.0014, scrollDir: -1, phase: 1.4 },
      { id: 'c', size: 230, hue1: '#a78bfa', hue2: '#4a9eff', top: '30vh', left: '26vw',  seed: Math.floor(Math.random()*100), mouseDepth: 20, scrollAmp: 40, scrollFreq: 0.0009, scrollDir: 1,  phase: 2.8 },
      { id: 'd', size: 270, hue1: '#c8a96e', hue2: '#34d399', bottom: '2vh', right: '10vw', seed: Math.floor(Math.random()*100), mouseDepth: 8,  scrollAmp: 22, scrollFreq: 0.0016, scrollDir: -1, phase: 4.2 },
    ];
    const specs = perf && perf.tier === 'low' ? allSpecs.slice(0, 2) : allSpecs;
    layer.innerHTML = specs.map(makeBlob).join('');

    const blobs = Array.from(layer.querySelectorAll('.glass-blob')).map((el, i) => ({ el, spec: specs[i] }));

    let mx = 0, my = 0; // normalized -0.5..0.5
    document.addEventListener('mousemove', e => {
      mx = e.clientX / innerWidth - 0.5;
      my = e.clientY / innerHeight - 0.5;
    });

    let t = 0;
    function frame(ts, dt) {
      t += 0.003 * (dt / 16.7);
      const sy = window.scrollY;
      blobs.forEach(({ el, spec }, i) => {
        // 1) slow autonomous drift (organic idle motion)
        const ax = Math.sin(t + i * 2.1) * 16;
        const ay = Math.cos(t * 0.8 + i * 1.7) * 14;
        // 2) mouse parallax (deeper blobs move more — real depth cue)
        const mxOff = mx * spec.mouseDepth;
        const myOff = my * spec.mouseDepth * 0.7;
        // 3) bounded, oscillating scroll reactivity (never drifts away permanently)
        const scrollOff = Math.sin(sy * spec.scrollFreq + spec.phase) * spec.scrollAmp * spec.scrollDir;
        el.style.transform = `translate3d(${ax + mxOff}px, ${ay + myOff + scrollOff}px, 0)`;
      });
    }
    if (perf && !perf.reducedMotion) perf.subscribe(frame);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
