import { Tuning } from "./tuning.js";
import { Voice } from "./voice.js";

export class Synth {
	static #volume = 1;
	static #activeVoices = new Map(); // 鳴っているsemitoneを保存

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
			() => { this.#activeVoices.delete(semitone); }
		);

		voice.start(this.#volume,durationMs);
		this.#activeVoices.set(semitone,voice);
	}

	static stopNote(semitone){
		const voice = this.#activeVoices.get(semitone);
		if(!voice)return;

		voice.stop();
	}
}