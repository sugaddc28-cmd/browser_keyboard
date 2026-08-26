'use strict'

const notes = ['ド', 'レ', 'ミ', 'ファ', 'ソ', 'ラ', 'シ'];
const autoPlayButton = document.querySelector(".auto_play_button");
const keyboard = document.querySelector(".keyboard");
const displayNote = document.querySelector(".display_note h1");
const sc = [
  { note: 'ド', duration: 500 },
  { note: 'ド', duration: 500 }, // 休符
  { note: 'ド', duration: 500 },
  { note: 'ド', duration: 500 },
  { note: 'ソ', duration: 500 },
  { note: '', duration: 500 },
  { note: 'ソ', duration: 2000 }
];

let timerId = null;

// 既存の要素をクリア
displayNote.innerHTML = '';
keyboard.innerHTML = '';

// 鍵盤にキーを追加
notes.forEach(note => {
  // keyクラスを持つdiv要素を作成
  const key = document.createElement('div');
  key.classList.add('key');
  key.textContent = note;

  // 作った要素を鍵盤に追加
  keyboard.appendChild(key);

  // クリック時音を鳴らす
  key.addEventListener('click', () => playNote(note));
});

// クリック時の自動演奏
autoPlayButton.addEventListener('click', () => playSequence(makeScore(twinkleStr)));

// 音を指定時間表示する
function playNote(noteString, time = 1000) {
  // すでに動いてるタイマーがあれば削除
  if (timerId) clearTimeout(timerId);

  // 音名を表示
  displayNote.textContent = noteString;

  // 指定時間後に表示を消すタイマーをセット
  timerId = setTimeout(() => {
    displayNote.textContent = '';
  }, time);
}

// 自動演奏
function playSequence(score, index = 0) {
  // 楽譜の最後まで再生したら終了
  if (index >= score.length) return;

  const currentItem = score[index];

  // 音を表示
  if (currentItem.note) {
    playNote(currentItem.note, currentItem.duration);
  }

  // 指定された時間待ってから次の音を呼ぶ
  setTimeout(() => {
    playSequence(score, index + 1);
  }, currentItem.duration);
}
