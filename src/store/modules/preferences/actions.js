export default {
    async load({ commit }, data) {
        commit('set', data);
    }
};