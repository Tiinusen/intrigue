import { Copy, IsEmpty } from "../utils/Entity"
import { GenerateUUID } from "../utils/UUID"
import { Hub } from './Hub'

export const LinkTypes = {
    
};

export class Link {
    constructor(source = null, inspire = false) {
        this.id = GenerateUUID();
        this.Copy(source);
    }

    get key() {
        return "Link#" + this.id;
    }

    get name() {
        return this.id;
    }

    get type() {
        return "session/hub";
    }

    get url() {
        return GenerateURL(this);
    }
    /**
     * 
     * @param {Avatar} source 
     * @param {boolean} sibling // Inspire instead of just copy
     */
    Copy(source, sibling = false) {
        
        return this;
    }
}