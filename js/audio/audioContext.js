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
	window.removeEventListener('pointerdown', unlock);
};
window.addEventListener('pointerdown', unlock);