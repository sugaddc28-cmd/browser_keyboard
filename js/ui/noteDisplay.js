import { Synth } from '../audio/synth.js';
import { Elements } from '../elements.js';

export class NoteDisplay {
	static #displayNote = Elements.displayNote;

	static {
		// 既存の要素をクリア
		this.#displayNote.innerHTML = '';


		// インプットをを受け取り、画面表示に反映する
		NoteInput.pressed.add((note) => NoteDisplay.set(note.name));
		NoteInput.released.add(() => {
			const note = NoteInput.getAllPressedNotes()[0];
			NoteDisplay.set(note?.name ?? '');
		});
	}

	// 音名を表示する
	static set(noteName) {
		this.#displayNote.textContent = noteName;
	}
}