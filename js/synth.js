'use strict'

class Synth{
	static #audioContext = new AudioContext();

	// ドレミファソラシ → 周波数(Hz)の対応表
	static #noteFrequencies = Object.freeze({
		'ド': 261.63, // C4
		'レ': 293.66, // D4
		'ミ': 329.63, // E4
		'ファ': 349.23, // F4
		'ソ': 392.00, // G4
		'ラ': 440.00, // A4
		'シ': 493.88, // B4
	});

	static playNote(noteString, durationMs = 1000){
		const frequency = this.#noteFrequencies[noteString];
		if(!frequency)return; // 休符など

		const ascillator = this.#audioContext.createOscillator();
		const gainNode = this.#audioContext.createGain();

		// 周波数と波形をセット
		ascillator.type = "sine"; // 波形： sine, square, sawtooth, triangle
		ascillator.frequency.value = frequency;

		// 発振器→音量調整→スピーカーの順で接続
		ascillator.connect(gainNode);
		gainNode.connect(this.#audioContext.destination);


		const now = this.#audioContext.currentTime;
		const durationSec = durationMs / 1000;

		
	}

}