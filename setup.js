await loadScript("https://cdn.jsdelivr.net/gh/geikha/hyper-hydra@latest/hydra-arithmetics.js")
await loadScript("https://cdn.jsdelivr.net/gh/geikha/hyper-hydra@latest/hydra-arrays.js")
await loadScript("https://cdn.jsdelivr.net/gh/geikha/hyper-hydra@latest/hydra-blend.js")
await loadScript("https://cdn.jsdelivr.net/gh/geikha/hyper-hydra@latest/hydra-gradientmap.js")
await loadScript("https://cdn.jsdelivr.net/gh/geikha/hyper-hydra@latest/hydra-outputs.js")
await loadScript("https://cdn.jsdelivr.net/gh/geikha/hyper-hydra@latest/hydra-tap.js")
await loadScript("https://cdn.jsdelivr.net/gh/geikha/hyper-hydra@latest/hydra-text.js")
await loadScript("https://metagrowing.org/extra-shaders-for-hydra/all.js")

await loadScript("https://cdn.statically.io/gh/LrsChrSch/HydraTools@main/common.js")
await loadScript("https://cdn.statically.io/gh/LrsChrSch/HydraTools@9e7428d3349c343efccd87868aafa3d334fdcdff/audio.js")
await loadScript("https://cdn.statically.io/gh/LrsChrSch/HydraTools@main/shaders.js")

a.show()
a.setBins(4)
a.setSmooth(0.8)

a.meyda.start()

update = (dt) => {
	updateAA()
}

osc().color(()=>aa.spectralCentroid,0,0).out()