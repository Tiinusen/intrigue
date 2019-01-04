import { Hub } from '../../models/Hub'
import { Link } from '../../models/Link'
import { Copy } from '../../utils/Entity';

// initial state
const state = {
  ids: {},
  hubs: [],
  links: []
}

// getters
const getters = {

}

// actions
const actions = {
  async clear({ commit, state }, filename) {
    state.hubs.splice(0, state.hubs.length);
    state.links.splice(0, state.links.length);
    state.ids = {};
  },
  async hub({ commit, state }, hub) {
    commit('hub', hub);
  },
}

// mutations
const mutations = {
  hub(state, hub) {
    let key = 'key' in hub ? hub.key : "Hub#" + hub.id;
    if (key in state.ids) {
      state.ids[key].Copy(hub);
      return;
    }
    state.ids[key] = hub;
    state.hubs.push(hub);
  },
  link(state, link) {
    let key = 'key' in link ? link.key : "Hub#" + link.id;
    if (key in state.ids) {
      state.ids[key].Copy(link);
      return;
    }
    state.ids[key] = link;
    state.hubs.push(link);
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}