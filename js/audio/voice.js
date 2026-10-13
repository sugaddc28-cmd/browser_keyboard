import { audioContext } from "./audioContext.js";
import { masterGainNode } from "./audioContext.js";

// 「実質鳴りっぱなし」を表す停止時刻(秒)。Infinity は指定できないので有限の大きな値にする
const SUSTAIN_DURATION_SECONDS = 60 * 60 * 24 * 365;

export class Voice {
	#oscillator;
	#gainNode;

	constructor(frequency, waveform = "square", onEnded) {
		this.#oscillator = audioContext.createOscillator();
		this.#gainNode = audioContext.createGain();

		this.#oscillator.type = waveform;
		this.#oscillator.frequency.value = frequency;

		this.#oscillator.connect(this.#gainNode);
		this.#gainNode.connect(masterGainNode);

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

		if (durationMs === null){
			// 停止タイマーをリセット
			this.#oscillator.stop(now + SUSTAIN_DURATION_SECONDS);
			return;
		}

		// 消音タイマー
		const durationSeconds = durationMs / 1000;
		// 2. ディケイ（減衰）: ピーク到達後、無音（0）に向かって指数関数的に減衰させる
		// timeConstant（第3引数）の値を大きくすると余韻が長くなります
		this.#gainNode.gain.setTargetAtTime(0, now + 0.01, durationSeconds/5);
		this.#oscillator.stop(now + 0.01 + durationSeconds);
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