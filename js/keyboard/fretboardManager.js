import { Elements } from '../elements.js';
import { Scale } from '../scale/scale.js';
import { Key } from './key.js';

// 弦(段)ごとに完全4度差でチューニングされた、半音ごとのフレットボード形式の鍵盤
export class FretboardManager {
	static #STRING_COUNT = 4; // 弦の数
	static #FRET_COUNT = 13; // 1オクターブ+1
	static #FOURTH = 5; // 完全4度 = 半音5つ分
	static #BASE_SEMITONE = -21; // 一番低い弦の開放(0フレット)の半音

	static #fretboard = Elements.fretboard;

	static {
		this.#fretboard.innerHTML = '';
		this.#makeFretboard();
	}

	// 弦(段)ごとに横一列のKeyを生成
	static #makeFretboard() {
		for (let string = 0; string < this.#STRING_COUNT; string++) {
			const row = document.createElement('div');
			row.classList.add('fretboard_row');

			for (let fret = 0; fret < this.#FRET_COUNT; fret++) {
				const semitone = this.#BASE_SEMITONE + this.#FOURTH * string + fret;
				const key = new Key(Scale.getNote(semitone));

				row.appendChild(key.element);
			}

			this.#fretboard.appendChild(row);
		}
	}
}