// 責務: スケールのルート位置と半音パターンを保持する。
// 半音位置からルート相対の音高分類(0〜11)を計算し、
// スケールへの所属・ルート音・中央のルート音を判定する。

// A4=0からのC4の位置
const C4_SEMITONE = -9;

export class ScaleDefinition {
	static #rootOffset = C4_SEMITONE;
	static #pattern = Object.freeze([0, 2, 4, 5, 7, 9, 11]);

	static get rootOffset() { return this.#rootOffset; }

	// C4とかの音名の数字部分を計算    
	static getOctave(semitone) {
		return 4 + Math.floor((semitone - C4_SEMITONE) / 12);
	}

	// ルートからの半音差を0〜11に正規化する。
	static getPitchClass(semitone) {
		return ((semitone - this.#rootOffset) % 12 + 12) % 12;
	}

	static onScale(semitone) {
		return this.#pattern.includes(this.getPitchClass(semitone));
	}

	static isRoot(semitone) {
		return this.getPitchClass(semitone) === 0;
	}

	static isCenterRoot(semitone) {
		return semitone === this.#rootOffset;
	}
}
