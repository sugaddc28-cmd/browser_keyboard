import { NotePlayer } from "../playback/notePlayer.js";
import { ScorePlayer } from "../autoPlay/scorePlayer.js";

export class Key {
	#index;
	#note;
	#element;

	
	constructor(index, note) {
		this.#index = index;
		this.#note = note;
		this.#element = this.#createElement();
	}

	// element プロパティ (ゲッター)
	get element() {
		return this.#element;
	}

	#createElement() {
		// keyクラスを持つdiv要素を作成
		const key = document.createElement('div');
		key.classList.add('key');
		key.textContent = this.#note.name;

		key.addEventListener('pointerdown', () => {
			if (ScorePlayer.isPlaying) return;
			// 絶対音を渡して再生
			NotePlayer.playNote(this.#note);
		})
		return key;
	}


}