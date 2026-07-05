setFunction({
  name: "dither",
  type: "color",
  inputs: [
    {
      name: "levels",
      type: "float",
      default: 2.0,
    },
    {
      name: "pixelSize",
      type: "float",
      default: 1.0,
    },
  ],
  glsl: `
    vec2 ditherCoord = floor(gl_FragCoord.xy / max(pixelSize, 1.0));
    int x = int(mod(ditherCoord.x, 4.0));
    int y = int(mod(ditherCoord.y, 4.0));

    float bayer;
    if (y == 0) {
      if (x == 0) bayer = 0.0;
      else if (x == 1) bayer = 8.0;
      else if (x == 2) bayer = 2.0;
      else bayer = 10.0;
    } else if (y == 1) {
      if (x == 0) bayer = 12.0;
      else if (x == 1) bayer = 4.0;
      else if (x == 2) bayer = 14.0;
      else bayer = 6.0;
    } else if (y == 2) {
      if (x == 0) bayer = 3.0;
      else if (x == 1) bayer = 11.0;
      else if (x == 2) bayer = 1.0;
      else bayer = 9.0;
    } else {
      if (x == 0) bayer = 15.0;
      else if (x == 1) bayer = 7.0;
      else if (x == 2) bayer = 13.0;
      else bayer = 5.0;
    }

    float threshold = (bayer + 0.5) / 16.0;
    float lvls = max(levels, 2.0);
    vec3 scaled = _c0.rgb * (lvls - 1.0);
    vec3 result = floor(scaled + threshold) / (lvls - 1.0);

    return vec4(clamp(result, 0.0, 1.0), _c0.a);
  `,
});

setFunction({
  name: "filmgrain",
  type: "color",
  inputs: [
    {
      name: "grainSize",
      type: "float",
      default: 1.0,
    },
    {
      name: "strength",
      type: "float",
      default: 0.15,
    },
    {
      name: "colored",
      type: "float",
      default: 0.0,
    }, // 0 = b&w, 1 = full color
  ],
  glsl: `
    vec2 grainCoord = floor(gl_FragCoord.xy / max(grainSize, 1.0));
    float seed = time * 24.0;

    float n1 = fract(sin(dot(grainCoord + seed, vec2(12.9898, 78.233))) * 43758.5453);
    float n2 = fract(sin(dot(grainCoord + seed + 17.0, vec2(39.3468, 11.135))) * 24634.6345);
    float n3 = fract(sin(dot(grainCoord + seed + 41.0, vec2(73.156, 52.235))) * 19642.3421);

    vec3 noiseVal = mix(vec3(n1), vec3(n1, n2, n3), colored);
    vec3 grain = (noiseVal - 0.5) * 2.0 * strength;

    return vec4(clamp(_c0.rgb + grain, 0.0, 1.0), _c0.a);
  `,
});

setFunction({
  name: "scanlines",
  type: "color",
  inputs: [
    {
      name: "lineSize",
      type: "float",
      default: 2.0,
    },
    {
      name: "intensity",
      type: "float",
      default: 0.5,
    },
  ],
  glsl: `
    float lineWidth = max(lineSize, 0.5);
    float scan = sin(gl_FragCoord.y / lineWidth * 3.14159265) * 0.5 + 0.5;
    float fade = 1.0 - intensity * (1.0 - scan);
    return vec4(_c0.rgb * fade, _c0.a);
  `,
});

setFunction({
  name: "tritone",
  type: "color",
  inputs: [
    {
      name: "shadowR",
      type: "float",
      default: 0.05,
    },
    {
      name: "shadowG",
      type: "float",
      default: 0.0,
    },
    {
      name: "shadowB",
      type: "float",
      default: 0.2,
    },
    {
      name: "midR",
      type: "float",
      default: 0.8,
    },
    {
      name: "midG",
      type: "float",
      default: 0.3,
    },
    {
      name: "midB",
      type: "float",
      default: 0.4,
    },
    {
      name: "highR",
      type: "float",
      default: 1.0,
    },
    {
      name: "highG",
      type: "float",
      default: 0.95,
    },
    {
      name: "highB",
      type: "float",
      default: 0.7,
    },
  ],
  glsl: `
    vec3 shadowColor = vec3(shadowR, shadowG, shadowB);
    vec3 midColor    = vec3(midR, midG, midB);
    vec3 highColor   = vec3(highR, highG, highB);

    float lum = dot(_c0.rgb, vec3(0.299, 0.587, 0.114));

    vec3 result = mix(shadowColor, midColor, smoothstep(0.0, 0.5, lum));
    result = mix(result, highColor, smoothstep(0.5, 1.0, lum));

    return vec4(result, _c0.a);
  `,
});

setFunction({
  name: "fisheye",
  type: "coord",
  inputs: [
    {
      name: "radius",
      type: "float",
      default: 0.5,
    }, // reference radius of the effect
    {
      name: "strength",
      type: "float",
      default: 0.5,
    }, // negative = pincushion, positive = bulge
    {
      name: "falloff",
      type: "float",
      default: 2.0,
    }, // shape/softness of the curve
  ],
  glsl: `
    vec2 uv = _st * 2.0 - 1.0;
    float r = length(uv);
    float theta = atan(uv.y, uv.x);

    float safeRadius = max(radius, 0.0001);
    float rNorm = r / safeRadius;
    float rNew = pow(max(rNorm, 0.0), max(falloff, 0.0001)) * safeRadius;

    float rFinal = mix(r, rNew, strength);
    vec2 newUV = vec2(cos(theta), sin(theta)) * rFinal;

    return newUV * 0.5 + 0.5;
  `,
});

setFunction({
  name: "softclip",
  type: "color",
  inputs: [
    {
      name: "exposure",
      type: "float",
      default: 1.0,
    },
    {
      name: "rolloff",
      type: "float",
      default: 1.0,
    }, // highlight soft-clip strength
    {
      name: "contrast",
      type: "float",
      default: 0.3,
    }, // punch/perceived sharpness
  ],
  glsl: `
    vec3 x = _c0.rgb * exposure;
    vec3 softClipped = x / (1.0 + x * max(rolloff, 0.0));
    vec3 punchy = smoothstep(0.0, 1.0, softClipped);
    vec3 result = mix(softClipped, punchy, clamp(contrast, 0.0, 1.0));
    return vec4(clamp(result, 0.0, 1.0), _c0.a);
  `,
});
