<template>
  <div>
    <Avatar
      @click.native="onClickOpenEditor"
      v-bind:avatar="avatar"
      style="width:60%;"
      avatarStyle="Transparent"
    ></Avatar>
    <v-dialog
      v-model="openDialog"
      dark
      persistent
      max-width="400px"
      min-height="400px"
      style="position:relative;z-index:1000;"
    >
      <v-card>
        <v-container>
          <v-layout text-xs-center row wrap>
            <v-flex xs3>
              <AvatarAttributeSelector
                v-bind:avatar="avatar"
                v-bind:options="eye"
                name="eye"
                default="Dizzy"
                title="Eyes"
              ></AvatarAttributeSelector>
              <AvatarAttributeSelector
                v-bind:avatar="avatar"
                v-bind:options="eyebrow"
                name="eyebrow"
                default="UpDownNatural"
                title="Eyebrow"
              ></AvatarAttributeSelector>
              <AvatarAttributeSelector
                v-bind:avatar="avatar"
                v-bind:options="topType"
                name="topType"
                default="LongHairFro"
                title="Hair / Top"
              ></AvatarAttributeSelector>
              <AvatarAttributeSelector
                v-if="hasHair"
                v-bind:avatar="avatar"
                v-bind:options="accessories"
                topType="LongHairFro"
                name="accessories"
                default="Kurt"
                title="Accessories"
              ></AvatarAttributeSelector>
              <AvatarAttributeSelector
                v-if="hasHair && avatar.topType !== 'NoHair'"
                v-bind:avatar="avatar"
                v-bind:options="hair"
                topType="LongHairFro"
                name="hair"
                default="Red"
                title="Hair Color"
              ></AvatarAttributeSelector>
            </v-flex>
            <v-flex xs6>
              <Avatar v-bind:avatarStyle="'Transparent'" v-bind:avatar="avatar" @click.native="openDialog = false"></Avatar>
              <v-layout>
                <v-flex xs6>
                  <AvatarAttributeSelector
                    v-bind:avatar="avatar"
                    v-bind:options="mouth"
                    name="mouth"
                    default="Smile"
                    title="Mouth"
                  ></AvatarAttributeSelector>
                </v-flex>
                <v-flex xs6>
                  <AvatarAttributeSelector
                    v-bind:avatar="avatar"
                    v-bind:options="skin"
                    name="skin"
                    default="Black"
                    title="Skin"
                  ></AvatarAttributeSelector>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs3>
              <AvatarAttributeSelector
                v-bind:avatar="avatar"
                v-bind:options="clothes"
                name="clothes"
                default="BlazerShirt"
                title="Clothes"
              ></AvatarAttributeSelector>
              <AvatarAttributeSelector
                v-if="['BlazerSweater','BlazerShirt','Blank'].indexOf(avatar.clothes) === -1"
                v-bind:avatar="avatar"
                v-bind:options="clothesColor"
                clothes="Overall"
                name="clothesColor"
                default="Black"
                title="Clothes Color"
              ></AvatarAttributeSelector>
              <AvatarAttributeSelector
                v-bind:avatar="avatar"
                v-bind:options="facial"
                name="facial"
                default="BeardMedium"
                title="Facial Hair"
              ></AvatarAttributeSelector>
              <AvatarAttributeSelector
                v-if="avatar.facial !== 'Blank'"
                v-bind:avatar="avatar"
                v-bind:options="facialColor"
                facial="BeardMedium"
                name="facialColor"
                default="Red"
                title="Facial Hair Color"
              ></AvatarAttributeSelector>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Avatar from "./Avatar";
import AvatarAttributeSelector from "./AvatarAttributeSelector";
export default {
  props: ["avatar"],
  components: {
    Avatar,
    AvatarAttributeSelector
  },
  methods: {
    onClickOpenEditor() {
      this.openDialog = true;
    }
  },
  computed: {
    hasHair() {
      if (
        [
          "Eyepatch",
          "Hat",
          "Hijab",
          "Turban",
          "WinterHat1",
          "WinterHat2",
          "WinterHat3",
          "WinterHat4"
        ].indexOf(this.avatar.topType) !== -1
      ) {
        return false;
      }
      return true;
    }
  },
  data() {
    return {
      openDialog: false,
      topType: [
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
      accessories: [
        "Blank",
        "Kurt",
        "Prescription01",
        "Prescription02",
        "Round",
        "Sunglasses",
        "Wayfarers"
      ],
      hair: [
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
      facial: [
        "Blank",
        "BeardMedium",
        "BeardLight",
        "BeardMagestic",
        "MoustacheFancy",
        "MoustacheMagnum"
      ],
      facialColor: [
        "Auburn",
        "Black",
        "Blonde",
        "BlondeGolden",
        "Brown",
        "BrownDark",
        "Platinum",
        "Red"
      ],
      clothes: [
        "Blank",
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
      clothesColor: [
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
      eye: [
        "Blank",
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
      eyebrow: [
        "Blank",
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
      mouth: [
        "Blank",
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
      skin: [
        "Blank",
        "Tanned",
        "Yellow",
        "Pale",
        "Light",
        "Brown",
        "DarkBrown",
        "Black"
      ]
    };
  }
};
</script>
