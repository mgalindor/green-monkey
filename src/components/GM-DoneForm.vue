<template>
  <v-dialog v-model="dialog" persistent max-width="500">
    <v-card outlined>
      <v-card-title>Mark last time you did "{{ tittle }}"</v-card-title>
      <v-card-text>
        <v-form ref="form" @submit.prevent>
          <v-row>
            <v-col cols="12" md="6">
              <v-menu
                ref="doneMenu"
                v-model="control.doneDatePicker"
                :close-on-content-click="false"
                :return-value.sync="form.done"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="form.done"
                    label="Done*"
                    prepend-icon="mdi-calendar"
                    :rules="[rules.required]"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="form.done"
                  no-title
                  scrollable
                  :max="getToday"
                >
                  <v-spacer></v-spacer>
                  <v-btn
                    text
                    color="warn"
                    @click="control.doneDatePicker = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="success"
                    @click="$refs.doneMenu.save(form.done)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" md="6">
              <v-menu
                ref="nextMenu"
                v-model="control.nextDatePicker"
                :close-on-content-click="false"
                :return-value.sync="form.next"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="form.next"
                    label="Next Do Date*"
                    prepend-icon="mdi-calendar"
                    :rules="[rules.required]"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="form.next"
                  no-title
                  scrollable
                  :min="getTomorrow"
                >
                  <v-spacer></v-spacer>
                  <v-btn
                    text
                    color="warn"
                    @click="control.nextDatePicker = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="success"
                    @click="$refs.nextMenu.save(form.next)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="form.note"
                label="Note"
                :rules="[rules.size(50)]"
                :counter="50"
              ></v-text-field> </v-col
          ></v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="warn" @click="cancel"> Close </v-btn>
        <v-btn text color="success" @click="save"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "GM-DoneForm",
  props: {
    id: {
      type: String,
      required: true,
    },
    tittle: {
      type: String,
      required: true,
    },
    dialog: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      control: {
        doneDatePicker: false,
        nextDatePicker: false,
      },
      form: {
        done: "",
        next: "",
        note: "",
      },
      rules: {
        required: (v) => !!v || "Required field",
        size(maxSize) {
          return (value) =>
            !value || value.length <= maxSize || "Max size is " + maxSize;
        },
      },
    };
  },
  methods: {
    cancel() {
      this.$refs.form.reset();
      this.$emit("close");
    },
    save() {
      if (this.$refs.form.validate()) {
        const doDate = Object.assign({ taskId: this.id }, this.form);
        this.$refs.form.reset();
        this.$emit("save", doDate);
      }
    },
  },
  computed: {
    ...mapGetters(["getToday", "getTomorrow"]),
  },
};
</script>