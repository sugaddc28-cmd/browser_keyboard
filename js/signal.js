// signal.js — 汎用の「購読可能な通知窓口」
export class Signal {
	#listeners = new Set();
	add(listener) { this.#listeners.add(listener); }
	remove(listener) { this.#listeners.delete(listener); }
	emit(payload) { this.#listeners.forEach(cb => cb(payload)); }
}