import { NoteInput } from './noteInput.js';
import { KeyboardManager } from '../keyboard/keyboardManager.js';

export class KeyboardInput {
	static #input = new NoteInput();
	static #keyMap = new Map();
	static #activeKeys = new Set(); // 長押しによる event.repeat 防止用

	static  {
		this.#setupKeyMap();
		this.#listenEvents();
	}

	// 鍵盤のノートとPCキーボードのキー（A, S, D, F...）をマッピング
	static #setupKeyMap() {
		const keys = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
		const notes = KeyboardManager.allKeys;

		notes.forEach((keyInstance, index) => {
			if (keys[index]) {
				// キー名を小文字でマッピング
				this.#keyMap.set(keys[index], keyInstance.note);
			}
		});
	}

	static #listenEvents() {
		window.addEventListener('keydown', (e) => {
			if (e.repeat) return; // 長押し連続発火を無視

			const key = e.key.toLowerCase();
			const note = this.#keyMap.get(key);

			if (note && !this.#activeKeys.has(key)) {
				this.#activeKeys.add(key);
				this.#input.press(note);
			}
		});

		window.addEventListener('keyup', (e) => {
			const key = e.key.toLowerCase();
			const note = this.#keyMap.get(key);

			if (note && this.#activeKeys.has(key)) {
				this.#activeKeys.delete(key);
				this.#input.release(note);
			}
		});
	}
}