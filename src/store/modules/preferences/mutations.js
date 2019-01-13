export default {
    setTheme(state, theme) {
        state.theme = theme;
    },
    setAutoSync(state, autoSync) {
        state.autoSync = autoSync;
    },
    set(state, data){
        for(let key in data){
            if(key in state){
                state[key] = data[key];
            }
        }
    }
};