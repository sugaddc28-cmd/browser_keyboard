import { Signal } from "../signal.js";

export class NoteInput {

	// note -> Set<NoteInputインスタンス>（そのnoteを今押しているインターフェース群）
	static #pressersByNote = new Map();

	// Inputイベント
	static pressed = new Signal();
	static released = new Signal();

	press(note) {
		let pressers = NoteInput.#pressersByNote.get(note);
		if (!pressers) {
			pressers = new Set();
			NoteInput.#pressersByNote.set(note, pressers);
		}
		const wasSilent = pressers.size === 0; // 追加前に数値を記録しておく
		pressers.add(this);

		if (wasSilent) {
			NoteInput.pressed.emit(note);
		}
	}

	release(note) {
		const pressers = NoteInput.#pressersByNote.get(note);
		if (!pressers?.has(this)) return;

		pressers.delete(this);
		if (pressers.size === 0) {
			NoteInput.#pressersByNote.delete(note);
			NoteInput.released.emit(note);
		}
	}
}