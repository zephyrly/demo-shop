// 数组累加
const accumulate = (...nums) =>
    nums.reduce((acc, n) => [...acc, n + (acc.slice(-1)[0] || 0)], [])

// map处理数据
let arr = [
    { aa: 1, bb: 2 },
    { aa: 2, bb: 3 },
]
let newArr = arr.map((item) => {
    return {
        label: item.aa,
        value: item.bb,
    }
})
