import { Load, WaitForGoogleAPIToLoad } from "../../../utils/Google";

export default {
    async initialize({ commit, state }, { apiKey, clientId, discoveryDocs, scope }) {
        if (!state.isClientInitialized) {
            commit('isClientInitialized', true);
            await WaitForGoogleAPIToLoad()
            await Load("client:auth2");
            await gapi.client.init({
                apiKey: apiKey,
                clientId: clientId,
                discoveryDocs: discoveryDocs,
                scope: scope
            });
            gapi.auth2.getAuthInstance().isSignedIn.listen((isSignedIn) => {
                commit('isSignedIn', isSignedIn);
            });
            commit('isSignedIn', gapi.auth2.getAuthInstance().isSignedIn.get());
        }
    },
    async signIn({ commit, state }) {
        if (!state.isClientInitialized) {
            return console.error("Module not initialized (dispatch initialize first with config)");
        }
        if (state.isSignedIn === true) {
            return console.error("Already signed in");
        }
        gapi.auth2.getAuthInstance().signIn();
    },
    async signOut({ commit, state }) {
        if (!state.isClientInitialized) {
            return console.error("Module not initialized (dispatch initialize first with config)");
        }
        if (state.isSignedIn === false) {
            return console.error("Already signed out");
        }
        gapi.auth2.getAuthInstance().signOut();
    },
    async load({ commit, state, dispatch }, fileId) {
        let file = await gapi.client.drive.files.get({
            fileId,
            alt: 'media'
        });
        if (typeof file !== 'object' || file === null || !('result' in file) || typeof file.result !== 'object' || file.result === null) {
            console.error("Unable to load file");
        }
        return await dispatch('session/load', file.result, { root: true })
    },
    async save({ commit, state, rootState }, fileId = null) {
        let data = {
            hubs: [],
            links: []
        };
        rootState.session.hubs.forEach((hub) => {
            data.hubs.push(hub.Serialize());
        });
        rootState.session.links.forEach((link) => {
            data.links.push(link.Serialize());
        });
        if (fileId === null) { // Create
            var sessionName = prompt("Session name");
            if (typeof sessionName !== 'string' || sessionName.trim() === '') {
                return;
            }
            var fileContent = JSON.stringify(data); // As a sample, upload a text file.
            var file = new Blob([fileContent], { type: "text/plain" });
            var metadata = {
                name: sessionName + ".intrigue", // Filename at Google Drive
                mimeType: "application/json", // mimeType at Google Drive
                parents: [] // Folder ID at Google Drive
            };

            var accessToken = gapi.auth.getToken().access_token; // Here gapi is used for retrieving the access token.
            var form = new FormData();
            form.append(
                "metadata",
                new Blob([JSON.stringify(metadata)], { type: "application/json" })
            );
            form.append("file", file);

            return await new Promise((resolve, reject) => {
                var xhr = new XMLHttpRequest();
                xhr.open(
                    "post",
                    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id"
                );
                xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
                xhr.responseType = "json";
                xhr.onload = () => {
                    resolve(xhr.response.id);
                };
                xhr.send(form);
            });
        }
        // Update content
        return await gapi.client.request({
            path: '/upload/drive/v3/files/' + fileId,
            method: 'PATCH',
            params: {
                uploadType: 'media'
            },
            body: data
        });
    }
};