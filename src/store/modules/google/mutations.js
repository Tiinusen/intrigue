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
    setSessionLastModified(state, sessionLastModified) {
        if (typeof sessionLastModified === 'string') {
            sessionLastModified = new Date(sessionLastModified);
        }
        state.sessionLastModified = sessionLastModified;
    },
    setAppDataLastModified(state, appDataLastModified) {
        if (typeof appDataLastModified === 'string') {
            appDataLastModified = new Date(appDataLastModified);
        }
        state.appDataLastModified = appDataLastModified;
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
    },
    setLoading(state, val) {
        state.loading = val;
    }
};