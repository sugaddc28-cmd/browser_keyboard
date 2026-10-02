// 単一の AudioContext インスタンスを export
export const audioContext = new AudioContext();

// マスターボリューム用の GainNode を作成して destination に接続
export const masterGainNode = audioContext.createGain();
masterGainNode.gain.setValueAtTime(0, audioContext.currentTime);
masterGainNode.connect(audioContext.destination);


// ボリューム設定関数 (0.0 ～ 1.0)
export const setMasterVolume = (value) => {
  // 現在時刻から滑らかに変更（ノイズ防止）
  masterGainNode.gain.setTargetAtTime(value, audioContext.currentTime, 0.01);
};

// ユーザーの初回操作時に自動でサスペンドを解除する初期化処理
const unlock = async () => {
	if (audioContext.state === 'suspended') {
		await audioContext.resume();
	}
	// 解除イベントの削除
	window.removeEventListener('pointerdown', unlock, { capture: true });
	window.removeEventListener('touchstart', unlock, { capture: true });
	window.removeEventListener('keydown', unlock, { capture: true });
};
// イベントの登録
window.addEventListener('pointerdown', unlock, { capture: true });
window.addEventListener('touchstart', unlock, { capture: true });
window.addEventListener('keydown', unlock, { capture: true });