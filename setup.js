await loadScript(
  "https://cdn.statically.io/gh/LrsChrSch/HydraTools@main/imports.js?dev=500",
);
await hydraToolsReady;

await midi.start();

a.show();
a.setBins(4);
a.setSmooth(0.8);

a.meyda.start();

update = (dt) => {
  updateAA();
  a.setSmooth(slider(9, 0, 0.99, "log")());
};

osc([5, 10, 20, 10], 0.1, 1)
  .lookupX(palette.bnw)
  .luma(() => lerp(a.fft[0], 0, 1, slider(1, 0, 1)(), slider(2, 0, 1)()))
  .out(o1);

src(o1)
  .hue(knob(8, 1, 0, 1))
  .saturate(knob(8, 2, 0, 1))
  .brightness(knob(8, 3, -1, 1))
  .fisheye(knob(7, 1, 0, 2), knob(7, 2, -2, 2))
  .contrast(knob(7, 3, 0, 3, "exp"))
  .out(o0);

// bnw
// red
// darkRed
// acid
// redBlue
// spezi
// green
// radiantEarth: climate
// rust
// violet
// fire
// garden
// neon
// twilight
// rocket
// mako
// viridis
// cubehelix
// fresh
// iceFire
// spectral
// rose
// cerulean
// forest
// orangeSeafoam
// roseBlue
