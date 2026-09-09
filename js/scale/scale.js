import { Note } from "./note.js";

// スケール毎の半音パターン
const ScalePatterns = Object.freeze({
	major: [0, 2, 4, 5, 7, 9, 11], // メジャースケール
	minor: [0, 2, 3, 5, 7, 8, 10], // マイナースケール
});


// 半音(クロマチック)名。0=ルート音からの半音差
const noteNames = Object.freeze(['ド', 'ディ', 'レ', 'メ', 'ミ', 'ファ', 'フィ', 'ソ', 'ル', 'ラ', 'セ', 'シ']);


export class Scale {
	static #scalePattern = ScalePatterns.major;

	// ルート音のA4からの半音差。ドを起点にしているので-9
	static #rootOffset = -9;

	// スケールの音名を列挙
	// 鍵盤生成用：{ absoluteSemitone, noteName } の配列を返す
	static getKeyboardNotes() {
		return this.#scalePattern.map(span =>
			new Note(
				this.#rootOffset + span,
				noteNames[span]
			));
	}

	static getName(semitone) {
		return noteNames[semitone - this.#rootOffset];
	}
}