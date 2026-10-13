import { domElements } from "../domElements.js";
import { Tuning } from "../../music/tuning.js";
import { Synth } from "../../audio/synth.js";
import { NoteNotation } from '../../music/noteNotation.js';
import { PhysicalKeyboardInput } from "../../input/physicalKeyboardInput.js";

class SettingsPanel {
	static #panel = domElements.settingsPanel;
	static #openButton = domElements.settingsOpenButton;
	static #closeButton = domElements.settingsCloseButton;

	static {
		this.#bindToggleEvents();
		this.#bindAccordionEvents();
		this.#bindControlEvents();
	}

	// 設定パネルを閉じる
	static #close() {
		this.#panel.classList.remove('is-open');
	}

	// パネルが隠れてから、アニメーションなしで各セクションを閉じる
	static #resetAccordion() {
		this.#panel.classList.add('is-resetting');
		this.#panel.querySelectorAll('.settings-section.is-open')
			.forEach(section => section.classList.remove('is-open'));
		// 閉じた状態を確定してから、通常のアニメーションを戻す
		void this.#panel.offsetHeight;
		this.#panel.classList.remove('is-resetting');
	}

	// 設定パネルの開閉
	static #bindToggleEvents() {
		this.#panel.addEventListener('transitionend', (e) => {
			if (e.target !== this.#panel || e.propertyName !== 'transform') return;
			if (this.#panel.classList.contains('is-open')) return;

			this.#resetAccordion();
		});

		this.#openButton.addEventListener('click', () => {
			this.#panel.classList.add('is-open');
		});

		this.#closeButton.addEventListener('click', () => {
			this.#close();
		});

		// Escキーで設定パネルを開閉
		window.addEventListener('keydown', (e) => {
			if (e.key !== 'Escape') return;

			if (this.#panel.classList.contains('is-open')) {
				this.#close();
			} else {
				this.#panel.classList.add('is-open');
			}
		});
	}

	// 各セクションのアコーディオン開閉
	static #bindAccordionEvents() {
		const headers = this.#panel.querySelectorAll('.settings-section-header');
		headers.forEach(element => {
			element.addEventListener('click', () => {
				element.parentElement.classList.toggle('is-open');
			});
		});
	}

	// 各コントロールと機能クラスの結び付け
	static #bindControlEvents() {
		const a4FrequencyInput = domElements.a4FrequencyInput;
		const DEFAULT_A4_FREQUENCY = 440;
		const MIN_A4_FREQUENCY = 400;
		const MAX_A4_FREQUENCY = 480;

		// 入力中の値の代入
		a4FrequencyInput.addEventListener('input', (e) => {
			const value = Number(e.target.value);
			if (!Number.isFinite(value) || value <= 0) return;
			Tuning.setA4Frequency(value);
		});

		// フォーカスが外れた時、400~480に修正
		a4FrequencyInput.addEventListener('blur', (e) => {
			const rawValue = e.target.value.trim();
			let value = Number(e.target.value);

			if (rawValue === '' || !Number.isFinite(value)) {
				value = DEFAULT_A4_FREQUENCY;
			} else {
				value = Math.max(MIN_A4_FREQUENCY, value);
				value = Math.min(MAX_A4_FREQUENCY, value);
			}

			e.target.value = value;
			Tuning.setA4Frequency(value);
		});

		// 波形変更
		const waveformSelect = domElements.waveformSelect;
		waveformSelect.addEventListener('change', (e) => {
			Synth.setWaveform(e.target.value);
		});

		// 鍵盤レイアウト切替
		const keyboardLayoutSelect = domElements.keyboardLayoutSelect;
		keyboardLayoutSelect.addEventListener('change', (e) => {
			const layout = e.target.value;
			const isFretboard = layout === 'fretboard';
			domElements.keyboard.classList.toggle('is-hidden', isFretboard);
			domElements.fretboard.classList.toggle('is-hidden', !isFretboard);
			PhysicalKeyboardInput.setLayout(layout);
		});

		domElements.notationSelect.addEventListener('change',(e)=>{
			NoteNotation.setNotation(e.target.value);
		});

	}
}
