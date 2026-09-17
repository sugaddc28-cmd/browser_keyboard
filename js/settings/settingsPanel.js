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
		a4Input.addEventListener('input', (e) =>{
			const value = Number(e.target.value);
			if(!Number.isFinite(value) || value <= 0)return;
			Tuning.setA4(value);
		});

		
	}
}