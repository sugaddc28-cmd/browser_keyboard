import { audioContext } from "./audioContext.js";

export class Voice {
	#oscillator;
	#gainNode;

	constructor(frequency, type = "square", onEnded) {
		this.#oscillator = audioContext.createOscillator();
		this.#gainNode = audioContext.createGain();

		this.#oscillator.type = type;
		this.#oscillator.frequency.value = frequency;

		this.#oscillator.connect(this.#gainNode);
		this.#gainNode.connect(audioContext.destination);

		// 初期状態は無音
		this.#gainNode.gain.value = 0;

		// 発振開始
		this.#oscillator.start();

		// オシレーター停止時のイベント
		this.#oscillator.onended = onEnded;
	}

	// アタック
	start(volume, durationMs = null) {
		const now = audioContext.currentTime;

		// 現在進行中の音量変更予約を取り消し、現在のゲイン値から滑らかに持ち上げる
		this.#gainNode.gain.cancelScheduledValues(now);
		this.#gainNode.gain.setValueAtTime(this.#gainNode.gain.value, now);
		this.#gainNode.gain.linearRampToValueAtTime(0.2 * volume, now + 0.01);

		// 設定が無い場合鳴りっぱなし
		if (durationMs === null) return;
		const durationSec = durationMs / 1000;
		// 2. ディケイ（減衰）: ピーク到達後、無音（0）に向かって指数関数的に減衰させる
		// timeConstant（第3引数）の値を大きくすると余韻が長くなります
		this.#gainNode.gain.setTargetAtTime(0, now + 0.01, durationSec);
		this.#oscillator.stop(now + 0.01 + durationSec);
	}

	// 停止
	stop() {
		const now = audioContext.currentTime;
		this.#gainNode.gain.cancelAndHoldAtTime(now);
		this.#gainNode.gain.setValueAtTime(this.#gainNode.gain.value, now);
		this.#gainNode.gain.linearRampToValueAtTime(0, now + 0.05);

		// 消音後に発振器を停止してリソース開放
		this.#oscillator.stop(now + 0.05);
	}
}