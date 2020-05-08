/**
 * Created by sanshi on 4/26/20.
 */
/**
 * Created by sanshi on 4/18/20.
 */
import { getUnconfirmedData } from '../../api/allApi'

export default {
  namespaced: true,
  state: {
    hxrData: [],
    isEditing: false,
  },
  getters: {
    getTableDataByType: (state, getters) => (type) => type == 0 ? state.hxrData : state.hxrData.filter(item => item.type == type)
  },
  mutations: {
    setHxrData(state, hxrData){
      state.hxrData = hxrData
    },
    changeEditing(state){
      state.isEditing = !state.isEditing
    }
  },
  actions: {
    getAllData({ commit }){
      getUnconfirmedData().then(
        responseData => {
          commit('setHxrData', responseData)
        }
      )
    },

  }
}
