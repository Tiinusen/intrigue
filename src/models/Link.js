import { ArrayToObject } from "../utils/Convert";
import { Copy, IsEmpty } from "../utils/Entity";
import { GenerateUUID } from "../utils/UUID";
import linkArrays from './links';

export class LinkType {
    constructor(name, AtoB, BtoA, valid, color, linkThickness) {
        this.name = name;
        this.AtoB = AtoB;
        this.BtoA = BtoA;
        this.valid = valid;
        this.color = color;
        this.linkThickness = linkThickness;
    }
    /**
     * 
     * @param {Hub} hub 
     * @param {boolean} reversed HubB shall equal this to true to avoid same hub type getting same text issues
     */
    HubText(hub, reversed = false) {
        for (var i = 0; i < this.valid.length; i++) {
            let pair = this.valid[i];
            if (!reversed) {
                if (hub.ofType(pair[0])) {
                    return this.AtoB;
                } else if (hub.ofType(pair[1])) {
                    return this.BtoA;
                }
            } else {
                if (hub.ofType(pair[1])) {
                    return this.BtoA;
                } else if (hub.ofType(pair[0])) {
                    return this.AtoB;
                }
            }
        }
        return "";
    }
}
export var LinkTypes = ConvertLinksArraysToLinkTypes(linkArrays);


// Valid link types are stored in links.json
// Adding support for custom link types will be possbile in the future with this structure
// [
//     "Input",         // Name of Link
//     "",              // Hub A relation to Hub B, example "killed"
//     "",              // Hub B relation to Hub A, example "was killed by"
//     [                // Valid hub combinations, supports multiple pairs
//         ["", ""],    // Pair of Hub Types, example ["Character","Character"]
//     ],
//     "#000000",       // Color of link when displayed on map
//     1                // Line Thickness, Small(1), Medium(2), Large(3)
// ]

function ConvertLinksArraysToLinkTypes(jsonArray) {
    let linkTypes = {};
    jsonArray.forEach((linkTypeArr) => {
        if (linkTypeArr.length == 0) {
            throw new Error("Empty LinkType JSON content");
        }
        linkTypes[linkTypeArr[0]] = new LinkType(
            linkTypeArr[0],
            linkTypeArr[1],
            linkTypeArr[2],
            linkTypeArr[3],
            linkTypeArr[4],
            linkTypeArr[5]
        );
    });
    return linkTypes;
}

export class Link {
    constructor(source = null, inspire = false) {
        this.id = GenerateUUID();
        this.hubA = null;
        this.hubB = null;
        this.AtoB = "";
        this.BtoA = "";
        this.linkType = "Input";
        this.color = "black";
        this.linkThickness = 1;
        this.Copy(source, inspire);
    }

    get validLinkTypeNames() {
        if (this.hubA === null || this.hubB === null) {
            return [];
        }
        let linkTypes = [];
        for (let linkName in LinkTypes) {
            let linkType = LinkTypes[linkName];
            let valid = false;
            for (var i = 0; i < linkType.valid.length; i++) {
                let pair = linkType.valid[i];
                if ((this.hubA.ofType(pair[0]) && this.hubB.ofType(pair[1])) || (this.hubB.ofType(pair[0]) && this.hubA.ofType(pair[1]))) {
                    valid = true;
                    break;
                }
            }
            if (valid) {
                linkTypes.push(linkType.name);
            }
        }
        return linkTypes;
    }

    get key() {
        return "Link#" + this.id;
    }

    get name() {
        return this.id;
    }

    get type() {
        return "session/link";
    }

    get subType() {
        let parts = this.linkType.split(".");
        return parts[parts.length - 1];
    }

    ofType(path) {
        return path === this.linkType;
    }

    /**
     * 
     * @param {Avatar} source 
     * @param {boolean} sibling // Inspire instead of just copy
     */
    Copy(source, sibling = false) {
        if (typeof source === 'undefined' || source === null) {
            return this;
        }
        Copy(this, source, [
            "linkType",
            "hubA",
            "hubB",
            "AtoB",
            "BtoA"
        ]);
        if (sibling) {
            return this;
        }
        Copy(this, source, [
            "id"
        ]);
        return this;
    }

    ApplyLinkType(linkType) {
        this.linkType = linkType;
        this.AtoB = linkType.HubText(this.hubA);
        this.BtoA = linkType.HubText(this.hubB, true);
        this.color = linkType.color;
        this.linkThickness = linkType.linkThickness;
    }
}