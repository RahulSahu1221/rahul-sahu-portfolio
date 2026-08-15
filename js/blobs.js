/* ==========================================================================
   GLASS BLOBS — irregular, liquid-glass decorative shapes.
   Each blob is an SVG circle pushed through feTurbulence + feDisplacementMap
   to break its outline into an organic, non-circular silhouette, with an
   inner highlight and soft rim to read as glass rather than a blurred dot.
   Slow position drift + a very slow turbulence re-seed keeps them "liquid".
   ========================================================================== */
(function () {
  function makeBlob({ id, size, hue1, hue2, top, left, right, bottom, seed }) {
    const highlightX = size * 0.34, highlightY = size * 0.3;
    return `
    <div class="glass-blob" style="width:${size}px;height:${size}px;${top !== undefined ? `top:${top};` : ''}${left !== undefined ? `left:${left};` : ''}${right !== undefined ? `right:${right};` : ''}${bottom !== undefined ? `bottom:${bottom};` : ''}">
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
    const allSpecs = [
      { id: 'a', size: 420, hue1: '#c8a96e', hue2: '#4a9eff', top: '4vh', left: '-8vw', seed: 3 },
      { id: 'b', size: 320, hue1: '#4a9eff', hue2: '#c8a96e', top: '55vh', right: '-6vw', seed: 11 },
      { id: 'c', size: 260, hue1: '#a78bfa', hue2: '#4a9eff', top: '130vh', left: '-4vw', seed: 7 },
      { id: 'd', size: 300, hue1: '#c8a96e', hue2: '#34d399', bottom: '10vh', right: '-5vw', seed: 21 },
    ];
    const specs = window.PortfolioPerf && window.PortfolioPerf.tier === 'low' ? allSpecs.slice(0, 2) : allSpecs;
    layer.innerHTML = specs.map(makeBlob).join('');

    // Slow independent drift per blob via CSS transform, driven by the
    // shared ticker (not its own rAF loop) and paused when the layer
    // itself is off-screen (it never is, but this keeps the pattern consistent).
    const blobs = Array.from(layer.querySelectorAll('.glass-blob'));
    const perf = window.PortfolioPerf;
    let t = 0;
    function frame(ts, dt) {
      t += 0.003 * (dt / 16.7);
      blobs.forEach((el, i) => {
        const dx = Math.sin(t + i * 2.1) * 22;
        const dy = Math.cos(t * 0.8 + i * 1.7) * 18;
        el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      });
    }
    if (perf && !perf.reducedMotion) perf.subscribe(frame);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
