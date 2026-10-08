import { HoldTracker } from "./holdTracker.js";
import { KeyInput } from "./keyInput.js";

// Key単位の入力を、Note単位の「鳴らす/止める」通知に変換する
// 同じNoteを持つKeyが複数押されても、
// 最初の1つで started、最後の1つで stopped を1回だけ発火する
export class NoteTrigger {
  static #tracker = new HoldTracker();

  // Noteイベント(引数はNote)
  static started = this.#tracker.pressed;
  static stopped = this.#tracker.released;

  static {
    // Noteを押さえているのは、そのNoteを持つKey
    KeyInput.pressed.add((key) => NoteTrigger.#tracker.add(key.note, key));
    KeyInput.released.add((key) => NoteTrigger.#tracker.remove(key.note, key));
  }

  // 今押されているNoteの一覧
  static getAllPressedNotes() {
    return NoteTrigger.#tracker.getAllItems();
  }
}