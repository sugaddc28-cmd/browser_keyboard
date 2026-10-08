import { Signal } from "../signal.js";

// 「対象(item)を、誰(holder)が押さえているか」を管理する汎用クラス
// 対象を押さえている最初の1人が現れた時に pressed、
// 最後の1人がいなくなった時に released を、それぞれ1回だけ発火する
export class HoldTracker {

  // item -> Set<holder>
  #holdersByItem = new Map();

  pressed = new Signal();
  released = new Signal();

  press(item, holder) {
    let holders = this.#holdersByItem.get(item);
    if (!holders) {
      holders = new Set();
      this.#holdersByItem.set(item, holders);
    }
    const wasEmpty = holders.size === 0; // 追加前に数を記録しておく
    holders.add(holder);

    if (wasEmpty) {
      this.pressed.emit(item);
    }
  }

  release(item, holder) {
    const holders = this.#holdersByItem.get(item);
    if (!holders?.has(holder)) return;

    holders.delete(holder);
    if (holders.size === 0) {
      this.#holdersByItem.delete(item);
      this.released.emit(item);
    }
  }

  // 今押さえられている対象の一覧
  getAllItems() {
    return Array.from(this.#holdersByItem.keys());
  }
}