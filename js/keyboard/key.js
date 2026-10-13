import { KeyInput } from "../input/keyInput.js";
import { NoteName } from "../scale/noteName.js";
import { NoteLabel } from "../scale/noteLabel.js";


export class Key {
	#note;
	#element;
	static #input = new KeyInput();

	static {
		// 押された/離されたKey自身の見た目を更新する(どのレイアウトでも共通)
		KeyInput.pressed.add((key) => key.press());
		KeyInput.released.add((key) => key.release());

	}

	constructor(note) {
		this.#note = note;
		this.#element = this.#createElement();
		this.#updateName();

		// 名前を変えたとき更新
		NoteName.changed.add(() => this.#updateName());
	}

	// element プロパティ (ゲッター)
	get element() {
		return this.#element;
	}

	get note(){
		return this.#note;
	}

	#updateName() {
		this.#element.replaceChildren(
			NoteLabel.create(this.#note)
		);
	}

	#createElement() {
		// keyクラスを持つdiv要素を作成
		const key = document.createElement('div');
		key.classList.add('key');

		// ルート音の場合、装飾用クラスを付与
		if (this.#note.isRoot) {
			key.classList.add('key_root');
		}

		// 押した時
		key.addEventListener('pointerdown', () => Key.#input.press(this));

		// 押したまま要素内に入ってきた時
		key.addEventListener('pointerenter', (e) => {
			// 主ボタン（左クリックやタッチ）が押されている状態か判定
			if (e.buttons > 0) { Key.#input.press(this); }
		});

		// 離した時
		key.addEventListener('pointerup', () => Key.#input.release(this));

		// 押したまま要素の外へ出た時
		key.addEventListener('pointerleave', () => Key.#input.release(this));

		// タッチ割り込み等でのキャンセル時
		key.addEventListener('pointercancel', () => Key.#input.release(this));

		return key;
	}


	// 押されたときの表示
	press() {
		this.#element.classList.add('active');
	}
	release() {
		this.#element.classList.remove('active');
	}
}