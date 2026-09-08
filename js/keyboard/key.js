import { NotePlayer } from "../playback/notePlayer.js";

export class Key {
	#note;
	#element;
	
	constructor(note) {
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

		// 押した時
		key.addEventListener('pointerdown', () => {
			this.#press();
		});

		// 押したまま要素内に入ってきた時
		key.addEventListener('pointerenter', (e) => {
			// 主ボタン（左クリックやタッチ）が押されている状態か判定
			if (e.buttons === 1) {
				this.#press();
			}
		});

		// 離した時
		key.addEventListener('pointerup', () => {
			this.#release();
		});

		// 押したまま要素の外へ出た時
		key.addEventListener('pointerleave', () => {
			this.#release();
		});

		// タッチ割り込み等でのキャンセル時
		key.addEventListener('pointercancel', () => {
			this.#release();
		});

		return key;
	}



	press() {
		this.#element.classList.add('active');
		// NotePlayer.startNote(this.#note);
	}

	release() {
		this.#element.classList.remove('active');
		// NotePlayer.stopNote(this.#note);
	}
}