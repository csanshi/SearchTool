/**
 * Created by sanshi on 5/7/20.
 */
const formatDate = function (item) {
  // 2020/02/28 11:15:00
  item = item.toString()
  if(item.length != 19) return item
  if(item.slice(0, 4) == '2020') return item.slice(5, -3)
  else return item.slice(0, -3)
}
export {
  formatDate
}
