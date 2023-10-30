// 對戰敵人出場率
const battleEnemyPR = {
  '5': 0.4,
  '4': 0.5,
}

// 對戰捕獲率
const battleDropPR = {
  '5': 0.03,
  '4': 0.1,
  '3': 0.3,
  '2': 0.6,
  '1': 0.8
}

// 草叢出卡率
const grassDropPR = {
  '5': 0.03,
  '4': 0.1,
}

// 計算時必須確保順序, 使用map
// 寶貝球機率 appear: 出現率, bonus: 捕獲機率加成
const ballTypePR = new Map([
  ['masterBall', { appear: 0.01, bonus: 1, degree: 260 }], // 大師球
  ['highBall', { appear: 0.1, bonus: 0.05, degree: 240 }], // 高級球
  ['superBall', { appear: 0.3, bonus: 0.02, degree: 218 }], // 超級球
])

// 前輩
const seniorPR = 0.01

// 連續對戰觸發率
const nextGamePR = 0.6

// 交換機會
const changeChancePR = 0.05
const changeChanceDropPR = {
  '5': 0.3,
  '4': 0.5,
}

export {
  battleEnemyPR,
  battleDropPR,
  grassDropPR,
  ballTypePR,
  seniorPR,
  nextGamePR,
  changeChancePR,
  changeChanceDropPR,
}