import { DOMElements } from './DOMElements.js';
import { NoteTrigger } from './input/noteTrigger.js';

export class NoteDisplay {
	static #displayNote = DOMElements.displayNote;

	static {
		this.update();

		NoteTrigger.started.add(() => this.update());
		NoteTrigger.stopped.add(() => this.update());
	}

	// 現在鳴らしている音を全て表示する
	static update() {
		this.#displayNote.textContent = NoteTrigger
			.getAllPressedNotes()
			.sort((a, b) => a.semitone - b.semitone)
			.map((note) => note.name)
			.join(' ');
	}
}
