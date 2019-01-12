export default {
    setSignedIn(state, signedIn) {
        state.signedIn = signedIn;
    },
    setClientInitialized(state, clientInitialized) {
        state.clientInitialized = clientInitialized;
    },
    setFolderId(state, folderId) {
        state.folderId = folderId;
    },
    setAppDataFileId(state, appDataFileId) {
        state.appDataFileId = appDataFileId;
    },
    setLoadedFileId(state, fileId) {
        state.loadedFileId = fileId;
    },
    clearFileList(state) {
        state.files.splice(0, state.files.length);
    },
    setFileList(state, files) {
        state.files.splice(0, state.files.length);
        files.forEach((file) => {
            state.files.push(file);
        });
    },
    setAutoSync(state, val) {
        state.autoSyncIntervalRef = val;
    }
};