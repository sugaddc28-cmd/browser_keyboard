import { Elements } from '../elements.js';
import { Scale } from '../scale/scale.js';
import { Key } from './key.js';

export class KeyboardManager {
	static #keyboard = Elements.keyboard;
	static #notes = Scale.getKeyboardNotes();
	static #keyMap = new Map();

	static {
		// 既存の要素をクリア
		this.#keyboard.innerHTML = '';

		// 鍵盤に鍵を追加
		this.#makeKeyboard();
	}

	// notesから鍵盤を生成
	static #makeKeyboard() {
		this.#notes.forEach((note) => {
			const key = new Key(note);
			this.#keyboard.appendChild(key.element);
			this.#keyMap.set(note.semitone, key);
		});
	}

	static press(semitone) {
		const key = this.getKey(semitone);
		if (!key) return;
		key.press();
	}

	static release(semitone) {
		const key = this.getKey(semitone);
		if (!key) return;
		key.release();
	}

	// semitoneからKeyインスタンスを取得する
	static getKey(semitone){
		return this.#keyMap.get(semitone);
	}

	// 全Keyを取得
	static get allKeys(){
		return Array.from(this.#keyMap.values());
	}
}