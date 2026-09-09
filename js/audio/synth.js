import { Tuning } from "./tuning.js";
import { Voice } from "./voice.js";
import { Signal } from "../signal.js";

export class Synth {
	static #volume = 1;
	static #activeVoices = new Map(); // 鳴っているsemitoneを保存
	static noteStarted = new Signal(); 
	static noteEnded = new Signal();

	static #setActiveVoice(note, voice) {
		this.#activeVoices.set(note, voice);
		this.noteStarted.emit(note);
	}
	static #deleteActiveVoice(note) {
		if (this.#activeVoices.delete(note)) {
			this.noteEnded.emit(note);
		}
	}

	static getAllActiveVoices(){
		return Array.from(this.#activeVoices.keys());
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