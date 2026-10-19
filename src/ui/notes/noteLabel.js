import { ScaleDefinition } from "../../music/scaleDefinition.js";


const OCTAVE_SUBSCRIPTS = [
  '₀', '₁', '₂', '₃', '₄',
  '₅', '₆', '₇', '₈', '₉'
];

export class NoteLabel {
  static create(note) {
    const label = document.createElement('span');
    label.classList.add('note-label');
    const name = document.createElement('span');
    name.textContent = note.name;

    // const octave = document.createElement('span');
    // octave.classList.add('octave-number');
    // octave.textContent = OCTAVE_SUBSCRIPTS[ScaleDefinition.getOctave(note.semitoneOffset)];
    // label.append(name, octave);
    label.append(name);

		
    return label;
  }
}