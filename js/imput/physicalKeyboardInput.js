import { NoteInput } from './noteInput.js';
import { Scale } from '../scale/scale.js';

const Keys = Object.freeze(['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l']);

export class PhysicalKeyboardInput{
	static #input = new NoteInput();
	static #keyMap = new Map();
	static #activeKeys = new Set();

	static {
		this.#setupKeyMap();
		this.#listenEvents();
	}

	static #setupKeyMap(){
		const notes = Scale.getAllNotes();

		notes.forEach((keyInstance, index) => {
			if(Keys[index]){
				// キー名をマッピング
				this.#keyMap.set(Keys[index],keyInstance);
			}
		});
	}

	static #listenEvents(){
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