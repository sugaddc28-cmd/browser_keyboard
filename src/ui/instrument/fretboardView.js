import { domElements } from '../domElements.js';
import { NoteCatalog } from '../../music/noteCatalog.js';
import { InstrumentKey } from './instrumentKey.js';

// 弦(段)ごとに完全4度差でチューニングされた、半音ごとのフレットボード形式の鍵盤
export class FretboardView {
	static #STRING_COUNT = 4; // 弦の数
	static #FRET_COUNT = 13; // 1オクターブ+1
	static #STRING_INTERVAL_SEMITONES = 5; // 弦毎の音の差
	static #LOWEST_STRING_SEMITONE_OFFSET = -21; // 一番低い弦の開放(0フレット)の半音

	static #fretboard = domElements.fretboard;
	static #keyRows = [];

	static {
		this.#fretboard.innerHTML = '';
		this.#createKeyRows();
	}

	// 弦(段)ごとに横一列のInstrumentKeyを生成
	static #createKeyRows() {
		this.#keyRows = [];
		for (let string = 0; string < this.#STRING_COUNT; string++) {
			const row = document.createElement('div');
			row.classList.add('fretboard-row');
			const keys = [];

			for (let fret = 0; fret < this.#FRET_COUNT; fret++) {
				const semitoneOffset = this.#LOWEST_STRING_SEMITONE_OFFSET + this.#STRING_INTERVAL_SEMITONES * string + fret;
				const key = new InstrumentKey(NoteCatalog.getNote(semitoneOffset));

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