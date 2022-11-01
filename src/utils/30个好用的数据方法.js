// 数组累加
const accumulate = (...nums) =>
  nums.reduce((acc, n) => [...acc, n + (acc.slice(-1)[0] || 0)], []);