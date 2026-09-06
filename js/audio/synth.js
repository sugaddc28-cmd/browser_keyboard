import { Tuning } from "../scale/tuning.js";

export class Synth {
	static #audioContext = new AudioContext();
	static #masterVolume;



	static setVolume(value) {
		this.#masterVolume = value;
	}



	static playNote(note, durationMs = 1000) {
		const frequency = Tuning.getFrequency(note);
		if (!frequency) return; // 休符など

		const oscillator = this.#audioContext.createOscillator();
		const gainNode = this.#audioContext.createGain();

		// 周波数と波形をセット
		oscillator.type = "square"; // 波形： sine, square, sawtooth, triangle
		oscillator.frequency.value = frequency;

		// 発振器→個別音量調整→スピーカーの順で接続
		oscillator.connect(gainNode);
		gainNode.connect(this.#audioContext.destination);

		// エンベロープ用の時間を取得
		const now = this.#audioContext.currentTime;
		const durationSec = durationMs / 1000;

		// 音量エンベロープ（急に鳴って急に切れるとプツッと音が出るので緩和）
		gainNode.gain.setValueAtTime(0.0, now); // 最初無音
		gainNode.gain.linearRampToValueAtTime(0.2*this.#masterVolume, now + 0.01); // アタック
		gainNode.gain.linearRampToValueAtTime(0.15*this.#masterVolume, now + durationSec - 0.01);
		gainNode.gain.linearRampToValueAtTime(0, now + durationSec); // リリース

		oscillator.start(now);
		oscillator.stop(now + durationSec);
	}

}