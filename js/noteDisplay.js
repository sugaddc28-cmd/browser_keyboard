import { Elements } from './elements.js';
import { KeyInput } from './input/keyInput.js';

export class NoteDisplay {
	static #displayNote = Elements.displayNote;

	static {
		// 既存の要素をクリア
		this.#displayNote.innerHTML = '';


		// インプットをを受け取り、画面表示に反映する
		KeyInput.pressed.add((key) => NoteDisplay.set(key.note.name));
		KeyInput.released.add(() => {
			const key = KeyInput.getAllPressedKeys()[0];
			NoteDisplay.set(key?.note.name ?? '');
		});
	}

	// 音名を表示する
	static set(noteName) {
		this.#displayNote.textContent = noteName;
	}
}