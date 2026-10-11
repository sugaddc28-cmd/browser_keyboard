import { DOMElements } from "../DOMElements.js";
import { Tuning } from "../audio/tuning.js";
import { Synth } from "../audio/synth.js";

class SettingsPanel {
	static #panel = DOMElements.settingsPanel;
	static #openButton = DOMElements.settingsButton;
	static #closeButton = DOMElements.settingsPanelClose;

	static {
		this.#listenToggle();
		this.#listenAccordion();
		this.#listenControls();
	}

	// 設定パネルの開閉
	static #listenToggle() {
		this.#openButton.addEventListener('click', () => {
			this.#panel.classList.add('open');
		});

		this.#closeButton.addEventListener('click', () => {
			this.#panel.classList.remove('open');
		});
	}

	// 各セクションのアコーディオン開閉
	static #listenAccordion() {
		const headers = this.#panel.querySelectorAll('.settings_section_header');
		headers.forEach(element => {
			element.addEventListener('click', () => {
				element.parentElement.classList.toggle('open');
			});
		});
	}

	// 各コントロールと機能クラスの結び付け
	static #listenControls() {
		const a4Input = DOMElements.a4Input;
		const DEFAULT_A4 = 440;
		const MIN_A4 = 400;
		const MAX_A4 = 480;

		// 入力中の値の代入
		a4Input.addEventListener('input', (e) => {
			const value = Number(e.target.value);
			if (!Number.isFinite(value) || value <= 0) return;
			Tuning.setA4(value);
		});

		// フォーカスが外れた時、400~480に修正
		a4Input.addEventListener('blur', (e) => {
			const rawVal = e.target.value.trim();
			let value = Number(e.target.value);

			if (rawVal === '' || !Number.isFinite(value)) {
				value = DEFAULT_A4;
			} else {
				value = Math.max(MIN_A4, value);
				value = Math.min(MAX_A4, value);
			}

			e.target.value = value;
			Tuning.setA4(value);
		});

		// 波形変更
		const waveformSelect = DOMElements.waveformSelect;
		waveformSelect.addEventListener('change', (e) => {
			Synth.setWaveform(e.target.value);
		});

		// 鍵盤レイアウト切替
		const keyboardLayoutSelect = DOMElements.keyboardLayoutSelect;
		keyboardLayoutSelect.addEventListener('change', (e) => {
			const isFretboard = e.target.value === 'fretboard';
			DOMElements.keyboard.classList.toggle('hidden', isFretboard);
			DOMElements.fretboard.classList.toggle('hidden', !isFretboard);
		});
	}
}