import { NoteInput } from './noteInput.js';
import { Scale } from '../scale/scale.js';

const Keys = Object.freeze(['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', ':', ']', 'enter']);


// notes配列の何番目からKeysに割り当て始めるか
// 現状:C4(ド、中央オクターブ)を`d`キーに合わせるためのオフセット
const START_INDEX = 5;

export class PhysicalKeyboardInput {
	static #input = new NoteInput();
	static #keyMap = new Map();
	static #activeKeys = new Set();

	static {
		this.#setupKeyMap();
		this.#listenEvents();
	}

	static #setupKeyMap() {
		const notes = Scale.getAllScaleNotes().slice(START_INDEX);

		notes.forEach((keyInstance, index) => {
			if (Keys[index]) {
				// キー名をマッピング
				this.#keyMap.set(Keys[index], keyInstance);
			}
		});
	}

	static #listenEvents() {
		window.addEventListener('keydown', (e) => {
			if (e.repeat) return;

			const key = e.key.toLowerCase();
			const note = this.#keyMap.get(key);

			if (!note || this.#activeKeys.has(key)) return;

			this.#activeKeys.add(key);
			this.#input.press(note);
		});

		window.addEventListener('keyup', (e) => {
			const key = e.key.toLowerCase();
			const note = this.#keyMap.get(key);

			if (!note || !this.#activeKeys.has(key)) return;

			this.#activeKeys.delete(key);
			this.#input.release(note);
		});
	}
}