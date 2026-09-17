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

	static #notes = null;

	// スケールの音を列挙
	static getAllNotes() {
		if (!this.#notes) {
			this.#notes = this.#scalePattern.map(span =>
				new Note(this.#rootOffset + span));
		}
		return this.#notes;
	}

	static getName(semitone) {
		const relativePos = semitone - this.#rootOffset; // ルート音からの相対位置
		const index = ((relativePos % 12) + 12) % 12;    // 0～11に正規化
		return noteNames[index];
	}
}