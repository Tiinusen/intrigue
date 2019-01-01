var __counter = 1;

export class Avatar {
    constructor(source = null, inspire = false) {
        this.id = __counter++;
        this.avatarStyle = "Circle";
        this.skin = "Blank";
        this.topType = "NoHair";
        this.accessories = "Blank";
        this.facial = "Blank";
        this.facialColor = "Black";
        this.hair = "Blank";
        this.clothes = "Blank";
        this.clothesColor = "Black";
        this.eye = "Blank";
        this.eyebrow = "Blank";
        this.mouth = "Blank";
        if (source !== null) {
            this.CopyFrom(source, inspire)
        }
    }

    Serialize() {
        return {
            id: this.id,
            avatarStyle: this.avatarStyle,
            skin: this.skin,
            topType: this.topType,
            accessories: this.accessories,
            facial: this.facial,
            facialColor: this.facialColor,
            hair: this.hair,
            clothes: this.clothes,
            clothesColor: this.clothesColor,
            eye: this.eye,
            eyebrow: this.eyebrow,
            mouth: this.mouth
        };
    }

    get url() {
        return this.GetURL();
    }

    GetURL() {
        return (
            "https://avataaars.io/?" +
            "avatarStyle=" +
            this.avatarStyle +
            "&topType=" +
            this.topType +
            "&accessoriesType=" +
            this.accessories +
            "&hairColor=" +
            this.hair +
            "&facialHairType=" +
            this.facial +
            "&facialHairColor=" +
            this.facialColor +
            "&clotheType=" +
            this.clothes +
            "&clotheColor=" +
            this.clothesColor +
            "&eyeType=" +
            this.eye +
            "&eyebrowType=" +
            this.eyebrow +
            "&mouthType=" +
            this.mouth +
            "&skinColor=" +
            this.skin
        );
    }

    CopyFrom(source, inspire) {
        this.avatarStyle = source.avatarStyle;
        this.skin = source.skin;
        this.topType = source.topType;
        this.clothes = source.clothes;
        this.clothesColor = source.clothesColor;
        if (inspire) {
            return;
        }
        this.accessories = source.accessories;
        this.facial = source.facial;
        this.facialColor = source.facialColor;
        this.hair = source.hair;
        this.eye = source.eye;
        this.eyebrow = source.eyebrow;
        this.mouth = source.mouth;
    }
}