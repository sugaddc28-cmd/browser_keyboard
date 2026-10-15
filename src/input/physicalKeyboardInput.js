import { KeyInput } from './keyInput.js';
import { KeyboardView } from '../ui/instrument/keyboardView.js';
import { FretboardView } from '../ui/instrument/fretboardView.js'

// 物理キーの位置(e.code)。日本語配列想定。上から1段目〜4段目
const PHYSICAL_KEY_CODE_ROWS = Object.freeze([
	['Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'IntlYen', 'Backspace'],
	['KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight'],
	['KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Backslash', 'Enter'],
	['KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'IntlRo', 'ShiftRight'],
]);


export class PhysicalKeyboardInput {
	static #input = new KeyInput();
	static #layout = 'fretboard';
	static #keyMap = new Map();    // e.code -> key
	static #activeKeys = new Map(); // 押下中の e.code -> 押した時点のInstrumentKey

	static {
		this.#updateKeyMap();
		this.#bindEvents();
	}


	// レイアウト切り替え
	static setLayout(layout) {
		// 切替時に押下中のキーがあれば安全に離す
		this.#activeKeys.forEach((key) => this.#input.release(key));
		this.#activeKeys.clear();

		this.#layout = layout;
		this.#updateKeyMap();
	}

	static #updateKeyMap() {
		this.#keyMap.clear();
		const keyRows = this.#layout === 'fretboard'
			? FretboardView.getKeyRows()
			: KeyboardView.getKeyRows();

		// 物理キーの段ごとに、コードとInstrumentKeyを先頭から順に対応させる
		PHYSICAL_KEY_CODE_ROWS.forEach((codes, rowIndex) => {
			const keys = keyRows[rowIndex] ?? [];

			codes.forEach((code, index) => {
				if (keys[index]) {
					this.#keyMap.set(code, keys[index]);
				}
			});
		});
	}

	static #bindEvents() {
		window.addEventListener('keydown', (e) => {
			if (e.repeat) return;

			const key = this.#keyMap.get(e.code);
			if (!key || this.#activeKeys.has(e.code)) return;

			this.#activeKeys.set(e.code, key);
			this.#input.press(key);
		});

		window.addEventListener('keyup', (e) => {
			// 押した時点のInstrumentKeyを離す(途中でレイアウトが変わっても対応できる)
			const key = this.#activeKeys.get(e.code);
			if (!key) return;

			this.#activeKeys.delete(e.code);
			this.#input.release(key);
		});
	}
}
