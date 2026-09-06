'use strict'
import { Elements } from '../elements.js';
import { Synth } from '../audio/synth.js';

export class VolumeController {
	static #volumeSlider = Elements.volumeSlider;

	static {
		// 初期値の反映
		this.#updateVolume();

		// スライダー操作時のイベント
		this.#volumeSlider.addEventListener('input', () => this.#updateVolume());
	}

	static #updateVolume() {
		// スライダーのvalue(0~100)を0.0~1.0に変換
		const volumeValue = this.#volumeSlider.value / 100;
		Synth.setVolume(volumeValue);
	}
}