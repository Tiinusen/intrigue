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
    await commit('clear');
  },
  async hub({ commit, state }, hub) {
    await commit('hub', hub);
  },
  async link({ commit, state }, link) {
    await commit('link', link);
  },
  async deleteHub({ commit, state }, hub) {
    commit('deleteHub', hub);
    hub.links.slice().forEach((link) => { // Copies, Since the original array is mutated during deletion of links
      commit('deleteLink', link);
    });
  },
  async deleteLink({ commit, state }, link) {
    await commit('deleteLink', link);
  },
  async load({ commit, state, dispatch }, data) {
    await dispatch('clear');
    if (typeof data !== 'object' || !('hubs' in state) || !('links' in state)) {
      return console.error("File doesn't contain Intrigue Map data");
    }
    for (var i = 0; i < data.hubs.length; i++) {
      await dispatch("hub", new Hub(data.hubs[i]));
    }
    for (var i = 0; i < data.links.length; i++) {
      var link = new Link(data.links[i]);
      link.hubA = state.ids[link.hubA];
      link.hubB = state.ids[link.hubB];
      await dispatch("link", link);
    }
  }
}

// mutations
const mutations = {
  clear(state) {
    state.hubs.splice(0, state.hubs.length);
    state.links.splice(0, state.links.length);
    state.ids = {};
  },
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
    let indexOfA = link.hubA.links.indexOf(link);
    let indexOfB = link.hubB.links.indexOf(link);
    if (indexOfA !== -1) {
      link.hubA.links.splice(indexOfA, 1);
    }
    if (indexOfB !== -1) {
      link.hubB.links.splice(indexOfB, 1);
    }
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

    let indexOfA = link.hubA.links.indexOf(link);
    let indexOfB = link.hubB.links.indexOf(link);
    if (indexOfA === -1) {
      link.hubA.links.push(link);
    }
    if (indexOfB === -1) {
      link.hubB.links.push(link);
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}