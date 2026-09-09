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
		key.addEventListener('pointerdown', () => NotePlayer.startNote(this.#note));

		// 押したまま要素内に入ってきた時
		key.addEventListener('pointerenter', (e) => {
			// 主ボタン（左クリックやタッチ）が押されている状態か判定
			if (e.buttons > 0) {NotePlayer.startNote(this.#note);}
		});

		// 離した時
		key.addEventListener('pointerup', () => NotePlayer.stopNote(this.#note));

		// 押したまま要素の外へ出た時
		key.addEventListener('pointerleave', () => NotePlayer.stopNote(this.#note));

		// タッチ割り込み等でのキャンセル時
		key.addEventListener('pointercancel', () => NotePlayer.stopNote(this.#note));

		return key;
	}


	// 押されたときの表示
	press() {
		this.#element.classList.add('active');
	}

	// 
	release() {
		this.#element.classList.remove('active');
	}
}