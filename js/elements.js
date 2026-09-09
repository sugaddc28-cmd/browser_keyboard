// 変更を一か所にしたいのでDOM要素を纏めておく
// 巨大になりすぎていたら分割や隠蔽を考えておきたい

export const Elements = Object.freeze({
	keyboard: document.querySelector(".keyboard"),
	displayNote: document.querySelector(".display_note h1"),
	volumeSlider: document.getElementById("volume"),
});