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

// 寶貝球機率 appear: 出現率, bonus: 機率加成
const ballProbability = {
  'masterBall': { appear: 0.01, bonus: 1 }, // 大師球
  'highBall': { appear: 0.1, bonus: 0.05 }, // 高級球
  'superBall': { appear: 0.3, bonus: 0.02 }, // 超級球
}

// 連續對戰觸發率
const nextGame = 0.6

export {
  battleEnemyProbability,
  battleDropProbability,
  grassDropProbability,
  ballProbability,
  nextGame,
}