import { HoldTracker } from "./holdTracker.js";
import { KeyInput } from "./keyInput.js";

// InstrumentKey単位の入力を、Note単位の「鳴らす/止める」通知に変換する
// 同じNoteを持つInstrumentKeyが複数押されても、
// 最初の1つで pressed、最後の1つで released を1回だけ発火する
export class NoteInput {
  static #tracker = new HoldTracker();

  // Noteイベント(引数はNote)
  static pressed = this.#tracker.pressed;
  static released = this.#tracker.released;

  static {
    // Noteを押さえているのは、そのNoteを持つInstrumentKey
    KeyInput.pressed.add((key) => NoteInput.#tracker.press(key.note, key));
    KeyInput.released.add((key) => NoteInput.#tracker.release(key.note, key));
  }

  // 今押されているNoteの一覧
  static getAllPressedNotes() {
    return NoteInput.#tracker.getAllHeldItems();
  }
}