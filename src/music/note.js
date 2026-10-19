import { ScaleDefinition } from './scaleDefinition.js';
import { NoteNotation } from './noteNotation.js';
import { Tuning } from './tuning.js';

export class Note {
	// A4を0とする半音差
	#semitonesFromA4;

	constructor(semitonesFromA4) {
		this.#semitonesFromA4 = semitonesFromA4;
	}

	get notationSemitonesFromA4() {	return ScaleDefinition.getNotationSemitonesFromA4(this.#semitonesFromA4);	}
	get semitonesFromA4() { return this.#semitonesFromA4; }
	get name() { return NoteNotation.getName(this); }
	get octave() { return ScaleDefinition.getOctave(this.#semitonesFromA4); }
	get pitchClass() { return ScaleDefinition.getPitchClass(this.#semitonesFromA4); }
	get isRoot() { return ScaleDefinition.isRoot(this.#semitonesFromA4); }
	get isInScale() { return ScaleDefinition.isInScale(this.#semitonesFromA4); }
	get isCentralRoot() { return ScaleDefinition.isCentralRoot(this.#semitonesFromA4); }

	get #soundingSemitonesFromA4() { return this.#semitonesFromA4 + ScaleDefinition.transposeSemitones; }
	get frequency() { return Tuning.getFrequency(this.#soundingSemitonesFromA4); }
}
