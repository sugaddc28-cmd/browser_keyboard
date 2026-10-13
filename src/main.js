import './ui/header/volumeController.js';
import './ui/instrument/keyboardView.js';
import './ui/instrument/keyboardScroll.js';
import './ui/instrument/fretboardView.js';
import './ui/notes/noteDisplay.js';
import './input/physicalKeyboardInput.js';
import './ui/settings/settingsPanel.js'

import { NoteInput } from './input/noteInput.js';
import { Synth } from './audio/synth.js';


// インプットを受け取り、音を鳴らす

// 同じNoteを持つInstrumentKeyが複数押されうる(フレットボードの同じ音など)ので、
// 最初の1つが押された時に鳴らし、最後の1つが離された時に止める

NoteInput.pressed.add((note) => Synth.startNote(note));
NoteInput.released.add((note) => Synth.stopNote(note));