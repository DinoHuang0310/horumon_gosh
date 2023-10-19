// 對戰敵人出場率
const battleEnemyProbability = {
  '5': 0.4,
  '4': 0.5,
}

// 對戰捕獲率
const battleDropProbability = {
  '5': 0.03,
  '4': 0.1,
  '3': 0.3,
  '2': 0.6,
  '1': 0.8
}

// 草叢出卡率
const grassDropProbability = {
  '5': 0.03,
  '4': 0.1,
}

// 計算時必須確保順序, 使用map
// 寶貝球機率 appear: 出現率, bonus: 捕獲機率加成
const ballProbability = new Map([
  ['masterBall', { appear: 0.01, bonus: 1, degree: 260 }], // 大師球
  ['highBall', { appear: 0.1, bonus: 0.05, degree: 240 }], // 高級球
  ['superBall', { appear: 0.3, bonus: 0.02, degree: 218 }], // 超級球
])

// 連續對戰觸發率
const nextGame = 0.6

export {
  battleEnemyProbability,
  battleDropProbability,
  grassDropProbability,
  ballProbability,
  nextGame,
}