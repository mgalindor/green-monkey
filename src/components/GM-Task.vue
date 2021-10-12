<template>
  <v-card>
    <v-card-title class="text-h5"> {{ tittle }}</v-card-title>
    <v-card-subtitle>
      <v-container>
        <v-row>
          <div class="text-subtitle-1">
            Next:
            {{
              doDate.toLocaleString(getLocale, {
                dateStyle: "full",
                timeStyle: "short",
              })
            }}
          </div>
          <v-spacer></v-spacer>
          <v-chip color="warning mr-2" outlined v-if="isWarn">
            <v-icon>mdi-car-brake-alert</v-icon>
          </v-chip>
          <v-chip color="error mr-2" outlined v-if="isDelayed">
            <v-icon>mdi-alert-octagram-outline</v-icon>
          </v-chip>
        </v-row>
      </v-container>
    </v-card-subtitle>
    <v-card-text>
      <v-container>
        <v-row justify="end">
          <v-chip color="primary mr-2" outlined  small v-for="item in tags" :key="item">
            {{ item }}
          </v-chip>
        </v-row>
        <v-row>
          <div class="text-subtitle-2">Note:</div>
        </v-row>
      </v-container>
      <p>{{ note }}</p>
    </v-card-text>
    <v-card-actions>
      <v-chip class="mr-2" @click="alarm">
        <v-icon left> mdi-alarm </v-icon>
        Schedule Next
      </v-chip>
      <v-chip class="mr-2" @click="lights">
        <v-icon left>mdi-check</v-icon>
        Done
      </v-chip>
    </v-card-actions>
    <v-divider class="my-2"></v-divider>
    <v-card-actions v-if="actions.length != 0">
      <v-btn text block @click="control.showDetail = !control.showDetail">
        Details
        <v-spacer></v-spacer>
        <v-icon>{{
          control.showDetail ? "mdi-chevron-up" : "mdi-chevron-down"
        }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="control.showDetail">
        <v-card-text>
          <TimeLine :actions="actions"></TimeLine>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import TimeLine from "./GM-TimeLine.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    TimeLine,
  },
  props: {
    tittle: {
      type: String,
      required: true,
    },
    doDate: {
      type: Date,
      required: true,
    },
    note: String,
    tags: Array,
    daysToWarn: {
      type: Number,
      required: true,
    },
    actions: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    control: {
      showDetail: false,
    },
  }),
  computed: {
    isWarn() {
      var now = new Date();
      var beforeScheduled = new Date(this.doDate);
      beforeScheduled.setDate(beforeScheduled.getDate() - this.daysToWarn);
      return beforeScheduled < now && now< this.doDate;
    },
    isDelayed() {
      return new Date() > this.doDate;
    },
    ...mapGetters(["getLocale"]),
  },
  methods: {
    alarm() {
      alert("Turning on alarm...");
    },
    lights() {
      alert("Toggling lights...");
    },
  },
};
</script>
