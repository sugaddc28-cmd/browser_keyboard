import { Synth } from '../audio/synth.js';
import { Elements } from '../elements.js';

export class NoteDisplay {
	static #displayNote = Elements.displayNote;

	static {
		// 既存の要素をクリア
		this.#displayNote.innerHTML = '';

		// 音表示用UIのイベントを作成
		Synth.noteStarted.add((note)=>{
			this.#set(note.name);
		});
		Synth.noteEnded.add(()=>{
			const activeVoices = Synth.getAllActiveVoices();

			if (activeVoices.length === 0) {
				// 残っている音がなければ表示を消す
				this.#set('');
			} else {
				// まだ音が残っていれば、最初（最古）の音を表示
				this.#set(activeVoices[0].name);
			}
		});
	}

	// 音名を表示する
	static #set(noteName) {
		this.#displayNote.textContent = noteName;
	}
}