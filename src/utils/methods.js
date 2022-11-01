// 转换数据精度问题
export const toFixedNum = (num, n) => {
  let symbol = 1
  if (num < 0) {
    symbol = -1
    num *= -1
  }
  let num2 = (Math.round(num * Math.pow(10, n)) / Math.pow(10, n) +
    Math.pow(10, -(n + 1))).toString().slice(0, -1)

  return parseFloat(num2 * symbol).toFixed(n)
}

// 检测数据类型的方法 使用Object.prototype.toString.call进行检测
// 使用方法 console.log(Type.isBoolean(s)) // true
export const Type = (function () {
  let type = {};
  let typeArr = ['String', 'Object', 'Number', 'Array', 'Undefined', 'Function', 'Null', 'Symbol', 'Boolean', 'RegExp', 'BigInt'];
  for (let i = 0; i < typeArr.length; i++) {
    (function (name) {
      type['is' + name] = function (obj) {
        return Object.prototype.toString.call(obj) === '[object ' + name + ']'
      }
    })(typeArr[i])
  }
  return type
})()

// 判断是否是pc设备
export const isPc = () => {
  let sUserAgent = navigator.userAgent.toLowerCase()
  let bIsIpad = sUserAgent.match(/ipad/i) == "ipad"
  let bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os"
  let bIsMidp = sUserAgent.match(/midp/i) == "midp"
  let bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4"
  let bIsUc = sUserAgent.match(/ucweb/i) == "ucweb"
  let bIsAndroid = sUserAgent.match(/android/i) == "android"
  let bIsCE = sUserAgent.match(/windows ce/i) == "windows ce"
  let bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile"
  if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
    return false
  } else {
    true
  }
}