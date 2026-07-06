// Midi helpers for AKAI MidiMix

window.ccValues = window.ccValues || new Array(128).fill(0);
window.noteStates = window.noteStates || new Array(128).fill(0);

const ccValues = window.ccValues;
const noteStates = window.noteStates;

if (!window.__midiInitialized) {
  navigator.requestMIDIAccess().then(
    (midiAccess) => {
      for (const input of midiAccess.inputs.values()) {
        input.onmidimessage = handleMIDIMessage;
      }
    },
    () => console.log("Could not access MIDI devices."),
  );

  window.__midiInitialized = true;
}

function handleMIDIMessage(msg) {
  const [status, id, value] = msg.data;
  const type = status & 0xf0;

  if (type === 0xb0) {
    ccValues[id] = value;
  } else if (type === 0x90 || type === 0x80) {
    noteStates[id] = type === 0x90 && value > 0 ? 1 : 0;
  }
}

var curves = {
  lin: (t) => t,
  linear: (t) => t,
  exp: (t) => t * t,
  exponential: (t) => t * t,
  log: (t) => Math.sqrt(t),
  logarithmic: (t) => Math.sqrt(t),
};

function mapValue(raw, min = 0, max = 1, curve = "lin") {
  const norm = normalize(raw, { min: 0, max: 127 });
  const curved = (curves[curve] || curves.lin)(norm);
  return lerp(curved, 0, 1, min, max);
}

var sliderIds = [19, 23, 27, 31, 49, 53, 57, 61, 62];

var knobIds = [
  [16, 17, 18],
  [20, 21, 22],
  [24, 25, 26],
  [28, 29, 30],
  [46, 47, 48],
  [50, 51, 52],
  [54, 55, 56],
  [58, 59, 60],
];

var buttonIds = [
  [1, 3],
  [4, 6],
  [7, 9],
  [10, 12],
  [13, 15],
  [16, 18],
  [19, 21],
  [22, 24],
  [25, 26, 27],
];

// slider(1-9, min, max, curve)
function slider(num, min = 0, max = 1, curve = "lin") {
  const id = sliderIds[num - 1];
  return () => mapValue(ccValues[id], min, max, curve);
}

// knob(slider 1-8, knob 1-3, min, max, curve)
function knob(sliderNum, knobNum, min = 0, max = 1, curve = "lin") {
  const id = knobIds[sliderNum - 1][knobNum - 1];
  return () => mapValue(ccValues[id], min, max, curve);
}

// button(row 1-9, position 1-2 (or 1-3 for row 9))
function button(row, pos) {
  const id = buttonIds[row - 1][pos - 1];
  return () => noteStates[id];
}
