import { Note } from './note.js';
import { ScaleDefinition } from './scaleDefinition.js';

// 全半音のNoteを生成・保持し、同じ音のインスタンスを共有する。
// 半音位置によるNoteの取得と、指定範囲のスケール音の列挙を担当する。
// スケールの構成と判定はScaleDefinitionに委譲する。

export class NoteCatalog {
	// 生成するオクターブ数
	static #octaveCount = 9;

	static #allNotes = null;

	// 全半音（クロマチック）を1音ずつ生成・保持
	static getAllNotes() {
		if (!this.#allNotes) {
			this.#allNotes = [];
			const octaveOffset = Math.floor((this.#octaveCount - 1) / 2);
			const startSemitone = ScaleDefinition.rootSemitonesFromA4 - octaveOffset * 12;
			const totalSemitones = this.#octaveCount * 12;

			for (let i = 0; i < totalSemitones; i++) {
				this.#allNotes.push(new Note(startSemitone + i));
			}
		}
		return this.#allNotes;
	}

	// 半音から共有Noteを取得する
	static getNote(semitonesFromA4){
		const notes = this.getAllNotes();
		return notes[semitonesFromA4 - notes[0].semitonesFromA4];
	}

	// 範囲を指定し、スケールの音を列挙
	// スケールに含まれる音のみを列挙
	static getScaleNotes(octaveCount = this.#octaveCount) {
		const octaveOffset = Math.floor((octaveCount - 1) / 2);
		const startSemitone = ScaleDefinition.rootSemitonesFromA4 - octaveOffset * 12;
		const endSemitone = startSemitone + octaveCount * 12;

		return this.getAllNotes().filter(note =>
			note.semitonesFromA4 >= startSemitone &&
			note.semitonesFromA4 < endSemitone &&
			ScaleDefinition.isInScale(note.semitonesFromA4)
		);
	}
}
