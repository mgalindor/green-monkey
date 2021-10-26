<template>
  <v-card outlined>
    <v-card-title> Your task </v-card-title>
    <v-card-text>
      <v-form ref="form" @submit.prevent>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="task.tittle"
              label="Name *"
              required
              :rules="[rules.required, rules.size(20)]"
              :counter="20"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-menu
              ref="menu"
              v-model="control.showDatePiker"
              :close-on-content-click="false"
              :return-value.sync="task.doDate"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="task.doDate"
                  label="Next Do Date*"
                  prepend-icon="mdi-calendar"
                  :rules="[rules.required]"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="task.doDate"
                no-title
                scrollable
                :min="today"
              >
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="primary"
                  @click="control.showDatePiker = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="secondary"
                  @click="$refs.menu.save(task.doDate)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-textarea
              v-model="task.note"
              label="Note"
              rows="2"
              :rules="[rules.size(200)]"
              :counter="200"
            ></v-textarea>
          </v-col>
          <v-col cols="12">
            <v-combobox
              :items="existingTags"
              multiple
              v-model="task.tags"
              label="Tags"
              append-icon
              hide-selected
              chips
              deletable-chips
              hint="Maximum of 3 tags"
              :rules="[rules.size(3)]"
              prepend-icon="mdi-tag-outline"
            >
            </v-combobox>
          </v-col>
          <v-col cols="12">
            <v-select
              v-model="task.daysToWarn"
              :items="[1, 2, 3, 4, 5, 6, 7, 8, 9]"
              label="Days before to warn*"
              :rules="[rules.required]"
              required
            ></v-select>
          </v-col>
        </v-row>
        <small class="red--text">* indicates required field</small>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text color="success" @click="save"> Save </v-btn>
      <v-btn text color="warn" @click="cancel"> Close </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "GM-TaskForm",
  props: {
    task: Object,
    existingTags: Array,
  },
  data() {
    return {
      rules: {
        required: (v) => !!v || "Required field",
        size(maxSize) {
          return (value) =>
            !value || value.length <= maxSize || "Max size is " + maxSize;
        },
      },
      control: {
        showDatePiker: false,
      },
    };
  },
  computed: {
    today() {
      return new Date().toISOString().slice(0, 10);
    },
  },
  methods: {
    cancel() {
      this.$refs.form.reset();
      this.$emit("close");
    },
    save() {
      if (this.$refs.form.validate()) {
        const newTask = Object.assign({}, this.task);
        this.$refs.form.reset();
        this.$emit("save", newTask);
      }
    },
  },
};
</script>
