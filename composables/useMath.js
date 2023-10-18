const getMathNotRepeat = (length, max) => {
  const getNumber = [];

  const checkRepeat = (nub) => {
    for(let i = 0; i <= getNumber.length; i++) {
      if(nub === getNumber[i]) return false;
    }
    return true;
  }
 
  function getRandom() {
    if(getNumber.length < length) {
      const random = Math.floor(Math.random() * max);
      if(checkRepeat(random)) getNumber.push(random);
      getRandom();
    }
  }
  getRandom();
  return getNumber;
}

// 測試
const probabilityTest = () => {
  const obj = {}
  for(let i = 0; i < 10000; i++) {
    const random = Math.floor(Math.random() * 10);
    if (obj[random] === undefined) {
      obj[random] = 1
    } else {
      obj[random] = obj[random] +1
    }
  }
  console.log(obj)
}

export {
  getMathNotRepeat,
}