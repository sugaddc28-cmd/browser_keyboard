import { Synth } from '../audio/synth.js';
import { Elements } from '../elements.js';
import { Scale } from '../scale/scale.js';
import { Key } from './key.js';

export class KeyboardManager {
	static #keyboard = Elements.keyboard;
	static #notes = Scale.getKeyboardNotes();
	static #keyMap = new Map();

	static {
		// 既存の要素をクリア
		this.#keyboard.innerHTML = '';

		// 鍵盤に鍵を追加
		this.#makeKeyboard();

		// 音が鳴った時、keyに押した表示を反映
		Synth.noteStarted.add((note)=>{
			this.#getKey(note).press();
		})
		Synth.noteEnded.add((note)=>{
			this.#getKey(note).release();
		})
	}

	// notesから鍵盤を生成
	static #makeKeyboard() {
		this.#notes.forEach((note) => {
			const key = new Key(note);
			this.#keyboard.appendChild(key.element);
			this.#keyMap.set(note, key);
		});
	}

	// semitoneからKeyインスタンスを取得する
	static #getKey(note){
		return this.#keyMap.get(note);
	}

	// 全Keyを取得
	static get allKeys(){
		return Array.from(this.#keyMap.values());
	}
}