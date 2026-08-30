"use strict";

// 単音再生

class NotePlayer {
	// DOMの取得
	static #displayNote = Elements.displayNote;

	// setTimeOut用Timer
	static #notePlayTimerId = null;

	static {
		// 既存の要素をクリア
		this.#displayNote.innerHTML = '';
	}

	static stopPlayNote() {
		// すでに動いてるタイマーがあれば削除
		if (this.#notePlayTimerId) clearTimeout(this.#notePlayTimerId);
		this.#notePlayTimerId = null
		this.#displayNote.textContent = '';
	}

	// 音を指定時間表示する
	static playNote(noteStr, durationMs = 1000) {
		// すでに動いてるタイマーがあれば削除
		if (this.#notePlayTimerId) clearTimeout(this.#notePlayTimerId);

		// 音を再生
		Synth.playNote(noteStr, durationMs);

		// 音名を表示
		this.#displayNote.textContent = noteStr;

		// 指定時間後に表示を消すタイマーをセット
		this.#notePlayTimerId = setTimeout(() => {
			this.#displayNote.textContent = '';
		}, durationMs);
	}
}
