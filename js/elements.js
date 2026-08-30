"use strict";

// 変更を一か所にしたいのでDOM要素を纏めておく
// 巨大になりすぎていたら分割や隠蔽を考えておきたい

const Elements = Object.freeze({
	autoPlayButton: document.querySelector(".auto_play_button"),
	songTitle: document.querySelector(".song_title"),
	keyboard: document.querySelector(".keyboard"),
	displayNote: document.querySelector(".display_note h1"),
});