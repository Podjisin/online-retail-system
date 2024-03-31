<template>
  <v-dialog
    v-model="confirmation.model"
    max-width="500px"
    persistent
    transition="dialog-transition"
  >
    <v-card>
      <v-card-title> Confirmation </v-card-title>
      <v-card-actions>
        <v-btn
          color="error"
          icon="mdi-close"
          text
          @click="confirmation.model = !confirmation.model"
        ></v-btn>
        <v-btn color="error" icon="mdi-check" text></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    model: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    subtitle: {
      type: String,
      default: "",
    },
  },

  methods: {
    /**
     * Emits the 'onConfirm' event when called.
     */
    emitCofirmEvent() {
      this.$emit("onConfirm");
      console.log("emitCofirmEvent");
    },

    /**
     * Emits the 'onDeny' event when called.
     */
    emitDenyEvent() {
      this.$emit("onDeny");
      console.log("emitDenyEvent");
    },
  },
};
</script>
