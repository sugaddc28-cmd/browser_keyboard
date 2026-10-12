import { ScaleDefinition } from './scaleDefinition.js';
import { NoteName } from './noteName.js';
import { Tuning } from './tuning.js';

export class Note {
	#semitone;

	constructor(semitone) {
		this.#semitone = semitone;
	}

	get semitone() { return this.#semitone; }
	get name() { return NoteName.getName(this); }
	get pitchClass() { return ScaleDefinition.getPitchClass(this.#semitone); }
	get isRoot() { return ScaleDefinition.isRoot(this.#semitone); }
	get isCenterRoot() { return ScaleDefinition.isCenterRoot(this.#semitone); }
	get frequency() { return Tuning.getFrequency(this.#semitone); }
}
