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
  async link({ commit, state }, link) {
    commit('hub', link);
  },
  async deleteHub({ commit, state }, hub) {
    commit('deleteHub', hub);
  },
  async deleteLink({ commit, state }, link) {
    commit('deleteLink', link);
  },
}

// mutations
const mutations = {
  deleteHub(state, hub) {
    let key = 'key' in hub ? hub.key : "Hub#" + hub.id;
    if (!(key in state.ids)) {
      return;
    }
    state.hubs.splice(state.hubs.indexOf(hub), 1);
    delete state.ids[key];
  },
  deleteLink(state, link) {
    let key = 'key' in link ? link.key : "Link#" + link.id;
    if (!(key in state.ids)) {
      return;
    }
    state.links.splice(state.links.indexOf(link), 1);
    delete state.ids[key];
  },
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
    let key = 'key' in link ? link.key : "Link#" + link.id;
    if (key in state.ids) {
      state.ids[key].Copy(link);
      return;
    }
    state.ids[key] = link;
    state.links.push(link);
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}