import { Elements } from '../elements.js';

// 鍵盤の中クリックドラッグによる横スクロールと、初期表示位置の調整を担当
export class KeyboardScroll {
	static #keyboard = Elements.keyboard;

	static {
		this.#centerScroll();
		this.#listenEvents();
	}

	// 初期表示位置を中央に設定
	static #centerScroll() {
		const keyboard = this.#keyboard;
		keyboard.scrollLeft = (keyboard.scrollWidth - keyboard.clientWidth) / 2;
	}

	static #listenEvents() {

		// マウスホイールの縦方向の回転量を横スクロールに変換
		window.addEventListener('wheel', (e) => {
			e.preventDefault(); // ページ全体の縦スクロールを抑制
			this.#keyboard.scrollLeft += e.deltaY/5;
		}, { passive: false });
	}
}