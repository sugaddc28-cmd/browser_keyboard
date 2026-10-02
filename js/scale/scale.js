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

	// 生成するオクターブ数
	static #octaveCount = 9;

	static #allNotes = null;

	// 全半音（クロマチック）を1音ずつ生成・保持
	static getAllNotes() {
		if (!this.#allNotes) {
			this.#allNotes = [];
			const octaveOffset = Math.floor((this.#octaveCount - 1) / 2);
			const startSemitone = this.#rootOffset - octaveOffset * 12;
			const totalSemitones = this.#octaveCount * 12;

			for (let i = 0; i < totalSemitones; i++) {
				this.#allNotes.push(new Note(startSemitone + i));
			}
		}
		return this.#allNotes;
	}

	// 範囲を指定し、半音を列挙

	// 範囲を指定し、スケールの音を列挙
	// スケールに含まれる音のみを列挙
	static getScaleNotes(octave = this.#octaveCount) {
		const octaveOffset = Math.floor((octave - 1) / 2);
		const startSemitone = this.#rootOffset - octaveOffset * 12;
		const endSemitone = startSemitone + octave * 12;

		return this.getAllNotes().filter(note =>
			note.semitone >= startSemitone &&
			note.semitone < endSemitone &&
			this.onScale(note.semitone)
		);
	}

	// 12段階の音高分類を取得
	static getPitchClass(semitone){
		const relativePos = semitone - this.#rootOffset; // ルート音からの相対位置
		const degree = ((relativePos % 12) + 12) % 12;    // 0～11に正規化
		return degree;
	}

	static getName(semitone) {
		const degree = this.getPitchClass(semitone);
		return noteNames[degree];
	}

	static onScale(semitone){
		const degree = this.getPitchClass(semitone);
		return this.#scalePattern.includes(degree);
	}

	// ルート音(ド)かどうかを判定
	static isRoot(semitone) {
		const degree = this.getPitchClass(semitone);
		return degree === 0;
	}
	// 基準オクターブ(中央)のルート音(ド)かどうかを判定
	static isCenterRoot(semitone) {
		return semitone === this.#rootOffset;
	}
}