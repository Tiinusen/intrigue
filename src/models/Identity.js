export class Identity {
    constructor(source = null, inspire = false) {
        this.firstName = "";
        this.lastName = "";
        this.name = "";
        if (source !== null) {
            this.CopyFrom(source, inspire)
        }
    }

    get fullName() {
        if (this.name !== "") {
            return this.name;
        }
        return this.firstName + " " + this.lastName;
    }

    Serialize() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            name: this.name
        };
    }

    CopyFrom(source, inspire) {
        this.lastName = source.lastName;
        if (inspire) {
            return;
        }
        this.firstName = source.firstName;
        this.name = source.name;
    }

    Clone(inspire) {
        return new Identity(this, inspire);
    }
}