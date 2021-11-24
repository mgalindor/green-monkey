<template>
  <v-dialog v-model="dialog" max-width="500"  @click:outside="close">
    <v-card outlined>
      <v-card-title>History</v-card-title>
      <v-card-text>
        <v-timeline align-top dense>
          <v-timeline-item
            v-for="(action, index) in sortedActions"
            :key="index"
            :color="index % 2 == 0 ? 'lime darken-2' : 'amber darken-1'"
            small
          >
            <div>
              <div class="font-weight-normal">
                {{ action.done }}
              </div>
              <div>{{ action.message }}</div>
            </div>
          </v-timeline-item>
        </v-timeline>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="warn" text @click="close">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "GM-TaskHistory",
  props: {
    id: {
      type: String,
      required: true,
    },
    dialog: {
      type: Boolean,
      required: true,
    },
    actions: {
      type: Array,
      default: () => [],
    },
  },
  methods:{
    close() {
      this.$emit("close");
    }
  },
  computed: {
    sortedActions() {
      let sorted = [];
      this.actions.forEach((a) => {
        sorted.push({
          message: a.message,
          done: new Date(a.done),
        });
      });
      return sorted;
    },
  },
};
</script>