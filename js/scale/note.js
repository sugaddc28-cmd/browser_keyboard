import { Scale } from "./scale.js";

// 音名、絶対音を保持するクラス

export class Note{
	#semitone;

	constructor(semitone){
		this.#semitone = semitone;
	}

	get semitone() { return this.#semitone; }
	get name() {return Scale.getName(this.#semitone)};
}