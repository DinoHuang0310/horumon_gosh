const getMathNotRepeat = (length, max) => {
  if (length > max) throw new Error("length 不可大於 max");

  const arr = [...Array(max).keys()]; // 產生 [0, 1, 2, ..., max-1]
  
  // Fisher–Yates Shuffle 前 length 次
  for (let i = arr.length - 1; i > arr.length - length - 1; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr.slice(arr.length - length); // 取最後 length 個(等效於打散後前面幾個)
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