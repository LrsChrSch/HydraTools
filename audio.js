var loudnessCeiling = 1; // seed nonzero to avoid divide-by-zero; adapts upward automatically
var bufferSize = a.meyda._m.bufferSize;

a.meyda.start();

var aa = {
  loudness: 0,
  spectralCentroid: 0,
  spectralKurtosis: 0,
};

var ranges = {
  spectralCentroid: {
    min: 0,
    max: bufferSize / 2,
  },
  spectralKurtosis: {
    min: 0,
    max: 1,
  },
};

function normalizeAdaptive(value) {
  loudnessCeiling = Math.max(loudnessCeiling * 0.999, value); // slow decay lets ceiling drift back down between loud peaks
  return clamp(lerp(value, 0, loudnessCeiling, 0, 1), 0, 1);
}

function updateAA() {
  let features;
  try {
    features = a.meyda.get([
      "loudness",
      "spectralCentroid",
      "spectralKurtosis",
    ]);
  } catch (e) {
    return;
  }
  if (!features) return;

  aa.loudness = smooth(
    aa.loudness,
    normalizeAdaptive(features.loudness?.total ?? 0),
  );
  aa.spectralCentroid = smooth(
    aa.spectralCentroid,
    normalize(features.spectralCentroid ?? 0, ranges.spectralCentroid),
  );
  aa.spectralKurtosis = smooth(
    aa.spectralKurtosis,
    normalize(features.spectralKurtosis ?? 0, ranges.spectralKurtosis),
  );
}
