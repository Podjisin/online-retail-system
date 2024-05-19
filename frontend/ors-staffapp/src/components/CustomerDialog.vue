<template>
  <v-dialog
    :model-value="model"
    scrollable
    max-width="500px"
    transition="dialog-transition"
  >
    <v-card>
      <v-toolbar color="primary">
        <template #title>
          <span> {{ mode == "create" ? "Create" : "Update" }}</span>
          Customer</template
        >
        <template #append>
          <v-btn icon="mdi-close" @click="$emit('update:model', false)">
          </v-btn>
        </template>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text>
        <v-form red="form" v-model="form.model" @submit.prevent="emitSavebtn">
          <v-container>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="localItem.first_name"
                  :rules="[rules.required]"
                  label="First Name"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="localItem.last_name"
                  :rules="[rules.required]"
                  label="Last Name"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="localItem.email"
                  :rules="[rules.required, rules.email]"
                  label="email"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  v-model="localItem.phone_number"
                  :rules="[rules.required, rules.number]"
                  label="Phone Number"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="localItem.address"
                  :rules="[rules.required]"
                  label="Address"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="localItem.username"
                  :rules="[rules.required]"
                  label="Username"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="localItem.password"
                  :type="form.showPassword ? 'text' : 'password'"
                  :rules="[rules.password]"
                  label="Password"
                  :append-inner-icon="
                    form.showPassword ? 'mdi-eye-off' : 'mdi-eye'
                  "
                  @click:append-inner="form.showPassword = !form.showPassword"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="form.confirmPassword"
                  :disabled="!localItem.password"
                  :type="form.showPassword ? 'text' : 'password'"
                  :rules="[
                    rules.confirmPassword(
                      localItem.password,
                      form.confirmPassword
                    ),
                  ]"
                  label="Confirm Password"
                  :append-inner-icon="
                    form.showPassword ? 'mdi-eye-off' : 'mdi-eye'
                  "
                  @click:append-inner="form.showPassword = !form.showPassword"
                ></v-text-field>
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
            @click="emitSavebtn()"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
  <!-- <div>
    <SnackBar :model="snackbar.model" :color="snackbar.color"> </SnackBar>
  </div> -->
</template>
<script>
// import SnackBar from "./SnackBar.vue";
import { rules } from "@/utils/helpers";
export default {
  emits: ["onConfirm", "update:model"],
  props: {
    /**
     * Indicates whether the customer dialog is currently open or not.
     * @type {boolean}
     * @default false
     */
    model: {
      type: Boolean,
      default: false,
    },
    /**
     * Specifies the mode of the customer dialog, either "create" or "update".
     * @type {String}
     * @param {String} "create" - The dialog is used to create a new customer.
     * @param {String} "update" - The dialog is used to update an existing customer.
     * @default "create"
     */
    mode: {
      type: String,
      default: "create", // create || update
    },
    /**
     * Represents the default object structure for a customer item.
     * @type {Object}
     * @property {string} customer_id - The unique identifier for the customer.
     * @property {string} first_name - The first name of the customer.
     * @property {string} last_name - The last name of the customer.
     * @property {string} email - The email address of the customer.
     * @property {string} phone_number - The phone number of the customer.
     * @property {string} address - The address of the customer.
     * @property {string} username - The username of the customer.
     * @property {string} password - The password of the customer.
     * @property {string} created - The date and time the customer was created.
     * @property {string} updated - The date and time the customer was last updated.
     */
    item: {
      type: Object,
      default: () => ({
        item: {
          customer_id: "",
          first_name: "",
          last_name: "",
          email: "",
          phone_number: "",
          address: "",
          username: "",
          password: "",
          created: "",
          updated: "",
        },
      }),
    },
  },
  components: {
    // SnackBar,
  },
  data: () => ({
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
      showPassword: false,
      confirmPassword: "",
    },

    // rules: {
    //   required: (value) => !!value || "Field is required!",
    //   number: (value) => {
    //     return !isNaN(value) || "Field must be a number!";
    //   },
    //   image: (value) => {
    //     if (!value) {
    //       // If no file is selected, return true (valid)
    //       return true;
    //     }

    //     // Check if the file has a valid type property
    //     if (!value[0] || typeof value[0].type !== "string") {
    //       return "File type is invalid!";
    //     }

    //     // Check if the file type is image/png or image/jpeg
    //     if (
    //       !(value[0].type === "image/png" || value[0].type === "image/jpeg")
    //     ) {
    //       return "File must be an image (PNG or JPEG)!";
    //     }

    //     // Check if the file size is less than 2MB
    //     if (value[0].size > 2000000) {
    //       return "File size must be at most 2MB!";
    //     }

    //     // If all checks pass, return true (valid)
    //     return true;
    //   },
    //   email: (value) => {
    //     // Check if the email is valid
    //     if (!value || value === undefined) return "Email is required!";
    //     if (
    //       !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    //         value
    //       )
    //     ) {
    //       return "Email is invalid!";
    //     }
    //     return true;
    //   },

    //   password: (value) => {
    //     // Check if the password is valid
    //     if (!value || value === undefined) return "Password is required!";
    //     if (value.length < 8) {
    //       return "Password must be at least 8 characters!";
    //     }
    //     return true;
    //   },

    //   confirmPassword: (value) => {
    //     console.log("confirmPassword", value);
    //     // Check if the confirm password is valid
    //     const password = this.localItem?.password;

    //     if (!value || value === undefined) {
    //       return "Confirm Password is required!";
    //     }
    //     if (value !== password) {
    //       return "Passwords do not match!";
    //     }
    //     return true;
    //   },
    // },

    rules: rules,

    localItem: {
      password: "",
    },
  }),

  methods: {
    emitSavebtn() {
      console.log("emitSavebtn", this.localItem);
      this.confirmation.save.model = false;
      this.$emit("onConfirm", this.localItem, this.mode);
      this.$emit("update:model", false);
      this.localItem = {};
    },
  },

  created() {
    // Make a shallow copy of the item props and assign it to localItem so we don't modify the original item.
    this.localItem = Object.assign({}, this.item);
  },
};
</script>
