<template>
  <v-dialog
    :model-value="model"
    scrollable
    max-width="500px"
    transition="dialog-transition"
  >
    <v-card>
      <v-toolbar color="primary">
        <template #title> Add New Product</template>
        <template #append>
          <v-btn icon="mdi-close" @click="$emit('update:model', false)">
          </v-btn>
        </template>
      </v-toolbar>
      <v-divider></v-divider>

      <v-card-text>
        <v-form ref="form" v-model="form.model" @submit.prevent="emitSaveBtn">
          <v-container class="py-1">
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
                  type="number"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col>
                <v-text-field
                  v-model="localItem.stock_quantity"
                  :rules="[rules.required, rules.number]"
                  label="Stock Quantity"
                  type="number"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row dense>
              <v-col>
                <v-text-field
                  v-model="localItem.stock_threshold"
                  :rules="[rules.required, rules.number]"
                  label="Stock Threshold"
                  type="number"
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
                <v-img :src="imagePreview ? imagePreview : localItem.image">
                </v-img>
                <br />

                <v-file-input
                  v-model="image"
                  label="Image"
                  counter
                  show-size
                  accept=".png, .jpeg, .jpg"
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
          @click="confirmation.save.model = !confirmation.save.model"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <div>
    <v-dialog
      v-model="confirmation.save.model"
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
            @click="confirmation.save.model = !confirmation.save.model"
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
</template>
<script>
export default {
  emits: ["onSave", "update:model"],
  props: {
    model: {
      type: Boolean,
      default: false,
    },
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
        price: "",
        stock_quantity: 0,
        stock_threshold: 0,
        category_id: "",
      }),
    },
  },

  data: () => ({
    // model: false,

    confirmation: {
      save: {
        model: false,
      },
      delete: {
        model: false,
      },
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

        // Check if the file size is less than 2MB
        if (value[0].size > 2000000) {
          return "File size must be at most 2MB!";
        }

        // If all checks pass, return true (valid)
        return true;
      },
    },

    localItem: {},

    image: null,
    imagePreview: null,
  }),

  computed: {
    /**
     * Checks if the item prop is empty.
     * @returns {boolean} True if item prop is empty, otherwise false.
     */
    isEmptyItem() {
      return Object.keys(this.item).length === 0;
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

    emitSaveBtn() {
      // Create a new object to hold the changes
      const newId = Date.now().toString();
      const newItem = {
        product_id: newId,
        product_name: this.localItem.product_name,
        image: this.localItem.image,
        description: this.localItem.description,
        price: this.localItem.price,
        stock_quantity: this.localItem.stock_quantity,
        stock_threshold: this.localItem.stock_threshold,
        category_id: this.localItem.category_id,
      };

      // console.log(newItem);

      //   // Emit the new item
      this.$emit("onSave", newItem);
      this.$emit("update:model", false);
      this.confirmation.save.model = false;
      this.emptyFields();
    },

    emptyFields() {
      this.localItem = {
        product_id: "",
        product_name: "",
        image: null,
        description: "",
        price: "",
        stock_quantity: "",
        stock_threshold: "",
        category_id: "",
      };

      this.image = null;
      this.imagePreview = null;
    },
  },
};
</script>
