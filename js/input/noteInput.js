import { Synth } from "../audio/synth.js";

export class NoteInput {

	// note -> Set<NoteInputインスタンス>（そのnoteを今押しているインターフェース群）
	static #sounding = new Map();

	press(note) {
		let holders = NoteInput.#sounding.get(note);
		if (!holders) {
			holders = new Set();
			NoteInput.#sounding.set(note, holders);
		}
		const wasSilent = holders.size === 0; // 追加前に数値を記録しておく
		holders.add(this);

		if (wasSilent) {
			Synth.startNote(note);
		}
	}

	release(note) {
		const holders = NoteInput.#sounding.get(note);
		if (!holders?.has(this)) return;

		holders.delete(this);
		if (holders.size === 0) {
			NoteInput.#sounding.delete(note);
			Synth.stopNote(note);
		}
	}
}