import { Hub } from '../../../models/Hub'
import { Link } from '../../../models/Link'

export default {
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
};