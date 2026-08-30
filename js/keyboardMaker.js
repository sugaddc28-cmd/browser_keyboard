"use strict";


class KeyboardMaker {
	static #keyboard = Elements.keyboard;

	static #notes = Object.freeze(['ド', 'レ', 'ミ', 'ファ', 'ソ', 'ラ', 'シ']);

	static {
		// 既存の要素をクリア
		this.#keyboard.innerHTML = '';

		// 鍵盤に鍵を追加
		this.#makeKeyboard();
	}

	// notesから鍵盤を生成
	static #makeKeyboard(){
		this.#notes.forEach(note => {
			// keyクラスを持つdiv要素を作成
			const key = document.createElement('div');
			key.classList.add('key');
			key.textContent = note;

			// 作った要素を鍵盤に追加
			this.#keyboard.appendChild(key);

			// クリック時音を鳴らすイベントを付加
			key.addEventListener('pointerdown', () => {
				// TEMP: 取り敢えず自動演奏中鳴らないようにしてる
				if(ScorePlayer.isPlaying)return; 
				NotePlayer.playNote(note)
			});
		});
	}
}