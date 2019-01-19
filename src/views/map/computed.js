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
        /**
         * This property will when no hub is selected display all links but without texts
         * when a hub is selected however then this property will return all links relevant from that hub
         */
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
                            if (hubPi.hub === link.hubB) {
                                p2 = hubPi.latlng;
                                break;
                            }
                        }
                        if (p2 === null) {
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
                            if (hubPi.hub === link.hubA) {
                                p2 = hubPi.latlng;
                                break;
                            }
                        }
                        if (p2 === null) {
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
            let activeSceneHubs = [];
            let keyToHubs = {};
            let visitedLinks = [];
            for (let hubP of this.activeScene.hubs) {
                activeSceneHubs.push(hubP.hub);
                keyToHubs[hubP.hub.key] = hubP;
            }
            if (activeSceneHubs.indexOf(this.selectedHub) === -1) {
                return [];
            }

            let traverseRelatedHubs = (hub) => {
                if (activeSceneHubs.indexOf(hub) === -1) {
                    return;
                }
                let hubsToTraverse = [];
                for (let link of hub.links) {
                    if (visitedLinks.indexOf(link) !== -1) {
                        continue;
                    }
                    visitedLinks.push(link);
                    if (!(link.hubA.key in keyToHubs) || !(link.hubB.key in keyToHubs)) {
                        continue;
                    }
                    if (hub === link.hubA) {
                        let p1 = keyToHubs[link.hubA.key].latlng;
                        let p2 = keyToHubs[link.hubB.key].latlng;
                        let text = link.AtoB;
                        mlinks.push({
                            link,
                            p1,
                            p2,
                            text
                        });
                        hubsToTraverse.push(link.hubB);
                    } else {
                        let p1 = keyToHubs[link.hubB.key].latlng;
                        let p2 = keyToHubs[link.hubA.key].latlng;
                        let text = link.BtoA;
                        mlinks.push({
                            link,
                            p1,
                            p2,
                            text
                        });
                        hubsToTraverse.push(link.hubA);
                    }
                }
                for (let hub of hubsToTraverse){
                    traverseRelatedHubs(hub);
                }
            };
            traverseRelatedHubs(this.selectedHub);
        }
        return mlinks;
    }
}; 