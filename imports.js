async function importAll() {
  console.log("Loading all...");

  await loadScript(
    "https://cdn.jsdelivr.net/gh/geikha/hyper-hydra@latest/hydra-arithmetics.js",
  );
  await loadScript(
    "https://cdn.jsdelivr.net/gh/geikha/hyper-hydra@latest/hydra-arrays.js",
  );
  await loadScript(
    "https://cdn.jsdelivr.net/gh/geikha/hyper-hydra@latest/hydra-blend.js",
  );
  await loadScript(
    "https://cdn.jsdelivr.net/gh/geikha/hyper-hydra@latest/hydra-gradientmap.js",
  );
  await loadScript(
    "https://cdn.jsdelivr.net/gh/geikha/hyper-hydra@latest/hydra-outputs.js",
  );
  await loadScript(
    "https://cdn.jsdelivr.net/gh/geikha/hyper-hydra@latest/hydra-tap.js",
  );
  await loadScript(
    "https://cdn.jsdelivr.net/gh/geikha/hyper-hydra@latest/hydra-text.js",
  );
  await loadScript("https://metagrowing.org/extra-shaders-for-hydra/all.js");
  await loadScript(
    "https://cdn.jsdelivr.net/npm/hydra-midi@latest/dist/index.js",
  );

  await loadScript(
    "https://cdn.statically.io/gh/LrsChrSch/HydraTools@main/common.js?dev=1",
  );
  await loadScript(
    "https://cdn.statically.io/gh/LrsChrSch/HydraTools@main/audio.js?dev=1",
  );
  await loadScript(
    "https://cdn.statically.io/gh/LrsChrSch/HydraTools@main/shaders.js?dev=1",
  );
  await loadScript(
    "https://cdn.statically.io/gh/LrsChrSch/HydraTools@main/colors.js?dev=1",
  );
  await loadScript(
    "https://cdn.statically.io/gh/LrsChrSch/HydraTools@main/midi.js?dev=10",
  );
}

var hydraToolsReady = importAll();
