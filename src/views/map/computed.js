export default {
    isCursorVisible() {
        return (
            this.showCursor &&
            this.cursorPosition.lat !== null &&
            this.cursorPosition.lng !== null
        );
    }
};