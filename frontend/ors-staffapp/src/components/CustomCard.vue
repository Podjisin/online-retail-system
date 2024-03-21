<template>
  <v-card>
    <v-img height="250" :src="image" cover></v-img>
    <v-card-item>
      <v-card-title>{{ title }}</v-card-title>

      <v-card-subtitle>
        <span class="me-1">{{ subtitle }}</span>
      </v-card-subtitle>
    </v-card-item>
    <v-divider thickness="2"></v-divider>

    <v-card-text>
      {{ text }}
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="error" icon="mdi-check" text @click="emitDenyEvent"></v-btn>
      <v-btn
        color="primary"
        icon="mdi-close"
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
    emitCofirmEvent() {
      this.$emit("onConfirm");
      console.log("emitCofirmEvent");
    },

    emitDenyEvent() {
      this.$emit("onDeny");
      console.log("emitDenyEvent");
    },
  },
};
</script>
