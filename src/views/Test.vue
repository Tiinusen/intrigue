<template>
  <div style=width:400px;height:400px;>
      <AvatarDesigner ref="AvatarDesigner"/>
  </div>
</template>

<script>
import AvatarComp from '../components/Avatar'
import AvatarDesigner from '../dialogs/AvatarDesigner'
export default {
  components: {
      Avatar: AvatarComp,
      AvatarDesigner,
  },
  methods:{
      testa(){
          this.$store.dispatch("session/load", this.$store.state.session.txt);
      }
  },
  data(){
      return {
          
      };
  },
  mounted(){
      this.$root.AvatarDesigner = this.$refs.AvatarDesigner
  }
};
</script>
