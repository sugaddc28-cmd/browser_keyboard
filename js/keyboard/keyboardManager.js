import { Elements } from '../elements.js';
import { Scale } from '../scale/scale.js';
import { Key } from './key.js';

export class KeyboardManager {
	static #keyboard = Elements.keyboard;

	static #notes = Scale.getKeyboardNotes();

	static {
		// 既存の要素をクリア
		this.#keyboard.innerHTML = '';

		// 鍵盤に鍵を追加
		this.#makeKeyboard();
	}

	// notesから鍵盤を生成
	static #makeKeyboard() {
		this.#notes.forEach((note, index) => {
			const key = new Key(index, note);
			this.#keyboard.appendChild(key.element);
		});
	}
}