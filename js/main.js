import './settings/volumeController.js';
import './keyboard/keyboardManager.js';
import './noteDisplay.js';
import './input/physicalKeyboardInput.js';
import './settings/settingsPanel.js'

import { NoteInput } from './input/noteInput.js';
import { Synth } from './audio/synth.js';


// インプットを受け取り、音を鳴らす
NoteInput.pressed.add((note) => Synth.startNote(note));
NoteInput.released.add((note) => Synth.stopNote(note));

