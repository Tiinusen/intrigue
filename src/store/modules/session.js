import state from './session/state'
import getters from './session/getters'
import actions from './session/actions'
import mutations from './session/mutations'

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};