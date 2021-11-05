<template>
  <v-dialog v-model="dialog" persistent max-width="500">
    <v-card>
      <v-card-title>
        <p>Are you really sure you want to {{action}} "{{reference}}"?</p>
      </v-card-title>
      <v-card-text>
        Once you confirm the action you won't be able to go back!
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="warn" text @click="close"> Maybe later </v-btn>
        <v-btn color="success" text @click="confirm"> Yes I want </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "GM-Confirmation",
  props: {
    reference: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    dialog: {
      type: Boolean,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
  methods: {
    confirm() {
      this.$emit("confirm", this.id);
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>
