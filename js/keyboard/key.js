import { NoteInput } from "../imput/noteInput.js";



export class Key {
	#note;
	#element;
	static #input = new NoteInput();

	constructor(note) {
		this.#note = note;
		this.#element = this.#createElement();
	}
	// note プロパティ (ゲッター) を追加
	get note() {
		return this.#note;
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
		key.addEventListener('pointerdown', () => Key.#input.press(this.#note));

		// 押したまま要素内に入ってきた時
		key.addEventListener('pointerenter', (e) => {
			// 主ボタン（左クリックやタッチ）が押されている状態か判定
			if (e.buttons > 0) { Key.#input.press(this.#note);}
		});

		// 離した時
		key.addEventListener('pointerup', () => Key.#input.release(this.#note));

		// 押したまま要素の外へ出た時
		key.addEventListener('pointerleave', () => Key.#input.release(this.#note));

		// タッチ割り込み等でのキャンセル時
		key.addEventListener('pointercancel', () => Key.#input.release(this.#note));

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