<template>
  <v-card min-width="200px" elevation="5" theme="light">
    <v-img :src="image" cover></v-img>
    <v-card-item>
      <v-card-title>{{ title }}</v-card-title>

      <v-card-subtitle>
        <span class="me-1">{{ subtitle }}</span>
      </v-card-subtitle>
    </v-card-item>
    <v-divider></v-divider>
    <v-card-actions class="justify-center">
      <v-btn color="error" icon="mdi-close" text @click="emitDenyEvent"></v-btn>

      <v-btn
        color="success"
        icon="mdi-check"
        text
        @click="emitCofirmEvent"
      ></v-btn>

      <v-tooltip text="More Details" location="top">
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            color="info"
            icon="mdi-information-outline"
            text
            @click="expandShow = !expandShow"
          ></v-btn
        ></template>
      </v-tooltip>
    </v-card-actions>

    <v-divider thickness="2"></v-divider>

    <v-expand-transition>
      <div v-show="expandShow">
        <v-card-text v-if="text">
          {{ text }}
        </v-card-text>
      </div>
    </v-expand-transition>
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
      default: "",
    },
  },

  data: () => ({
    model: false,
    expandShow: false,
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
