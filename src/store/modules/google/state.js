export default {
    signedIn: false,
    clientInitialized: false,
    folderId: null,
    loadedFileId: null,
    appDataFileId: null,
    autoSyncIntervalRef: null,
    autoSyncInterval: 1,
    autoSyncTimeoutRef: null,
    autoSyncTimeout: 60 * 60, // 1 h Idle Time Allowed before auto sync gets automaticly disabled
    files: [],
    sessionLastModified: null,
    appDataLastModified: null,
    loading: false
};