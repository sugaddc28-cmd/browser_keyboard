
// 絶対半音(A4からの半音差) → 周波数(Hz) の変換を担当
// 音律の計算方法(平均律・純正律)とチューニング基準(A4=440Hz)を保持する

export class Tuning{
	// チューニング基準
	static #A4 = 440;

	// 絶対半音を渡すと周波数(Hz)を返す
	static getFrequency(note){
		return this.#A4 * (2 ** (note.semitone / 12));
	}
}