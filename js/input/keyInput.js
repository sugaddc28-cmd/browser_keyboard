import { HoldTracker } from "./holdTracker.js";

// InstrumentKey単位の入力。どの入力元(マウス、物理キーボードなど)がInstrumentKeyを押さえているかを管理する
export class KeyInput {
	static #tracker = new HoldTracker();

	// Inputイベント(引数はInstrumentKey)
	static pressed = this.#tracker.pressed;
	static released = this.#tracker.released;

	press(key) {
		KeyInput.#tracker.press(key, this);
	}

	release(key) {
		KeyInput.#tracker.release(key, this);
	}

	static getAllPressedKeys() {
		return KeyInput.#tracker.getAllHeldItems();
	}
}