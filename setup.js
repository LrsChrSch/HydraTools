await loadScript(
  "https://cdn.statically.io/gh/LrsChrSch/HydraTools@main/imports.js?dev=10",
);
await hydraToolsReady;

await midi.start().show();

a.show();
a.setBins(4);
a.setSmooth(0.8);

a.meyda.start();

update = (dt) => {
  updateAA();
};

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
