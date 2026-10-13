import { ScaleDefinition } from "./scaleDefinition.js";


const OCTAVE_NAMES = [
  '₀', '₁', '₂', '₃', '₄',
  '₅', '₆', '₇', '₈', '₉'
];

export class NoteLabel {
  static create(note) {
    const label = document.createElement('span');
    label.classList.add('note_label');
    const name = document.createElement('span');
    name.textContent = note.name;
    const octave = document.createElement('span');
    octave.classList.add('octave_number');
    octave.textContent = OCTAVE_NAMES[ScaleDefinition.getOctave(note.semitone)];
    label.append(name, octave);
    return label;
  }
}