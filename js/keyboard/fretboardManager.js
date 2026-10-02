import { Elements } from '../elements.js';
import { Note } from '../scale/note.js';
import { Key } from './key.js';
import { NoteInput } from '../input/noteInput.js';

// 弦(段)ごとに完全4度差でチューニングされた、半音ごとのフレットボード形式の鍵盤
export class FretboardManager {
	static #STRING_COUNT = 4; // 弦の数
	static #FRET_COUNT = 13; // 1オクターブ+1
	static #FOURTH = 5; // 完全4度 = 半音5つ分
	static #BASE_SEMITONE = -21; // 一番低い弦の開放(0フレット)の半音

	static #fretboard = Elements.fretboard;
	static #keyMap = new Map();

	static {
		this.#fretboard.innerHTML = '';
		this.#makeFretboard();

		NoteInput.pressed.add((note) => FretboardManager.displayPressed(note));
		NoteInput.released.add((note) => FretboardManager.displayReleased(note));
	}

	static displayPressed(note) {
		const key = this.#getKey(note);
		if (key) key.press();
	}

	static displayReleased(note) {
		const key = this.#getKey(note);
		if (key) key.release();
	}

	// 弦(段)ごとに横一列のKeyを生成
	static #makeFretboard() {
		for (let string = 0; string < this.#STRING_COUNT; string++) {
			const row = document.createElement('div');
			row.classList.add('fretboard_row');

			for (let fret = 0; fret < this.#FRET_COUNT; fret++) {
				const semitone = this.#BASE_SEMITONE + this.#FOURTH * string + fret;
				const note = new Note(semitone);
				const key = new Key(note);

				row.appendChild(key.element);
				this.#keyMap.set(note, key);
			}

			this.#fretboard.appendChild(row);
		}
	}

	static #getKey(note) {
		return this.#keyMap.get(note);
	}
}