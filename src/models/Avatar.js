import { Copy, IsEmpty } from "../utils/Entity";

export function GenerateAvataaarURL(avatar = null, props = null) {
    let segments = [];
    if (typeof props === 'undefined') {
        props = null;
    }
    PartNames.forEach((name) => {
        if (!IsEmpty(props) && !IsEmpty(props[name])) {
            segments.push(name + "=" + props[name]);
        } else if (!IsEmpty(avatar) && !IsEmpty(avatar[name])) {
            segments.push(name + "=" + avatar[name]);
        } else {
            //segments.push(name + "=" + Parts[name][0]);
            segments.push(name + "=" + "Blank");
        }
    });
    return "https://avataaars.io/?" + segments.join("&");
}

export class Avatar {
    constructor(source = null, inspire = false) {
        this.topType = "NoHair";
        this.avatarStyle = "Transparent";
        this.Copy(source, inspire);
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
        Copy(this, source, [
            "eyeType",
            "hairColor",
            "eyebrowType"
        ]);
        if (sibling) {
            return this;
        }
        Copy(this, source, PartNames);
        return this;
    }
}

export const Parts = {
    "avatarStyle": [
        "Circle",
        "Transparent"
    ],
    "topType": [
        "NoHair",
        "Eyepatch",
        "Hat",
        "Hijab",
        "Turban",
        "WinterHat1",
        "WinterHat2",
        "WinterHat3",
        "WinterHat4",
        "LongHairBigHair",
        "LongHairBob",
        "LongHairBun",
        "LongHairCurly",
        "LongHairCurvy",
        "LongHairDreads",
        "LongHairFrida",
        "LongHairFro",
        "LongHairFroBand",
        "LongHairNotTooLong",
        "LongHairShavedSides",
        "LongHairMiaWallace",
        "LongHairStraight",
        "LongHairStraight2",
        "LongHairStraightStrand",
        "ShortHairDreads01",
        "ShortHairDreads02",
        "ShortHairFrizzle",
        "ShortHairShaggyMullet",
        "ShortHairShortCurly",
        "ShortHairShortFlat",
        "ShortHairShortRound",
        "ShortHairShortWaved",
        "ShortHairSides",
        "ShortHairTheCaesar",
        "ShortHairTheCaesarSidePart"
    ],
    "accessoriesType": [
        "Blank",
        "Kurt",
        "Prescription01",
        "Prescription02",
        "Round",
        "Sunglasses",
        "Wayfarers"
    ],
    "clotheType": [
        "BlazerShirt",
        "BlazerSweater",
        "CollarSweater",
        "GraphicShirt",
        "Hoodie",
        "Overall",
        "ShirtCrewNeck",
        "ShirtScoopNeck",
        "ShirtVNeck"
    ],
    "graphicType": [
        "Bat",
        "Cumbia",
        "Deer",
        "Diamond",
        "Hola",
        "Pizza",
        "Resist",
        "Selena",
        "Bear",
        "SkullOutline",
        "Skull"
    ],
    "clotheColor": [
        "Black",
        "Blue01",
        "Blue02",
        "Blue03",
        "Gray01",
        "Gray02",
        "Heather",
        "PastelBlue",
        "PastelGreen",
        "PastelOrange",
        "PastelRed",
        "PastelYellow",
        "Pink",
        "Red",
        "White"
    ],
    "eyeType": [
        "Close",
        "Cry",
        "Default",
        "Dizzy",
        "EyeRoll",
        "Happy",
        "Hearts",
        "Side",
        "Squint",
        "Surprised",
        "Wink",
        "WinkWacky"
    ],
    "eyebrowType": [
        "Angry",
        "AngryNatural",
        "Default",
        "DefaultNatural",
        "FlatNatural",
        "RaisedExcited",
        "RaisedExcitedNatural",
        "SadConcerned",
        "SadConcernedNatural",
        "UnibrowNatural",
        "UpDown",
        "UpDownNatural"
    ],
    "facialHairColor": [
        "Auburn",
        "Black",
        "Blonde",
        "BlondeGolden",
        "Brown",
        "BrownDark",
        "Platinum",
        "Red"
    ],
    "facialHairType": [
        "Blank",
        "BeardMedium",
        "BeardLight",
        "BeardMagestic",
        "MoustacheFancy",
        "MoustacheMagnum"
    ],
    "hairColor": [
        "Auburn",
        "Black",
        "Blonde",
        "BlondeGolden",
        "Brown",
        "BrownDark",
        "PastelPink",
        "Platinum",
        "Red",
        "SilverGray"
    ],
    "hatColor": [
        "Black",
        "Blue01",
        "Blue02",
        "Blue03",
        "Gray01",
        "Gray02",
        "Heather",
        "PastelBlue",
        "PastelGreen",
        "PastelOrange",
        "PastelRed",
        "PastelYellow",
        "Pink",
        "Red",
        "White"
    ],
    "mouthType": [
        "Concerned",
        "Default",
        "Disbelief",
        "Eating",
        "Grimace",
        "Sad",
        "ScreamOpen",
        "Serious",
        "Smile",
        "Tongue",
        "Twinkle",
        "Vomit"
    ],
    "skinColor": [
        "Tanned",
        "Yellow",
        "Pale",
        "Light",
        "Brown",
        "DarkBrown",
        "Black"
    ]

};

export const PartNames = Object.keys(Parts);