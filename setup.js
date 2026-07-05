await loadScript(
  "https://cdn.statically.io/gh/LrsChrSch/HydraTools@main/imports.js?dev=1",
);

a.show();
a.setBins(4);
a.setSmooth(0.8);

a.meyda.start();

update = (dt) => {
  updateAA();
};

osc()
  .color(() => aa.spectralCentroid, 0, 0)
  .out();
