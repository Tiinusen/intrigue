export default {
    isCursorMarkerVisible(){
        if(this.selectedHub !== null){
            return false;
        }
        if(this.keepCursorHidden){
            return false;
        }
        if(this.cursorPosition.lat === 0 && this.cursorPosition.lng === 0){
            return false;
        }
        if(this.mapHubClickResolve !== null || this.hubConfirmResolve !== null){
            return false;
        }
        return true;
    }
}; 