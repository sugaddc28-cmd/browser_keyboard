import { Signal } from '../signal.js';

// 半音(クロマチック)名。0=ルート音からの半音差

const NOTE_NAMES_BY_NOTATION = Object.freeze({
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

export class NoteNotation {
	static #names = NOTE_NAMES_BY_NOTATION.doremi;
	static changed = new Signal();

	static setNotation(notation){
		if(!Object.hasOwn(NOTE_NAMES_BY_NOTATION, notation))return;
		if(this.#names === NOTE_NAMES_BY_NOTATION[notation])return;

		this.#names = NOTE_NAMES_BY_NOTATION[notation];
		this.changed.emit();
	}

	static getName(note, showAlternatives = false) {
		const name = this.#names[note.pitchClass];

		if (showAlternatives) return name;

		return name.split('\n')[0];
	}
}
