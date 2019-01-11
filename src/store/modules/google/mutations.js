export default {
    isSignedIn(state, isSignedIn) {
        state.isSignedIn = isSignedIn;
    },
    isClientInitialized(state, isClientInitialized) {
        state.isClientInitialized = isClientInitialized;
    },
    setFolderId(state, folderId) {
        state.folderId = folderId;
    },
    clearFileList(state) {
        state.files.splice(0, state.files.length);
    },
    setFileList(state, files) {
        state.files.splice(0, state.files.length);
        files.forEach((file) => {
            state.files.push(file);
        });
    }
};