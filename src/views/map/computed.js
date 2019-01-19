export default {
    isCursorMarkerVisible() {
        if (this.selectedHub !== null) {
            return false;
        }
        if (this.keepCursorHidden) {
            return false;
        }
        if (this.cursorPosition.lat === 0 && this.cursorPosition.lng === 0) {
            return false;
        }
        if (this.mapHubClickResolve !== null || this.hubConfirmResolve !== null) {
            return false;
        }
        return true;
    },
    maplinks() {
        let mlinks = [];
        if (this.activeScene === null) {
            return [];
        }
        if (this.selectedHub === null) {
            let alreadyVisitedHubs = [];
            for (let hubP of this.activeScene.hubs) {
                for (let link of hubP.hub.links) {
                    if (alreadyVisitedHubs.indexOf(link.hubA) !== -1 || alreadyVisitedHubs.indexOf(link.hubB) !== -1) {
                        continue;
                    }
                    if (link.hubA === hubP.hub) {
                        let p1 = hubP.latlng;
                        let p2 = null;
                        for (let hubPi of this.activeScene.hubs) {
                            if(hubPi.hub === link.hubB){
                                p2 = hubPi.latlng;
                                break;
                            }
                        }
                        if(p2 === null){
                            continue;
                        }
                        mlinks.push({
                            link,
                            p1,
                            p2,
                            text: ""
                        });
                    } else {
                        let p1 = hubP.latlng;
                        let p2 = null;
                        for (let hubPi of this.activeScene.hubs) {
                            if(hubPi.hub === link.hubA){
                                p2 = hubPi.latlng;
                                break;
                            }
                        }
                        if(p2 === null){
                            continue;
                        }
                        mlinks.push({
                            link,
                            p1,
                            p2,
                            text: ""
                        });
                    }
                }
                alreadyVisitedHubs.push(hubP.hub);
            }
        } else {

        }
        return mlinks;
    }
}; 