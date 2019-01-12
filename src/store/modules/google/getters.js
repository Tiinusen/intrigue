export default {
    isAutoSyncEnabled: state => {
        return state.autoSyncIntervalRef !== null;
    },
    isFileLoaded: state => {
        return state.loadedFileId !== null;
    },
    isSignedIn: state => {
        return state.signedIn;
    },
    isInitialized: state => {
        return state.clientInitialized;
    },
    hasFiles: state => {
        return state.files.length > 0;
    },
};