import { Tuning } from "./tuning.js";
import { Voice } from "./voice.js";

export class Synth {
	static #volume = 1;
	static #activeVoices = new Map(); // 鳴っているsemitoneを保存
	static #listeners = new Set(); // 鳴っている音が変わった時、発火する処理

	// 変更を通知するリスナーの登録
	static addVoiceListener(handlers) {
		this.#listeners.add(handlers);
	}

	static removeVoiceListener(handlers) {
		this.#listeners.delete(handlers);
	}

	static #notify() {
		this.#listeners.forEach(callback => callback(Array.from(this.#activeVoices.keys())));
	}

	// Map 関連
	// activeVoiceの更新
	static #setActiveVoice(semitone, voice) {
		this.#activeVoices.set(semitone, voice);
		this.#notify();
	}
	static #deleteActiveVoice(semitone) {
		if (this.#activeVoices.delete(semitone)) {
			this.#notify();
		}
	}

	static startNote(semitone,durationMs=null) {
		// 既存のVoiceが残っている場合は再利用
		if (this.#activeVoices.has(semitone)) {
			const voice = this.#activeVoices.get(semitone);
			voice.start(this.#volume,durationMs);
			return;
		}

		const frequency = Tuning.getFrequency(semitone);

		const voice = new Voice(
			frequency,
			"square",
			// オシレーター停止時に Map から削除する
			() => { this.#deleteActiveVoice(semitone); }
		);

		voice.start(this.#volume,durationMs);
		this.#setActiveVoice(semitone,voice);
	}

	static stopNote(semitone){
		const voice = this.#activeVoices.get(semitone);
		if(!voice)return;

		voice.stop();
	}
}