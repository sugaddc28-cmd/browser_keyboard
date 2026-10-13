import { Signal } from '../signal.js';

// 半音(クロマチック)名。0=ルート音からの半音差

const noteNames = Object.freeze({
	doremi: [
		'ド', 'ド♯\nレ♭', 'レ', 'レ♯\nミ♭',
		'ミ', 'ファ', 'ファ♯\nソ♭', 'ソ',
		'ソ♯\nラ♭', 'ラ', 'ラ♯\nシ♭', 'シ'
	],
	chromaticSolfege: ['ド', 'ディ', 'レ', 'メ', 'ミ', 'ファ',
		'フィ', 'ソ', 'ル', 'ラ', 'セ', 'シ'],
	abcd: [
		'C', 'C♯\nD♭', 'D', 'D♯\nE♭',
		'E', 'F', 'F♯\nG♭', 'G',
		'G♯\nA♭', 'A', 'A♯\nB♭', 'B'
	],
	iroha: [
		'ハ', '嬰ハ\n変ニ', 'ニ', '嬰ニ\n変ホ',
		'ホ', 'ヘ', '嬰ヘ\n変ト', 'ト',
		'嬰ト\n変イ', 'イ', '嬰イ\n変ロ', 'ロ'
	]
});

export class NoteName {
	static #names = noteNames.doremi;
	static changed = new Signal();

	static setNotation(notation){
		if(!Object.hasOwn(noteNames, notation))return;
		if(this.#names === noteNames[notation])return;

		this.#names = noteNames[notation];
		this.changed.emit();
	}

	static getName(note) {
		return this.#names[note.pitchClass];
	}

}
