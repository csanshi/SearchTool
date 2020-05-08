/**
 * Created by sanshi on 5/2/20.
 */
var s = "Every one whose name is written on this note will die"

// console.log(s.search(undefined))
var a = '2019/02/28 11:15:00'
function f(item) {
  item = item.toString()
  if(item.length != 19) return item
  if(item.slice(0, 4) == '2020') return item.slice(5, -3)
  else return item.slice(0, -3)
}

console.log(f(a))
