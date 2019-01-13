export default {
    isDarkThemeEnabled: state => {
        return state.theme === 'dark';
    },
    isDefaultAutoSyncEnabled: state => {
        return state.autoSync;
    },
};