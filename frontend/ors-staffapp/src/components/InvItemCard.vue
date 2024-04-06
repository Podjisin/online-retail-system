<template>
  <div>
    <v-card min-width="200px" elevation="5" class="bg-surface-bright">
      <v-img
        :src="item.image"
        max-height="200px"
        max-width="400px"
        cover
      ></v-img>
      <v-card-item>
        <v-card-title>{{ item.product_name }}</v-card-title>
        <v-card-subtitle> {{ item.product_id }} </v-card-subtitle>
      </v-card-item>
      <v-card-text>
        {{ currency }} {{ item.price }} | {{ item.stock_quantity }} in stock
        <br />
        <v-chip
          prepend-icon="mdi-alert"
          v-if="item.stock_quantity < item.stock_threshold"
          color="error"
        >
          Threshold Reached!</v-chip
        >
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="justify-center pa-1">
        <v-tooltip text="More Details" location="top">
          <template #activator="{ props }">
            <v-btn
              v-bind="props"
              color="info"
              icon="mdi-information-outline"
              text
              @click="dialog.model = !dialog.model"
            ></v-btn>
          </template>
        </v-tooltip>
      </v-card-actions>
    </v-card>
  </div>

  <div>
    <v-dialog
      v-model="dialog.model"
      scrollable
      persistent
      max-width="500px"
      transition="dialog-transition"
      @submit.prevent="emitSaveBtn"
    >
      <v-card>
        <v-toolbar color="primary">
          <template #title> Product Details</template>
          <template #append>
            <v-btn icon="mdi-close" @click="dialog.model = !dialog.model">
            </v-btn>
          </template>
        </v-toolbar>
        <v-divider></v-divider>

        <v-card-text>
          <v-form v-model="form.model">
            <v-container class="py-1">
              <v-row v-if="item.updated">
                <v-col>
                  <p>last updated: {{ item.updated }}</p>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col>
                  <v-text-field
                    v-model="localItem.product_id"
                    label="Product Id"
                    readonly
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col>
                  <v-text-field
                    v-model="localItem.product_name"
                    :rules="[rules.required]"
                    label="Product Name"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row dense>
                <v-col>
                  <v-textarea
                    v-model="localItem.description"
                    label="Product Description"
                  ></v-textarea>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col>
                  <v-text-field
                    v-model="localItem.price"
                    :rules="[rules.required, rules.number]"
                    label="Product Price"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col>
                  <v-text-field
                    v-model="localItem.stock_quantity"
                    :rules="[rules.required, rules.number]"
                    label="Stock Quantity"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col>
                  <v-text-field
                    v-model="localItem.stock_threshold"
                    :rules="[rules.required, rules.number]"
                    label="Stock Threshold"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row dense>
                <v-col>
                  <v-text-field
                    v-model="localItem.category_id"
                    :rules="[rules.required]"
                    label="Catergory Id"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col>
                  <v-card>
                    <v-img :src="imagePreview ? imagePreview : localItem.image">
                    </v-img>
                  </v-card>
                  <br />

                  <v-file-input
                    v-model="image"
                    label="Image"
                    counter
                    show-size
                    :rules="[rules.image]"
                    @change="onFileChange"
                  ></v-file-input>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="justify-center">
          <v-btn
            :disabled="!form.model"
            prepend-icon="mdi-content-save"
            color="success"
            @click="confirmation.model = !confirmation.model"
          >
            Save
          </v-btn>
        </v-card-actions>
        <template #subtitle></template>
      </v-card>
    </v-dialog>
  </div>
  <div>
    <v-dialog
      v-model="confirmation.model"
      max-width="200px"
      persistent
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title> Confirmation </v-card-title>
        <v-card-subtitle>Proceed?</v-card-subtitle>
        <v-divider></v-divider>
        <v-card-actions class="justify-center">
          <v-btn
            color="error"
            icon="mdi-close"
            text
            @click="confirmation.model = !confirmation.model"
          ></v-btn>
          <v-btn
            color="success"
            icon="mdi-check"
            text
            @click="emitSaveBtn()"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
  <div>
    <SnackBar :model="snackbar.model" :color="snackbar.color"> </SnackBar>
  </div>
</template>
<script>
// import Vibrant from "node-vibrant";

import SnackBar from "./SnackBar.vue";
export default {
  emits: ["onUpdate"],
  props: {
    currency: {
      type: String,
      default: "Php",
    },
    item: {
      type: Object,
      default: () => ({
        product_id: "",
        product_name: "",
        image: null,
        description: "",
        price: 0,
        stock_quantity: 0,
        stock_threshold: 0,
        category_id: "",
        created: null,
        updated: null,
      }),
    },
  },

  data: () => ({
    model: false,
    dialog: {
      model: false,
    },

    confirmation: {
      model: false,
    },

    form: {
      model: false,
    },

    rules: {
      required: (value) => !!value || "Field is required!",
      number: (value) => {
        return !isNaN(value) || "Field must be a number!";
      },
      image: (value) => {
        if (!value) {
          // If no file is selected, return true (valid)
          return true;
        }

        // Check if the file has a valid type property
        if (!value[0] || typeof value[0].type !== "string") {
          return "File type is invalid!";
        }

        // Check if the file type is image/png or image/jpeg
        if (
          !(value[0].type === "image/png" || value[0].type === "image/jpeg")
        ) {
          return "File must be an image (PNG or JPEG)!";
        }

        // Check if the file size is less than 4MB
        if (value[0].size > 4000000) {
          return "File size must be at most 4MB!";
        }

        // If all checks pass, return true (valid)
        return true;
      },
    },

    localItem: {},

    cardColor: "",

    image: null,
    imagePreview: null,

    snackbar: {
      model: false,
      title: "",
      color: "error",
    },
  }),

  components: {
    SnackBar,
  },

  watch: {
    localItem: {
      handler() {
        console.log("localItem changed");
      },
      deep: true,
    },
  },

  methods: {
    /**
     * Handles uploading an image file and updating the localItem.image with the preview data URL.
     * - Reads the uploaded file into a data URL
     * - Sets imagePreview to the data URL for display
     * - Updates localItem.image with the data URL
     */
    async onFileChange(e) {
      const file = e.target.files[0];
      if (!file) return;

      const readData = (f) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(f);
        });

      const dataURL = await readData(file);
      console.log(dataURL);
      this.imagePreview = dataURL;
      this.localItem.image = dataURL;
    },

    /**
     * Emits the 'onUpdate' event when called.
     */
    emitSaveBtn() {
      // Create a new object to hold the changes
      const newItem = {
        product_id: this.localItem.product_id,
        product_name: this.localItem.product_name,
        image: this.localItem.image,
        description: this.localItem.description,
        price: this.localItem.price,
        stock_quantity: this.localItem.stock_quantity,
        stock_threshold: this.localItem.stock_threshold,
        category_id: this.localItem.category_id,
      };

      // console.log(newItem);

      // Emit the new item
      this.$emit("onUpdate", newItem);
      this.dialog.model = false;
      this.confirmation.model = false;
      this.confirmation.snackbar = true;
    },
  },

  created() {
    // Make a shallow copy of the item props and assign it to localItem so we don't modify the original item.
    this.localItem = Object.assign({}, this.item);
  },
};
</script>
