import { Elements } from '../elements.js';
import { Scale } from '../scale/scale.js';
import { Key } from './key.js';
import { NoteInput } from '../input/noteInput.js';


// 中央のルート(ド)の何音手前から物理キーに割り当てるか
const LEAD_NOTES = -2;


export class KeyboardManager {
	static #keyboard = Elements.keyboard;
	static #notes = Scale.getScaleNotes(3);
	static #keyMap = new Map();

	static {
		// 既存の要素をクリア
		this.#keyboard.innerHTML = '';

		// 鍵盤に鍵を追加
		this.#makeKeyboard();

		// インプットを受け取り、キーボードに反映する
		NoteInput.pressed.add((note) => KeyboardManager.displayPressed(note));
		NoteInput.released.add((note) => KeyboardManager.displayReleased(note));
	}

	static displayPressed(note) {
		this.#getKey(note).press();
	}

	static displayReleased(note) {
		this.#getKey(note).release();
	}

	// notesから鍵盤を生成
	static #makeKeyboard() {
		this.#notes.forEach((note) => {
			const key = new Key(note);
			this.#keyboard.appendChild(key.element);
			this.#keyMap.set(note, key);
		});
	}

	// semitoneからKeyインスタンスを取得する
	static #getKey(note) {
		return this.#keyMap.get(note);
	}


	// physicalKeyboardInputに入力キーを設定する用
	static getKeyRows() {
		const rootIndex = this.#notes.findIndex(note => note.isCenterRoot());
		const startIndex = Math.max(0, rootIndex + LEAD_NOTES);
		return [this.allKeys.slice(startIndex)];
	}
}