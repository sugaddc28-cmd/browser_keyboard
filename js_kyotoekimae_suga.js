'use strict'

const notes = ['ド', 'レ', 'ミ', 'ファ', 'ソ', 'ラ', 'シ'];
const keyboard = document.querySelector(".keyboard");
const displayNote = document.querySelector(".display_note h1");
let timerId = null;

// 既存の要素をクリア
keyboard.innerHTML = '';

notes.forEach(note => {
  // keyクラスを持つdiv要素を作成
  const key = document.createElement('div');
  key.classList.add('key');
  key.textContent = note;

  // 作った要素を鍵盤に追加
  keyboard.appendChild(key);

  // クリック時のイベント設定
  key.addEventListener('click', () => {
    // すでに動いてるタイマーがあれば削除
    if(timerId)clearTimeout(timerId);

    // 音名を表示
    displayNote.textContent=note;

    // 1秒後 (1000ミリ秒後) に表示を消すタイマーをセット
    timerId = setTimeout(()=>{
      displayNote.textContent='';
    },1000);
  });

});