// 責務: スケールのルート位置と半音パターンを保持する。
// 半音位置からルート相対の音高分類(0〜11)を計算し、
// スケールへの所属・ルート音・中央のルート音を判定する。

// A4=0からのC4の位置
const C4_SEMITONE = -9;

export class ScaleDefinition {
	static #rootSemitoneOffset = C4_SEMITONE;
	static #pattern = Object.freeze([0, 2, 4, 5, 7, 9, 11]);

	static get rootSemitoneOffset() { return this.#rootSemitoneOffset; }

	// 絶対的なオクターブ位置を取得    
	static getOctave(semitoneOffset) {
		return 4 + Math.floor((semitoneOffset - C4_SEMITONE) / 12);
	}

	// ルートからの半音差を0〜11に正規化する。
	static getPitchClass(semitoneOffset) {
		return ((semitoneOffset - this.#rootSemitoneOffset) % 12 + 12) % 12;
	}

	static isInScale(semitoneOffset) {
		return this.#pattern.includes(this.getPitchClass(semitoneOffset));
	}

	static isRoot(semitoneOffset) {
		return this.getPitchClass(semitoneOffset) === 0;
	}

	static isCentralRoot(semitoneOffset) {
		return semitoneOffset === this.#rootSemitoneOffset;
	}
}
