import { NoteDisplay } from '../ui/noteDisplay.js';
import { Synth } from '../audio/synth.js';

// 単音再生

export class NotePlayer {

	// setTimeOut用Timer
	static #notePlayTimerId = null;

	static stopPlayNote() {
		// すでに動いてるタイマーがあれば削除
		if (this.#notePlayTimerId) clearTimeout(this.#notePlayTimerId);
		this.#notePlayTimerId = null;
		NoteDisplay.clear();
	}

	// 音を指定時間表示する
	static playNote(note, durationMs = 1000) {
		// すでに動いてるタイマーがあれば削除
		// if (this.#notePlayTimerId) clearTimeout(this.#notePlayTimerId);

		// 音を再生
		Synth.startNote(note.semitone);

		// 音名を表示
		NoteDisplay.set(note);

		// 指定時間後に表示を消すタイマーをセット
		this.#notePlayTimerId = setTimeout(() => {
			Synth.stopNote(note.semitone);
			NoteDisplay.clear();
		}, durationMs);
	}
}
