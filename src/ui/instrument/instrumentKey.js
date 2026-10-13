import { KeyInput } from "../../input/keyInput.js";
import { NoteNotation } from "../../music/noteNotation.js";
import { NoteLabel } from "../notes/noteLabel.js";


export class InstrumentKey {
	#note;
	#element;
	static #input = new KeyInput();

	static {
		// 押された/離されたInstrumentKey自身の見た目を更新する(どのレイアウトでも共通)
		KeyInput.pressed.add((key) => key.showPressedState());
		KeyInput.released.add((key) => key.showReleasedState());

	}

	constructor(note) {
		this.#note = note;
		this.#element = this.#createElement();
		this.#updateLabel();

		// 名前を変えたとき更新
		NoteNotation.changed.add(() => this.#updateLabel());
	}

	// element プロパティ (ゲッター)
	get element() {
		return this.#element;
	}

	get note(){
		return this.#note;
	}

	#updateLabel() {
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
			key.classList.add('is-root');
		}

		// 押した時
		key.addEventListener('pointerdown', () => InstrumentKey.#input.press(this));

		// 押したまま要素内に入ってきた時
		key.addEventListener('pointerenter', (e) => {
			// 主ボタン（左クリックやタッチ）が押されている状態か判定
			if (e.buttons > 0) { InstrumentKey.#input.press(this); }
		});

		// 離した時
		key.addEventListener('pointerup', () => InstrumentKey.#input.release(this));

		// 押したまま要素の外へ出た時
		key.addEventListener('pointerleave', () => InstrumentKey.#input.release(this));

		// タッチ割り込み等でのキャンセル時
		key.addEventListener('pointercancel', () => InstrumentKey.#input.release(this));

		return key;
	}


	// 押されたときの表示
	showPressedState() {
		this.#element.classList.add('is-pressed');
	}
	showReleasedState() {
		this.#element.classList.remove('is-pressed');
	}
}