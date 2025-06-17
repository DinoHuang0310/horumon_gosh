// 對戰敵人出場率
const battleEnemyPR = {
  '5': 60,
  '4': 15,
  '3': 15,
  '2': 15,
  '1': 15
}

// 對戰捕獲率
const battleDropPR = {
  '5': 0.03,
  '4': 0.2,
  '3': 0.3,
  '2': 0.6,
  '1': 0.8
}

// 草叢出卡率
const defaultDropPR = {
  '5': 2,
  '4': 10,
  '3': 20,
  '2': 30,
  '1': 38
}

// 寶貝球機率 weights: 出現權重, bonus: 捕獲機率加成
const ballTypePR = {
  'masterBall': { weights: 1, bonus: 1, degree: 260, color: 'purple' }, // 大師球
  'highBall': { weights: 10, bonus: 0.05, degree: 240, color: 'yellow' }, // 高級球
  'superBall': { weights: 30, bonus: 0.02, degree: 218, color: 'blue' }, // 超級球
  'pokeball': { weights: 59, bonus: 0, degree: 9, color: '#dc2626' }, // 精靈球
}

// 前輩
const seniorPR = 0.01

// 連續對戰觸發率
const nextGamePR = 0.6

// 交換機會
const changeChancePR = 0.05
const changeChanceDropPR = {
  '5': 20,
  '4': 20,
  '3': 20,
  '2': 20,
  '1': 20
}

export {
  battleEnemyPR,
  battleDropPR,
  defaultDropPR,
  ballTypePR,
  seniorPR,
  nextGamePR,
  changeChancePR,
  changeChanceDropPR,
}