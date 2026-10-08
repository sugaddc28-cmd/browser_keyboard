import { KeyInput } from './keyInput.js';
import { KeyboardManager } from '../keyboard/keyboardManager.js';

// 物理キーの位置(e.code)。日本語配列想定。上から1段目〜4段目
const KeyRows = Object.freeze([
	['Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'IntlYen'],
	['KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight'],
	['KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Backslash', 'Enter'],
	['KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'IntlRo'],
]);


export class PhysicalKeyboardInput {
	static #input = new KeyInput();
	static #layout = 'linear';
	static #keyMap = new Map();    // e.code -> key
	static #activeKeys = new Map(); // 押下中の e.code -> 押した時点のKey

	static {
		this.#setupKeyMap();
		this.#listenEvents();
	}

	static #setupKeyMap() {
		this.#keyMap.clear();
		const keyRows = KeyboardManager.getKeyRows();

		// 物理キーの段ごとに、コードとKeyを先頭から順に対応させる
		KeyRows.forEach((codes, rowIndex) => {
			const keys = keyRows[rowIndex] ?? [];

			codes.forEach((code, index) => {
				if (keys[index]) {
					this.#keyMap.set(code, keys[index]);
				}
			});
		});
	}

	static #listenEvents() {
		window.addEventListener('keydown', (e) => {
			if (e.repeat) return;

			const key = this.#keyMap.get(e.code);
			if (!key || this.#activeKeys.has(e.code)) return;

			this.#activeKeys.set(e.code, key);
			this.#input.press(key);
		});

		window.addEventListener('keyup', (e) => {
			// 押した時点のKeyを離す(途中でレイアウトが変わっても対応できる)
			const key = this.#activeKeys.get(e.code);
			if (!key) return;

			this.#activeKeys.delete(e.code);
			this.#input.release(key);
		});
	}
}