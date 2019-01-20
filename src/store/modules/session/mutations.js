export default {
    clear(state) {
        let mainScene = state.ids["Scene#MAIN"];
        mainScene.Clear();
        state.hubs.splice(0, state.hubs.length);
        state.links.splice(0, state.links.length);
        state.scenes.splice(0, state.scenes.length);
        state.ids = { "Scene#MAIN": mainScene };
        state.scenes.push(mainScene);
        mainScene.time = new Date('2018-11-21T06:45:00Z');
    },
    deleteHub(state, hub) {
        let key = 'key' in hub ? hub.key : "Hub#" + hub.id;
        if (!(key in state.ids)) {
            return;
        }
        hub = state.ids[key];
        state.hubs.splice(state.hubs.indexOf(hub), 1);
        delete state.ids[key];
        state.scenes.forEach((scene) => {
            scene.RemoveHub(hub);
        });
    },
    deleteScene(state, hub) {
        let key = 'key' in hub ? hub.key : "Scene#" + hub.id;
        if (!(key in state.ids)) {
            return;
        }
        state.scenes.splice(state.scenes.indexOf(hub), 1);
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
    scene(state, scene) {
        let key = 'key' in scene ? scene.key : "Scene#" + scene.id;
        if (key in state.ids) {
            state.ids[key].Copy(scene);
            return;
        }
        state.ids[key] = scene;
        state.scenes.push(scene);
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