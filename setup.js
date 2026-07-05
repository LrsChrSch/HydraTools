await loadScript(
  "https://cdn.statically.io/gh/LrsChrSch/HydraTools@main/imports.js?dev=10",
);
await hydraToolsReady;

a.show();
a.setBins(4);
a.setSmooth(0.8);

a.meyda.start();

update = (dt) => {
  updateAA();
};
