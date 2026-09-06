import { Elements } from '../elements.js';

export class NoteDisplay {
	static #displayNote = Elements.displayNote;

	static {
		// 既存の要素をクリア
		this.#displayNote.innerHTML = '';
	}

	// 音名を表示する
	static set(note) {
		this.#displayNote.textContent = note.name;
	}

	// 表示を消す
	static clear() {
		this.#displayNote.textContent = '';
	}
}