// DOM要素の取得を一か所に集約

export const domElements = Object.freeze({
	// メインUI
	instrumentArea: document.querySelector(".instrument-area"),
	keyboard: document.querySelector(".keyboard"),
	fretboard: document.querySelector(".fretboard"),
	noteDisplay: document.querySelector(".note-display"),

	// 設定パネル
	settingsOpenButton: document.querySelector(".settings-open-button"),
	settingsPanel: document.querySelector(".settings-panel"),
	settingsCloseButton: document.querySelector(".settings-close-button"),
	a4FrequencyInput: document.getElementById("a4-frequency"),
	temperamentSelect: document.getElementById("temperament"),
	waveformSelect: document.getElementById("waveform"),
	notationSelect: document.getElementById("notation"),
	keyboardLayoutSelect: document.getElementById("keyboard-layout"),

	// ボリュームスライダー
	volumeSlider: document.getElementById("volume"),
});