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
    isLoading: state => {
        return state.loading;
    },
    hasFiles: state => {
        return state.files.length > 0;
    },
    hasAppData: state => {
        return state.appDataFileId !== null;
    },
};