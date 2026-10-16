import {domElements}from '../domElements.js';

const STORAGE_KEY = 'simple-piano-settings';

// 保存対象の設定。キー名 -> 対応するDOM要素と、変更を知らせるイベント名
const SETTING_CONTROLS = Object.freeze({
  volume: { element: domElements.volumeSlider, eventName: 'input' },
  a4Frequency: { element: domElements.a4FrequencyInput, eventName: 'input' },
  waveform: { element: domElements.waveformSelect, eventName: 'change' },
  notation: { element: domElements.notationSelect, eventName: 'change' },
  keyboardLayout: { element: domElements.keyboardLayoutSelect, eventName: 'change' },
});


// 設定値の保存と復元を担当する
export class SettingsStorage{
  static {
    this.#restore();
    this.#bindEvents();
  }

  static #load(){
    try{
      const json = localStorage.getItem(STORAGE_KEY);
      return json ? JSON.parse(json):{};
    }catch{
      return{};
    }
  }

  static #save(){
    const settings ={};
    for(const[name,{element}]of Object.entries(SETTING_CONTROLS)){
      settings[name] = element.value;
    }

    try{
      localStorage.setItem(STORAGE_KEY,JSON.stringify(settings));
    }catch{
      // 保存できない環境では何もしない
    }
  }

  // 保存済みの値をUIに反映し、イベント処理を走らせる
  static #restore(){
    const settings = this.#load();

    for(const [name,{element,eventName}]of Object.entries(SETTING_CONTROLS)){
      const value = settings[name];
      if(typeof value !== 'string')continue;

      element.value = value;

      // selectは選択肢にない値を入れるとvalueが空になるため、その場合は無視する
      if(element.value !== value)continue;

      // 既存のイベント処理をそのまま走らせる
      element.dispatchEvent(new Event(eventName, { bubbles: true }));
    }
  }

  // 設定が変わったら保存する
  static #bindEvents() {
    for (const { element, eventName } of Object.values(SETTING_CONTROLS)) {
      element.addEventListener(eventName, () => this.#save());
    }
  }
}