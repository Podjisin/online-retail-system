<template>
  <v-card elevation="5" theme="light">
    <v-img :src="image" cover></v-img>
    <v-card-item>
      <v-card-title>{{ title }}</v-card-title>

      <v-card-subtitle>
        <span class="me-1">{{ subtitle }}</span>
      </v-card-subtitle>
    </v-card-item>
    <v-divider thickness="2"></v-divider>

    <v-card-text v-if="text">
      {{ text }}
    </v-card-text>

    <v-card-actions>
      <v-divider color="primary" thickness="2"></v-divider>
      <v-btn color="error" icon="mdi-close" text @click="emitDenyEvent"></v-btn>
      <v-divider
        color="primary"
        vertical
        thickness="2"
        class="px-1"
      ></v-divider>
      <v-btn
        color="success"
        icon="mdi-check"
        text
        @click="emitCofirmEvent"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    subtitle: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
    },
  },

  data: () => ({
    model: false,
  }),

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

    /**
     * Get image size and change it so it fits smaller screen
     */
  },
};
</script>
