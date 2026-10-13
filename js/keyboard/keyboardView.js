import { domElements } from '../domElements.js';
import { NoteCatalog } from '../scale/noteCatalog.js';
import { InstrumentKey } from './instrumentKey.js';

// 中央のルート(ド)の何音手前から物理キーに割り当てるか
const HOME_ROW_START_OFFSET = -2;


export class KeyboardView {
	static #keyboard = domElements.keyboard;
	static #notes = NoteCatalog.getScaleNotes(3);
	static #keys = [];
	// static #keyMap = new Map();

	static {
		// 既存の要素をクリア
		this.#keyboard.innerHTML = '';

		// 鍵盤に鍵を追加
		this.#createKeys();
	}

	// notesから鍵盤を生成
	static #createKeys() {
		this.#notes.forEach((note) => {
			const key = new InstrumentKey(note);
			this.#keyboard.appendChild(key.element);
			this.#keys.push(key);
		});
	}

	// physicalKeyboardInputに入力キーを設定する用(段ごとのInstrumentKey配列)
	static getKeyRows() {
		const rootIndex = this.#keys.findIndex(key => key.note.isCentralRoot);
		const startIndex = Math.max(0, rootIndex + HOME_ROW_START_OFFSET);

		// 一列配置は、ホーム段(上から3段目)に割り当てる
		return [[], [], this.#keys.slice(startIndex), []];
	}
}