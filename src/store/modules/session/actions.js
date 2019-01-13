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
    async load({ commit, state, dispatch, rootState }, data) {
        if (typeof data !== 'object' || !('hubs' in data) || !('links' in data) || !('version' in data)) {
            return console.error("File doesn't contain Intrigue Map data");
        }
        if (state.version < data.version) {
            // If the file has a newer version than the app version then it should reload the browser
            self.location.reload(true);
            return;
        }
        let upgraded = false;
        while (state.version !== data.version) { // Migrates the file to reach current version
            data.version++;
            upgraded = true;
            switch (data.version) {
                default: // If there is a gap or an unsupported version then throws error
                    return console.error("Session file can't be migrated to current Intrigue Map version");
                // Changes for each File version
            }
        }
        for (let hub of data.hubs) {
            await dispatch("hub", new Hub(hub));
        }
        for (let link of data.links) {
            link = new Link(link);
            link.hubA = state.ids[link.hubA];
            link.hubB = state.ids[link.hubB];
            await dispatch("link", link);
        }
        if (upgraded) {
            await dispatch('google/save', { fileId: rootState.google.loadedFileId }, { root: true });
        }
    }
};