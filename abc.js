var arr = [1, 3, 5, 2, 3, 8]
// 冒泡排序
function maopao (arr) {
  var len = arr.length;
  for (var i = 0; i < len - 1; i++) {
    for (var j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        temp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = temp;
      }
    }
  }
  return arr
}

// 数组去重
function unique (arr) {
  return Array.from(new set(arr))
}

//indexof数组去重
function unique (arr) {
  var array = [];
  for (var i = 0; i < arr.length; i++) {
    if (array.indexOf(arr[i]) === -1) {
      array.push(arr[i])
    }
  }
  return array
}

// 引入读写核心模块
var fs = require('fs')

// 向文件中写入内容(利用缓冲区解决二进制数据问题)
var data = '\n I am input content \n'
var data = new Buffer(data)//放入缓冲区

// API
fs.writeFile('input.txt', data, {flag: 'a'}, (err) => {
    
    // 写入失败
    if(err){
        console.log(`文件写入失败(${err})`)
    }

    // 写入成功
    console.log(`写入成功！`)

})

// 引入读写核心模块
var fs = require('fs')

// 读取 input.txt 文件(异步非阻塞式)
fs.readFile('input.txt', (err,data) => {
    
    // 读取失败
    if(err) throw err

    // 读取成功
    console.log('- - - - - - - - - - - - - - - - - - - - -')
    console.log(`input.txt：${data}`)
    console.log('- - - - - - - - - - - - - - - - - - - - -')
    
})