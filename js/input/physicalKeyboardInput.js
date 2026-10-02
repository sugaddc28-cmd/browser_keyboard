import { NoteInput } from './noteInput.js';
import { Scale } from '../scale/scale.js';

const Keys = Object.freeze(['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', ':', ']', 'enter']);


// 物理キーの位置(e.code)。日本語配列想定。上から1段目〜4段目
const KeyRows = Object.freeze([
	['Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'IntlYen'],
	['KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight'],
	['KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Backslash', 'Enter'],
	['KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'IntlRo'],
]);


export class PhysicalKeyboardInput {
	static #input = new NoteInput();
	static #layout = 'linear';
	static #keyMap = new Map();    // e.code -> Note
	static #activeKeys = new Map(); // 押下中の e.code -> 押した時点のNote

	static {
		this.#setupKeyMap();
		this.#listenEvents();
	}

	static #setupKeyMap() {
		const notes = Scale.getScaleNotes(3).slice(START_INDEX);

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