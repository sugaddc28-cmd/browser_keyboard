import { DOMElements } from '../DOMElements.js';
import { Scale } from '../scale/scale.js';
import { Key } from './key.js';

// 弦(段)ごとに完全4度差でチューニングされた、半音ごとのフレットボード形式の鍵盤
export class FretboardManager {
	static #STRING_COUNT = 4; // 弦の数
	static #FRET_COUNT = 13; // 1オクターブ+1
	static #FOURTH = 5; // 弦毎の音の差
	static #BASE_SEMITONE = -21; // 一番低い弦の開放(0フレット)の半音

	static #fretboard = DOMElements.fretboard;
	static #keyRows = [];

	static {
		this.#fretboard.innerHTML = '';
		this.#makeFretboard();
	}

	// 弦(段)ごとに横一列のKeyを生成
	static #makeFretboard() {
		this.#keyRows = [];
		for (let string = 0; string < this.#STRING_COUNT; string++) {
			const row = document.createElement('div');
			row.classList.add('fretboard_row');
			const keys = [];

			for (let fret = 0; fret < this.#FRET_COUNT; fret++) {
				const semitone = this.#BASE_SEMITONE + this.#FOURTH * string + fret;
				const key = new Key(Scale.getNote(semitone));

				row.appendChild(key.element);
				keys.push(key);
			}
			
			this.#fretboard.appendChild(row);
			this.#keyRows.push(keys);
		}
	}

	// physicalKeyboardInputに入力キーを設定する用(上から1段目〜4段目)
	static getKeyRows() {
		// string 0(最下段)〜string 3(最上段)なので、物理キー(上段〜下段)に合わせて反転
		return [...this.#keyRows].reverse();
	}
}