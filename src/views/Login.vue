<template>
  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-col cols="10" sm="8" md="6">
        <v-card>
          <v-card-title>Log In</v-card-title>
          <v-card-text>
            <v-form ref="form" @submit.prevent>
              <v-text-field
                v-model="form.email"
                label="Email *"
                required
                :rules="[rules.required, rules.maxSize(200), rules.email]"
                counter
              ></v-text-field>
              <v-text-field
                v-model="form.password"
                label="Password *"
                :append-icon="form.showPass ? 'mdi-eye' : 'mdi-eye-off'"
                required
                counter
                :rules="[rules.required, rules.maxSize(20), rules.minSize(8)]"
                :type="form.showPass ? 'text' : 'password'"
                @click:append="form.showPass = !form.showPass"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text outlined color="success" @click="login"> Login </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: "",
        showPass: false,
      },
      rules: {
        required: (v) => !!v || "Required field",
        email: (v) =>
          !v ||
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "Insert a valid email",
        minSize(minSize) {
          return (value) =>
            !value || value.length > minSize || "Min size is " + minSize;
        },
        maxSize(maxSize) {
          return (value) =>
            !value || value.length <= maxSize || "Max size is " + maxSize;
        },
      },
    };
  },
  methods: {
    login() {
      alert("desde el login button");
    },
  },
};
</script>
