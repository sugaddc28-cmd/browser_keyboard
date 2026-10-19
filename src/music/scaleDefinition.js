// 責務: スケールのルート位置と半音パターンを保持する。
// 半音位置からルート相対の音高分類(0〜11)を計算し、
// スケールへの所属・ルート音・中央のルート音を判定する。

// A4=0からのC4の位置
const C4_SEMITONE = -9;

export class ScaleDefinition {
	static #rootSemitonesFromA4 = C4_SEMITONE;
	static #pattern = Object.freeze([0, 2, 4, 5, 7, 9, 11]);

	static get rootSemitonesFromA4() { return this.#rootSemitonesFromA4; }

	// 絶対的なオクターブ位置を取得    
	static getOctave(semitonesFromA4) {
		return 4 + Math.floor((semitonesFromA4 - C4_SEMITONE) / 12);
	}

	// ルートからの半音差を0〜11に正規化する。
	static getPitchClass(semitonesFromA4) {
		return ((semitonesFromA4 - this.#rootSemitonesFromA4) % 12 + 12) % 12;
	}

	static isInScale(semitonesFromA4) {
		return this.#pattern.includes(this.getPitchClass(semitonesFromA4));
	}

	static isRoot(semitonesFromA4) {
		return this.getPitchClass(semitonesFromA4) === 0;
	}

	static isCentralRoot(semitonesFromA4) {
		return semitonesFromA4 === this.#rootSemitonesFromA4;
	}
}
