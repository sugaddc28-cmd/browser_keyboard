"use strict";

// 単音再生

class NotePlayer {
	// DOMの取得
	static #displayNote = Elements.displayNote;

	static #timerId = null;

	static {
		// 既存の要素をクリア
		this.#displayNote.innerHTML = '';
	}
	
	static stopPlayNote(){
		// すでに動いてるタイマーがあれば削除
		if (this.#timerId) clearTimeout(this.#timerId);
		this.#timerId=null
		this.#displayNote.textContent = '';
	}

	// 音を指定時間表示する
	static playNote(noteString, time = 1000) {
		// すでに動いてるタイマーがあれば削除
		if (this.#timerId) clearTimeout(this.#timerId);

		// 音名を表示
		this.#displayNote.textContent = noteString;

		// 指定時間後に表示を消すタイマーをセット
		this.#timerId = setTimeout(() => {
			this.#displayNote.textContent = '';
		}, time);
	}
}
