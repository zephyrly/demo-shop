/* eslint-disable */
export function getToken () {
  const token = window.sessionStorage.getItem('token')
  return token
}


function aa(list,parentsVal,childId,chidVal) {
  let obj = Array.from(new Set(
      list.map(item => {
        return item['city']
      })))

  let subList = [];
      list.forEach((res) => {
          obj.forEach((ele) => {
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
      console.log('subList', subList);
}