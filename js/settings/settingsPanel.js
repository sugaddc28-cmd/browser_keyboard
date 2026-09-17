import { SettingsElements } from "./settingsElements.js";
import { Tuning } from "../audio/tuning.js";
import { Synth } from "../audio/synth.js";

class SettingsPanel {
	static #panel = SettingsElements.settingsPanel;
	static #openButton = SettingsElements.settingsButton;
	static #closeButton = SettingsElements.settingsPanelClose;

	

	static {
		this.#listenToggle();
		this.#listenAccordion();
		this.#listenControls();
	}

	// 設定パネルの開閉
	static #listenToggle(){
		this.#openButton.addEventListener('click',()=>{
			this.#panel.classList.add('open');
		});

		this.#closeButton.addEventListener('click', ()=>{
			this.#panel.classList.remove('open');
		})
	}

	// 各セクションのアコーディオン開閉
	static #listenAccordion(){
		const headers = this.#panel.querySelectorAll('.settings_section_header');
		headers.forEach(element => {
			element.addEventListener('click', ()=>{
				element.parentElement.classList.toggle('open');
			});
		});
	}

	// 各コントロールと機能クラスの結び付け
	static #listenControls(){
		const a4Input = SettingsElements.a4Input;
		const DEFAULT_A4 = 440;
		const MIN_A4 = 400;
		const MAX_A4 = 480;

		// 入力中の値の代入
		a4Input.addEventListener('input', (e) =>{
			const value = Number(e.target.value);
			if(!Number.isFinite(value) || value <= 0)return;
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
				value = Math.min(MAX_A4,value);
			}

			e.target.value = value;
			Tuning.setA4(value);
		});

	}
}