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
