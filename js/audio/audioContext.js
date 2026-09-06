// 単一の AudioContext インスタンスを export
export const audioContext = new AudioContext();

// ユーザーの初回操作時に自動でサスペンドを解除する初期化処理
const unlock = async () => {
	if (audioContext.state === 'suspended') {
		await audioContext.resume();
	}
	window.removeEventListener('pointerdown', unlock);
};
window.addEventListener('pointerdown', unlock);