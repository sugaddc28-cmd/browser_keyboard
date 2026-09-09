import { Synth } from '../audio/synth.js';
import { Elements } from '../elements.js';

export class NoteDisplay {
	static #displayNote = Elements.displayNote;

	static {
		// 既存の要素をクリア
		this.#displayNote.innerHTML = '';

		// 音表示UI用のイベントを作成
		Synth.addVoiceListener((notes)=>{
			if (notes.length === 0) {
				this.#set("");
				return;
			}
			this.#set(notes[0].name);
		});
	}

	// 音名を表示する
	static #set(noteName) {
		this.#displayNote.textContent = noteName;
	}
}