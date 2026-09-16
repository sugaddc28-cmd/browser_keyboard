import './ui/volumeController.js';
import './keyboard/keyboardManager.js';
import './ui/noteDisplay.js';
import './input/physicalKeyboardInput.js';

import { NoteInput } from './input/noteInput.js';
import { Synth } from './audio/synth.js';
import { NoteDisplay } from './ui/noteDisplay.js';
import { KeyboardManager } from './keyboard/keyboardManager.js';


// インプットを受け取り、音を鳴らす
NoteInput.pressed.add((note) => Synth.startNote(note));
NoteInput.released.add((note) => Synth.stopNote(note));

// インプットを受け取り、キーボードに反映する
NoteInput.pressed.add((note) => KeyboardManager.displayPressed(note));
NoteInput.released.add((note) => KeyboardManager.displayReleased(note));

// インプットをを受け取り、画面表示に反映する
NoteInput.pressed.add((note) => NoteDisplay.set(note.name));
NoteInput.released.add(() => {
  const note = NoteInput.getAllPressedNotes()[0];
  NoteDisplay.set(note?.name ?? '');
});