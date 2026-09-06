// 音名、絶対音を保持するクラス

export class Note{
	#semitone;
	#name;

	constructor(semitone, noteName){
		this.#semitone = semitone;
		this.#name = noteName;
	}

	get semitone() { return this.#semitone; }
	get name() { return this.#name; }
}