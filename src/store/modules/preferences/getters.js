export default {
    isDarkThemeEnabled: state => {
        return state.theme === 'dark';
    },
    isDefaultAutoSyncEnabled: state => {
        return state.autoSync;
    },
    isShowAllLinkLabelsEnabled: state => {
        return state.showAllLinkLabels;
    },
    isKultStyleEnabled: state => {
        return state.kultStyle;
    }
};