import './settings/volumeController.js';
import './keyboard/keyboardManager.js';
import './keyboard/keyboardScroll.js';
import './keyboard/fretboardManager.js';
import './noteDisplay.js';
import './input/physicalKeyboardInput.js';
import './settings/settingsPanel.js'

import { KeyInput } from './input/keyInput.js';
import { Synth } from './audio/synth.js';


// インプットを受け取り、音を鳴らす

// 同じNoteを持つKeyが複数押されうる(フレットボードの同じ音など)ので、
// 最初の1つが押された時に鳴らし、最後の1つが離された時に止める
const countPressedKeysOf = (note) =>
  KeyInput.getAllPressedKeys().filter((key) => key.note === note).length;

// インプットを受け取り、音を鳴らす
KeyInput.pressed.add((key) => {
  if (countPressedKeysOf(key.note) === 1) Synth.startNote(key.note);
});
KeyInput.released.add((key) => {
  if (countPressedKeysOf(key.note) === 0) Synth.stopNote(key.note);
});