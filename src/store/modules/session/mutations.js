export default {
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
};