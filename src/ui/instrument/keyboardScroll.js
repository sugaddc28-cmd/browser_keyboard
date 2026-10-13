import { domElements } from '../domElements.js';

// マウスホイールによる鍵盤の横スクロールと、初期表示位置の調整を担当
export class KeyboardScroll {
	static #keyboard = domElements.keyboard;
	static #instrumentArea = domElements.instrumentArea;

	static {
		this.#scrollToCenter();
		this.#bindEvents();
	}

	// 初期表示位置を中央に設定
	static #scrollToCenter() {
		const keyboard = this.#keyboard;
		keyboard.scrollLeft = (keyboard.scrollWidth - keyboard.clientWidth) / 2;
	}

	static #bindEvents() {

		// マウスホイールの縦方向の回転量を横スクロールに変換
		this.#instrumentArea.addEventListener('wheel', (e) => {
			e.preventDefault(); // ページ全体の縦スクロールを抑制
			this.#keyboard.scrollLeft += e.deltaY / 5;
		}, { passive: false });
	}
}