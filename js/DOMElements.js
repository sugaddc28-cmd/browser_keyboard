// DOM要素の取得を一か所に集約

export const DOMElements = Object.freeze({
	// メインUI
	mainObject: document.querySelector(".main_object"),
	keyboard: document.querySelector(".keyboard"),
	fretboard: document.querySelector(".fretboard"),
	displayNote: document.querySelector(".display_note h1"),

	// 設定パネル
	settingsButton: document.querySelector(".settings_button"),
	settingsPanel: document.querySelector(".settings_panel"),
	settingsPanelClose: document.querySelector(".settings_panel_close"),
	a4Input: document.getElementById("a4-freq"),
	temperamentSelect: document.getElementById("temperament"),
	waveformSelect: document.getElementById("waveform"),
	notationSelect: document.getElementById("notation"),
	keyboardLayoutSelect: document.getElementById("keyboard-layout"),

	// ボリュームスライダー
	volumeSlider: document.getElementById("volume"),
});