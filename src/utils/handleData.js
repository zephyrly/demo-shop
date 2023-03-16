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

// 合并数组对象相同项，并对某项求和

let data1 = [
    { material_no: '1001', qty: 100 },
    { material_no: '1002', qty: 100 },
    { material_no: '1003', qty: 100 },
    { material_no: '1001', qty: 100 },
    { material_no: '1002', qty: 100 },
    { material_no: '1004', qty: 100 },
    { material_no: '1001', qty: 100 },
    { material_no: '1006', qty: 100 },
    { material_no: '1001', qty: 100 },
    { material_no: '1009', qty: 100 },
    { material_no: '1001', qty: 100 },
]
function handleData(data) {
    let temp = []
    let newData = []
    data.map((item) => {
        let index = temp.indexOf(item.material_no)
        if (index >= 0) {
            newData[index].qty = newData[index].qty + item.qty
        } else {
            temp.push(item.material_no)
            newData.push({
                material_no: item.material_no,
                qty: item.qty,
            })
        }
    })
    console.log(newData)
}

handleData(data1)

// 合并数组对象相同项，并对某项求和
function handleData() {
    const sums = [
        ...data1
            .reduce((map, item) => {
                const { material_no: key, qty } = item
                const prev = map.get(key)
                if (prev) {
                    prev.qty += qty
                } else {
                    map.set(key, Object.assign({}, item))
                }
                return map
            }, new Map())
            .values(),
    ]
    console.log(sums)
}

// 统计数组中变量出现个数
let person = ['李白','雅典娜','安琪拉','李白','诸葛亮','安琪拉']
let nameObj = person.reduce((pre,cur) =>{
    if( cur in pre){
        pre[cur]++
    }
    else{
        pre[cur] = 1
    }
    return pre
}, {})
console.log(nameObj) // {李白: 2, 雅典娜: 1, 安琪拉: 2, 诸葛亮: 1}

