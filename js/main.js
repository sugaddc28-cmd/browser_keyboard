import './settings/volumeController.js';
import './keyboard/keyboardManager.js';
import './keyboard/keyboardScroll.js';
import './keyboard/fretboardManager.js';
import './noteDisplay.js';
import './input/physicalKeyboardInput.js';
import './settings/settingsPanel.js'

import { NoteTrigger } from './input/noteTrigger.js';
import { Synth } from './audio/synth.js';


// インプットを受け取り、音を鳴らす

// 同じNoteを持つKeyが複数押されうる(フレットボードの同じ音など)ので、
// 最初の1つが押された時に鳴らし、最後の1つが離された時に止める

NoteTrigger.started.add((note) => Synth.startNote(note));
NoteTrigger.stopped.add((note) => Synth.stopNote(note));