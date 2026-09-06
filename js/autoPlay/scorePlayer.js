import { Elements } from '../elements.js';
import { Score } from './score.js';
import { NotePlayer } from '../playback/notePlayer.js';

// 自動再生機能
// プロパティでDOMの更新を管理させている

export class ScorePlayer {
	// DOMの取得
	static #autoPlayButton = Elements.autoPlayButton;
	static #songTitle = Elements.songTitle;

	// setTimeOut用Timer
	static #autoPlayTimerId = null;

	// 再生フラグ(UI管理を兼ねる)
	static #_isPlaying = false;
	static get isPlaying() {
		return this.#_isPlaying;
	}
	static set #isPlaying(value) {
		this.#_isPlaying = value;

		// 再生ボタンの書き換え＋曲名UIのアクティブ化
		if (this.isPlaying) {
			this.#autoPlayButton.textContent = "演奏中止";
			this.#songTitle.classList.add("is-active");
		}
		else {
			this.#autoPlayButton.textContent = "自動演奏";
			this.#songTitle.classList.remove("is-active");
		}
	}

	// titleプロパティ（実体無し)
	static set #title(value) {
		this.#songTitle.textContent = "自動演奏中です：" + value;
	}

	// クラスロード時
	static {
		this.#autoPlayButton.addEventListener('click', () => this.#handleButtonClick());
	}

	// 再生ボタン押下時
	static #handleButtonClick() {
		if (this.isPlaying) {
			this.stopScore();
		} else {
			this.#playScore();
		}
	}

	// 停止
	static stopScore() {
		// フラグ管理
		this.#isPlaying = false;

		// 自動再生の停止
		if (this.#autoPlayTimerId) {
			clearTimeout(this.#autoPlayTimerId);
			this.#autoPlayTimerId = null;
		}

		// 演奏中の単音を止める
		NotePlayer.stopPlayNote();
	}

	// 再生
	static #playScore() {
		// ランダムに楽譜を生成
		const score = Score.getRandomScore()

		// 再生フラグを立て、タイトルを更新
		this.#isPlaying = true;
		this.#title = score.title;

		// 再生開始
		this.#playSequence(score.data);
	}

	// 自動演奏(timerを用い再帰的にplaySequenceを呼び出す)
	static #playSequence(scoreData, index = 0) {
		// 楽譜の最後まで再生したら終了
		if (index >= scoreData.length) {
			this.#isPlaying = false;
			return;
		}
		const currentItem = scoreData[index];

		// 音を表示
		if (currentItem.note) {
			NotePlayer.playNote(currentItem.note, currentItem.duration);
		}

		// 指定された時間待ってから次の音を呼ぶ
		this.#autoPlayTimerId =
			setTimeout(() =>
				this.#playSequence(scoreData, index + 1),
				currentItem.duration);
	}
}