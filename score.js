// 楽譜をscore/.scから作成する

// 楽譜ファイルのリスト
const scoreFiles = [
  './score/twinkle.sc',
  './score/tulip.sc'
];




// 文字列から楽譜を作成
// 不正値の検証なし
function makeScore(scoreStr) {
  return scoreStr.split(')')
    .filter(item => item.trim() !== '')/* 要素から改行スペースを取り除いた後、空文字のみの要素だった場合消す */
    .map(item => {
      const [noteRaw, timeStr] = item.split('(');
      const duration = parseFloat(timeStr.replace('秒', '')) * 1000;
      let note = noteRaw.trim();
      if (note === "休符") note = "";

      return { note: note, duration: duration };
    });
}

