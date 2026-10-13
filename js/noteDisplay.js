import { DOMElements } from './DOMElements.js';
import { NoteTrigger } from './input/noteTrigger.js';
import { NoteName } from './scale/noteName.js';

export class NoteDisplay {
	static #displayNote = DOMElements.displayNote;

	static {
		this.update();

		NoteTrigger.started.add(() => this.update());
		NoteTrigger.stopped.add(() => this.update());
		NoteName.changed.add(() => this.update());
	}

	// 現在鳴らしている音を全て表示する
	static update() {
		const notes = NoteTrigger.getAllPressedNotes()
			.sort((a, b) => a.semitone - b.semitone);

		const elements = notes.map(note => {
			const span = document.createElement('span');
			span.classList.add('note_item');
			span.textContent = note.name;
			return span;
		});


		this.#displayNote.replaceChildren(...elements);
	}
}
