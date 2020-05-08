/**
 * Created by sanshi on 4/18/20.
 */
import {getConfirmedData} from '../../api/allApi'

export default {
  namespaced: true,
  state: {
    hxrData: [],
    scroll: 0,
    condition: {},
    type: 0
  },
  getters: {
    getResult: (state, getters) => {
      return state.hxrData.filter(item => {
        if(state.type != 0 && state.type != item.type) return false;
        var [date, trainNumber, area] = [state.condition.date, state.condition.trainNumber, state.condition.area]
        return item.date.search(date) != -1 && item.trainNumber.search(trainNumber) != -1
          && (item.startPoint.search(area) != -1 || item.endPoint.search(area) != -1)
      })
    },
  },
  mutations: {
    setHxrData(state, hxrData){
      state.hxrData = hxrData
    },
    setScroll(state, scroll2){
      state.scroll = scroll2
    },
    setCondition(state, condition){
      state.condition = condition
    },
    setType(state, type){
      state.type = type
    }
  },
  actions: {
    getAllData({ commit }){
      getConfirmedData().then(
        responseData => {
          commit('setHxrData', responseData)
        }
      )
    }
  }
}
