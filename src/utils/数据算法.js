// 平级数据示例
const arr = [
    {
        "品牌": "xiaomi",
        "机型": "10",
        "配置": "512"
    },
    {
        "品牌": "xiaomi",
        "机型": "10",
        "配置": "128"
    },
    {
        "品牌": "xiaomi",
        "机型": "11",
        "配置": "128"
    },
    {
        "品牌": "xiaomi",
        "机型": "11",
        "配置": "64"
    },
    {
        "品牌": "iPhone",
        "机型": "10",
        "配置": "128"
    },
    {
        "品牌": "iPhone",
        "机型": "11",
        "配置": "64"
    },
    {
        "品牌": "iPhone",
        "机型": "12",
        "配置": "64"
    },
    {
        "品牌": "honor",
        "机型": "4",
        "配置": "256"
    },
    {
        "品牌": "honor",
        "机型": "5",
        "配置": "128"
    },
    {
        "品牌": "honor",
        "机型": "6",
        "配置": "128"
    }
]

// 平级结构数据转父级数据结构1
function delJsonData (param, parentsVal, chidVal, childId) {
    let list = Array.from(
        new Set(
            param.map((item) => {
                return item[parentsVal];
            })
        )
    );
    let subList = [];
    list.forEach((res) => {
        param.forEach((ele) => {
            if (ele[parentsVal] === res) {
                let nameArr = subList.map((item) => item.value);
                if (nameArr.indexOf(res) !== -1) {
                    let nameArr2 = subList[nameArr.indexOf(res)].children.map((item) => item.value);
                    if (nameArr2.indexOf(ele[chidVal]) !== -1) {
                        subList[nameArr.indexOf(res)].children[nameArr2.indexOf(ele[chidVal])];
                    } else {
                        subList[nameArr.indexOf(res)].children.push({
                            value: ele[childId],
                            label: ele[chidVal]
                        });
                    }
                } else {
                    subList.push({
                        value: res,
                        label: res,
                        children: [
                            {
                                value: ele[childId],
                                label: ele[chidVal]
                            }
                        ]
                    });
                }
            }
        });
    });
    return subList
}

// 平级结构数据转父级数据结构2
function delJsonData(arr,params) {
let children = {};
arr.forEach((item, index) => {
	let par = item[params];
	if (!children[par]) {
		children[par] = {
			par,			
			child: []
		}
	}
	children[par].child.push(item);
});
let list = Object.values(children); // list 转换成功的数据
console.log(list)
}


