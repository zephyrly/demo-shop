// object.defineProperty(obj,prop,desc);
// obj:在其上面定义属性的对象
// prop:要定义和修改的属性

// desc:将被定义或修改的属性描述符,其中有
// value	该属性对应的值，默认undefined
//     get		提供getter方法
//     set		提供set方法
//     writable 当且仅当该属性的writable为true时，value才能被赋值运算符改变。默认为 false
// 	enumerable 定义了对象的属性是否可以在 for...in 循环和 Object.keys() 中被枚举 默认为 false
//     Configurable 表示对象的属性是否可以被删除，以及除value和writable特性外的其他特性是否可以被修改 默认为 false

function _const(key, value) {
    window[key] = value;
    Object.defineProperty(window, key, {
      enumerable: false,
      configurable: false,
      get: function () {
        return value;
      },
      set: function (newValue) {
        if (newValue !== value) {
          throw TypeError("只读变量，不可修改");
        } else {
          return value;
        }
      },
    });
  }