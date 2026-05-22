// 人数を決めて名前入力欄を作る
document.getElementById("setPlayers").onclick = function() {
  const count = Number(document.getElementById("playerCount").value);
  const container = document.getElementById("playerNames");

  container.innerHTML = "";

  if (count < 1 || count > 30) {
    container.innerHTML = "<p>1〜30人で入力してね</p>";
    return;
  }

  for (let i = 1; i <= count; i++) {
    const div = document.createElement("div");
    div.innerHTML = `
      <label>プレイヤー${i}：</label>
      <input type="text" id="player_${i}" placeholder="名前を入力">
    `;
    container.appendChild(div);
  }

  const nextBtn = document.createElement("button");
  nextBtn.textContent = "スコア入力へ進む";
  nextBtn.onclick = goToScoreInput;
  container.appendChild(nextBtn);
};


// スコア入力欄を作る
function goToScoreInput() {
  const scoreArea = document.getElementById("scoreArea");
  scoreArea.innerHTML = "";

  const holeCount = Number(document.getElementById("holeCount").value);
  const playerCount = Number(document.getElementById("playerCount").value);

  const players = [];
  for (let i = 1; i <= playerCount; i++) {
    const name = document.getElementById(`player_${i}`).value || `プレイヤー${i}`;
    players.push(name);
  }

  const title = document.createElement("h2");
  title.textContent = `${holeCount}ホールのスコア入力`;
  scoreArea.appendChild(title);

  for (let h = 1; h <= holeCount; h++) {
    const hTitle = document.createElement("h3");
    hTitle.textContent = `${h}ホール目`;
    scoreArea.appendChild(hTitle);

    players.forEach((name, index) => {
      const div = document.createElement("div");
      div.innerHTML = `
        <label>${name}：</label>
        <input type="number" id="score_${h}_${index}" placeholder="打数">
      `;
      scoreArea.appendChild(div);
    });
  }

  const btn = document.createElement("button");
  btn.textContent = "全ホールの点数を計算";
  btn.onclick = function() {
    calcAllHoles(players, holeCount);
  };
  scoreArea.appendChild(btn);

  const result = document.createElement("p");
  result.id = "totalResult";
  scoreArea.appendChild(result);
}


// 1ホールの勝敗（勝ったら1点）
function judgeHole(scores) {
  const players = Object.keys(scores);
  const result = {};
  players.forEach(p => result[p] = 0);

  for (let i = 0; i < players.length; i++) {
    for (let j = i + 1; j < players.length; j++) {
      const p1 = players[i];
      const p2 = players[j];

      const s1 = scores[p1];
      const s2 = scores[p2];

      if (s1 === s2) continue;

      const winner = s1 < s2 ? p1 : p2;
      result[winner] += 1; // 勝ったら1点
    }
  }

  return result;
}


// 全ホールの合計点を計算
function calcAllHoles(players, holeCount) {
  const totalPoints = {};
  players.forEach(name => totalPoints[name] = 0);

  for (let h = 1; h <= holeCount; h++) {
    const scores = {};

    players.forEach((name, index) => {
      scores[name] = Number(document.getElementById(`score_${h}_${index}`).value);
    });

    const holeResult = judgeHole(scores);

    players.forEach(name => {
      totalPoints[name] += holeResult[name];
    });
  }

  let text = "【全ホールの合計点】\n";
  players.forEach(name => {
    text += `${name}: ${totalPoints[name]}点　`;
  });

  const area = document.getElementById("totalResult");
  area.textContent = text;

  createMatchTable(players, totalPoints);
}


// 最終対戦表（点数＋勝敗）
function createMatchTable(players, totalPoints) {
  let html = "<h2>最終対戦表（合計点と勝敗）</h2>";
  html += "<table border='1' style='border-collapse: collapse;'>";

 <h2>ホール数</h2>
<input id="holeCount" type="number" min="1" max="18" value="9">

<h2>人数を入力（最大30人）</h2>
<input id="playerCount" type="number" min="2" max="30">
<button id="setPlayers">決定</button>

<div id="playerNames"></div>
<div id="scoreArea"></div>

