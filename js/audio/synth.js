import { Tuning } from "./tuning.js";
import { Voice } from "./voice.js";

export class Synth {
	static #volume = 1;
	static #activeVoices = new Map(); // 鳴っているsemitoneを保存
	static #listeners = new Set(); // 鳴っている音が変わった時、発火する処理

	// 変更を通知するリスナーの登録
	static addVoiceListener(listeners) {
		this.#listeners.add(listeners);
	}

	static removeVoiceListener(listeners) {
		this.#listeners.delete(listeners);
	}

	static #notify() {
		this.#listeners.forEach(callback => callback(Array.from(this.#activeVoices.keys())));
	}

	// Map 関連
	// activeVoiceの更新
	static #setActiveVoice(note, voice) {
		this.#activeVoices.set(note, voice);
		this.#notify();
	}
	static #deleteActiveVoice(note) {
		if (this.#activeVoices.delete(note)) {
			this.#notify();
		}
	}

	static startNote(note,durationMs=null) {
		// 既存のVoiceが残っている場合は再利用
		if (this.#activeVoices.has(note)) {
			const voice = this.#activeVoices.get(note);
			voice.start(this.#volume,durationMs);
			return;
		}

		const frequency = Tuning.getFrequency(note.semitone);

		const voice = new Voice(
			frequency,
			"square",
			// オシレーター停止時に Map から削除する
			() => { this.#deleteActiveVoice(note); }
		);

		voice.start(this.#volume,durationMs);
		this.#setActiveVoice(note,voice);
	}

	static stopNote(note){
		const voice = this.#activeVoices.get(note);
		if(!voice)return;

		voice.stop();
	}
}