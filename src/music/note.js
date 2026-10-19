import { ScaleDefinition } from './scaleDefinition.js';
import { NoteNotation } from './noteNotation.js';
import { Tuning } from './tuning.js';

export class Note {
	// A4を0とする半音差
	#semitoneOffset;

	constructor(semitoneOffset) {
		this.#semitoneOffset = semitoneOffset;
	}

	get semitoneOffset() { return this.#semitoneOffset; }
	get name() { return NoteNotation.getName(this); }
	get octave(){return ScaleDefinition.getOctave(this.#semitoneOffset);}
	get pitchClass() { return ScaleDefinition.getPitchClass(this.#semitoneOffset); }
	get isRoot() { return ScaleDefinition.isRoot(this.#semitoneOffset); }
	get isInScale(){return ScaleDefinition.isInScale(this.#semitoneOffset);}
	get isCentralRoot() { return ScaleDefinition.isCentralRoot(this.#semitoneOffset); }
	get frequency() { return Tuning.getFrequency(this.#semitoneOffset); }
}
