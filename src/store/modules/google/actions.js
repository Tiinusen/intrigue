import { Load, WaitForGoogleAPIToLoad } from "../../../utils/Google";

const SavedSessionFolderName = "Saved Intrigue Map Sessions";

// Should be executed BEFORE any hash change has occurred.
(function (namespace) { // Closure to protect local variable "var hash"
    if ('replaceState' in history) { // Yay, supported!
        namespace.replaceHash = function (newhash) {
            if (('' + newhash).charAt(0) !== '#') newhash = '#' + newhash;
            history.replaceState('', '', newhash);
        }
    } else {
        var hash = location.hash;
        namespace.replaceHash = function (newhash) {
            if (location.hash !== hash) history.back();
            location.hash = newhash;
        };
    }
})(window);
// This function can be namespaced. In this example, we define it on window:


export default {
    async initialize({ commit, state, dispatch }, { apiKey, clientId, discoveryDocs, scope }) {
        if (!state.clientInitialized) {
            commit('setClientInitialized', true);
            await Load("client:auth2");
            await gapi.client.init({
                apiKey: apiKey,
                clientId: clientId,
                discoveryDocs: discoveryDocs,
                scope: scope
            });
            gapi.auth2.getAuthInstance().isSignedIn.listen(async (isSignedIn) => {
                commit('setSignedIn', isSignedIn);
                if (state.isSignedIn) {
                    await dispatch('loadUserData');
                    await dispatch('loadFileListIntoState');
                }
            });
            commit('setSignedIn', gapi.auth2.getAuthInstance().isSignedIn.get());
            if (state.signedIn) {
                await dispatch('loadUserData');
                await dispatch('loadFileListIntoState');
                let hash = window.location.hash.substr(2).trim(" ");
                if (hash !== "") {
                    let found = false;
                    for (let file of state.files) {
                        if (file.id === hash) {
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        replaceHash("");
                        return;
                    }
                    await dispatch("load", { fileId: hash });
                }
            }
        }
    },
    async signIn({ commit, state }) {
        if (!state.clientInitialized) {
            return console.error("Module not initialized (dispatch initialize first with config)");
        }
        if (state.signedIn === true) {
            return console.error("Already signed in");
        }
        gapi.auth2.getAuthInstance().signIn();
    },
    async signOut({ commit, state }) {
        if (!state.clientInitialized) {
            return console.error("Module not initialized (dispatch initialize first with config)");
        }
        if (state.signedIn === false) {
            return console.error("Already signed out");
        }
        gapi.auth2.getAuthInstance().signOut();
    },
    async toggleAutoSync({ commit, state, dispatch }) {
        if (!state.clientInitialized) {
            return console.error("Module not initialized (dispatch initialize first with config)");
        }
        if (state.signedIn === false) {
            return console.error("You need to be signed in to use this feature");
        }
        if (state.loadedFileId === null) {
            return console.error("You need to first save the session or load a already saved session");
        }

        if (state.autoSyncIntervalRef !== null) {
            clearInterval(state.autoSyncIntervalRef);
            commit('setAutoSync', null);
            return;
        }
        commit('setAutoSync', setInterval(() => {
            if (!state.signedIn || state.loadedFileId === null) { // In case file has been deleted or user has signed out
                clearInterval(state.autoSyncIntervalRef);
                commit('setAutoSync', null);
                return;
            }
            dispatch('sync');
        }, state.autoSyncInterval));
    },
    async sync({ commit, state, dispatch }) {
        if (!state.clientInitialized) {
            return console.error("Module not initialized (dispatch initialize first with config)");
        }
        if (state.signedIn === false) {
            return console.error("You need to be signed in to use this feature");
        }
        if (state.loadedFileId === null) {
            return console.error("You need to first save the session or load a already saved session");
        }
        // Not yet implemented
    },
    async saveUserData({ commit, state, dispatch, rootState }) {
        if (!state.clientInitialized) {
            return console.error("Module not initialized (dispatch initialize first with config)");
        }
        if (state.signedIn === false) {
            return;
        }
        if (state.appDataFileId === null) {
            var fileContent = JSON.stringify(rootState.preferences); // As a sample, upload a text file.
            var file = new Blob([fileContent], { type: "text/plain" });
            var metadata = {
                name: "preferences.imap", // Filename at Google Drive
                mimeType: "application/json", // mimeType at Google Drive
                parents: ['appDataFolder'] // Folder ID at Google Drive
            };

            var accessToken = gapi.auth.getToken().access_token; // Here gapi is used for retrieving the access token.
            var form = new FormData();
            form.append(
                "metadata",
                new Blob([JSON.stringify(metadata)], { type: "application/json" })
            );
            form.append("file", file);

            let fileId = await new Promise((resolve, reject) => {
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
            commit('setAppDataFileId', fileId);
        }
        await gapi.client.request({
            path: '/upload/drive/v3/files/' + state.appDataFileId,
            method: 'PATCH',
            params: {
                uploadType: 'media'
            },
            body: JSON.stringify(rootState.preferences)
        });
    },
    async deleteUserData({ commit, state }) {
        if (!state.clientInitialized) {
            return console.error("Module not initialized (dispatch initialize first with config)");
        }
        if (state.signedIn === false) {
            return;
        }
        if (state.appDataFileId === null) {
            return;
        }
        
        await gapi.client.drive.files.delete({
            fileId: state.appDataFileId
        });
        commit('setAppDataFileId', null);
    },
    async loadUserData({ commit, state, dispatch, rootState }) {
        if (!state.clientInitialized) {
            return console.error("Module not initialized (dispatch initialize first with config)");
        }
        if (state.signedIn === false) {
            return;
        }
        if (state.appDataFileId === null) {
            let response = await gapi.client.drive.files.list({
                spaces: 'appDataFolder',
                'q': "mimeType = 'application/json' and name='preferences.imap' and trashed = false",
                'fields': "files(id, name)"
            });
            let id = null;
            response.result.files.forEach((file) => {
                if (file.name === "preferences.imap") {
                    id = file.id;
                }
            });
            commit('setAppDataFileId', id);
        }
        if (state.appDataFileId === null) {
            return;
        }
        let file = await gapi.client.drive.files.get({
            fileId: state.appDataFileId,
            alt: 'media'
        });
        if (typeof file !== 'object' || file === null || !('result' in file) || typeof file.result !== 'object' || file.result === null) {
            console.error("Unable to load file");
        }
        await dispatch('preferences/load', file.result, { root: true })
    },
    async loadFileListIntoState({ commit, state, dispatch }) {
        if (!state.clientInitialized) {
            return console.error("Module not initialized (dispatch initialize first with config)");
        }
        if (state.signedIn === false) {
            return;
        }
        // Update content
        let response = await gapi.client.drive.files.list({
            'pageSize': 1000,
            'q': "mimeType = 'application/vnd.google-apps.folder' and trashed = false",
            'fields': "nextPageToken, files(id, name)"
        });
        let id = null;

        response.result.files.forEach((folder) => {
            if (folder.name === SavedSessionFolderName) {
                id = folder.id;
            }
        });
        commit("setFolderId", id);
        if (id !== null) {
            let response = await gapi.client.drive.files.list({
                'pageSize': 1000,
                'q': "mimeType = 'application/json' and trashed = false and '" + id + "' in parents",
                'fields': "nextPageToken, files(id, name)",
            });
            for (let i = 0; i < response.result.files.length; i++) {
                response.result.files[i].name = response.result.files[i].name.substr(0, response.result.files[i].name.length - ".imap".length);
            }
            commit("setFileList", response.result.files);
        } else {
            commit("clearFileList");
        }
    },
    async createSessionFolder({ commit, state }) {
        if (!state.clientInitialized) {
            return console.error("Module not initialized (dispatch initialize first with config)");
        }
        if (state.signedIn === false) {
            return null;
        }
        let fileMetadata = {
            'name': SavedSessionFolderName,
            'mimeType': 'application/vnd.google-apps.folder'
        };
        let file = await gapi.client.drive.files.create({
            resource: fileMetadata,
            fields: 'id'
        });
        return file.id;
    },
    async delete({ commit, state, dispatch }, { fileId }) {
        if (!state.clientInitialized) {
            return console.error("Module not initialized (dispatch initialize first with config)");
        }
        if (state.signedIn === false) {
            return false;
        }
        if (state.loadedFileId === fileId) {
            commit('setLoadedFileId', null);
        }
        await gapi.client.drive.files.delete({
            fileId
        });
    },
    async load({ commit, state, dispatch }, { fileId }) {
        if (!state.clientInitialized) {
            return console.error("Module not initialized (dispatch initialize first with config)");
        }
        if (state.signedIn === false) {
            return;
        }
        let file = await gapi.client.drive.files.get({
            fileId,
            alt: 'media'
        });
        if (typeof file !== 'object' || file === null || !('result' in file) || typeof file.result !== 'object' || file.result === null) {
            console.error("Unable to load file");
        }
        commit('setLoadedFileId', fileId);
        replaceHash(fileId);
        await dispatch('session/load', file.result, { root: true })
    },
    async save({ commit, state, rootState, dispatch }, { fileId, sessionName }) {
        if (!state.clientInitialized) {
            return console.error("Module not initialized (dispatch initialize first with config)");
        }
        if (state.signedIn === false) {
            return [];
        }
        if (state.folderId === null) {
            await dispatch('createSessionFolder')
        }
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
        if (typeof fileId === 'undefined') {
            fileId = null;
        }
        if (fileId === null) { // Create
            if (typeof sessionName !== 'string' || sessionName.trim() === '') {
                return;
            }

            /**
             * There might be a better approach which is cleaner than this
             */

            var fileContent = JSON.stringify(data); // As a sample, upload a text file.
            var file = new Blob([fileContent], { type: "text/plain" });
            var metadata = {
                name: sessionName + ".imap", // Filename at Google Drive
                mimeType: "application/json", // mimeType at Google Drive
                parents: [state.folderId] // Folder ID at Google Drive
            };

            var accessToken = gapi.auth.getToken().access_token; // Here gapi is used for retrieving the access token.
            var form = new FormData();
            form.append(
                "metadata",
                new Blob([JSON.stringify(metadata)], { type: "application/json" })
            );
            form.append("file", file);

            fileId = await new Promise((resolve, reject) => {
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
            commit('setLoadedFileId', fileId);
            return;
        }

        commit('setLoadedFileId', fileId);
        replaceHash(fileId);
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