<template>
  <v-card>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col>
            <v-select
              v-model="theme"
              :items="themes"
              prepend-icon="mdi-palette"
              label="Themes"
              variant="outlined"
              @update:model-value="changeTheme"
            ></v-select>
          </v-col>
          <!-- <v-col>
            <v-text-field label="Refresh Timeout"></v-text-field>
          </v-col> -->
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>
<script>
import { useAppStore } from "@/store/app";

export default {
  data: () => ({
    theme: "light",
    themes: {},
  }),

  methods: {
    changeTheme() {
      // console.log(this.theme);
      const appStore = useAppStore();
      appStore.updateTheme(this.theme);
    },
  },

  created() {
    const appStore = useAppStore();
    this.theme = appStore.theme.default;
    this.themes = appStore.theme.items;
  },
};
</script>
<style></style>
