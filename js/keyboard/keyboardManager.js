import { Elements } from '../elements.js';
import { Scale } from '../scale/scale.js';
import { Key } from './key.js';

// 中央のルート(ド)の何音手前から物理キーに割り当てるか
const LEAD_NOTES = -2;


export class KeyboardManager {
	static #keyboard = Elements.keyboard;
	static #notes = Scale.getScaleNotes(3);
	static #keys = [];
	// static #keyMap = new Map();

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
			this.#keys.push(key);
		});
	}

	// physicalKeyboardInputに入力キーを設定する用(段ごとのKey配列)
	static getKeyRows() {
		const rootIndex = this.#keys.findIndex(key => key.note.isCenterRoot);
		const startIndex = Math.max(0, rootIndex + LEAD_NOTES);

		// 一列配置は、ホーム段(上から3段目)に割り当てる
		return [[], [], this.#keys.slice(startIndex), []];
	}
}