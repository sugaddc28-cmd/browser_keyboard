import { domElements } from '../domElements.js';
import { NoteInput } from '../../input/noteInput.js';
import { NoteNotation } from '../../music/noteNotation.js';
import { NoteLabel } from './noteLabel.js';


export class NoteDisplay {
	static #noteDisplay = domElements.noteDisplay;

	static {
		this.update();

		NoteInput.pressed.add(() => this.update());
		NoteInput.released.add(() => this.update());
		NoteNotation.changed.add(() => this.update());
	}

	// 現在鳴らしている音を全て表示する
	static update() {
		const notes = NoteInput.getAllPressedNotes()
			.sort((a, b) => a.semitonesFromA4 - b.semitonesFromA4);

		const elements = notes.map(note => {
			const span = document.createElement('span');
			span.classList.add('note-item');
			span.appendChild(NoteLabel.create(note));
			return span;
		});


		this.#noteDisplay.replaceChildren(...elements);
	}
}
