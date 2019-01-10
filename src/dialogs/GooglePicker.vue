<template></template>
<script>
import { Load } from "../utils/Google";
export default {
  props: ["gconfig"],
  methods: {
    async open(query) {
      if (typeof this.gconfig === "undefined") {
        throw new Error("GooglePicker component is missing google config");
      }
      await Load("picker");
      return await new Promise(resolve => {
        let view = new google.picker.DocsView();
        view.setQuery(query);
        let picker = new google.picker.PickerBuilder()
          .enableFeature(google.picker.Feature.NAV_HIDDEN)
          .setAppId(this.gconfig.appId)
          .addView(view)
          .setOAuthToken(gapi.auth.getToken().access_token)
          .setDeveloperKey(this.gconfig.apiKey)
          .setCallback(data => {
            if (data.action == google.picker.Action.CANCEL) {
              resolve(null);
            }
            if (data.action == google.picker.Action.PICKED) {
              resolve(data.docs[0].id);
            }
          })
          .build();
        picker.setVisible(true);
      });
    }
  }
};
</script>