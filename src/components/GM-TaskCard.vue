<template>
  <v-card outlined>
    <v-container>
      <v-row class="mt-1 mr-1" justify="end">
        <v-chip color="warning mr-2" outlined v-if="isWarn">
          <v-icon>mdi-car-brake-alert</v-icon>
        </v-chip>
        <v-chip color="error mr-2" outlined v-if="isDelayed">
          <v-icon>mdi-alert-octagram-outline</v-icon>
        </v-chip>
      </v-row>
    </v-container>
    <v-card-title class="text-h5"> {{ tittle }}</v-card-title>
    <v-card-subtitle v-if="this.doDate !== ''">
      <div class="text-subtitle-1">
        Next:
        {{
          doDateDate.toLocaleString(getLocale, {
            dateStyle: "full",
            timeStyle: "short",
          })
        }}
      </div>
    </v-card-subtitle>
    <v-card-text>
      <v-container>
        <v-row justify="end">
          <v-chip
            color="primary mr-2"
            outlined
            small
            v-for="item in tags"
            :key="item"
          >
            {{ item }}
          </v-chip>
        </v-row>
        <v-row>
          <div class="text-subtitle-2">Note:</div>
        </v-row>
      </v-container>
      <p>{{ note }}</p>
    </v-card-text>
    <v-card-actions class="my-3">
      <v-row justify="center">
        <v-btn text class="mr-2" @click="$emit('markAsDone', id)">
          <v-icon left>mdi-check</v-icon>
          Done
        </v-btn>
        <v-btn text class="mr-2" @click="$emit('edit', id)">
          <v-icon left>mdi-pencil-outline</v-icon>
          Edit
        </v-btn>
        <v-btn text class="mr-2" @click="$emit('delete', id)">
          <v-icon left>mdi-delete-outline</v-icon>
          Delete
        </v-btn>
      </v-row>
    </v-card-actions>
    <v-divider v-if="actions.length != 0"></v-divider>
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
  name: "GM-TaskCard",
  components: {
    TimeLine,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    tittle: {
      type: String,
      required: true,
    },
    doDate: String,
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
    doDateDate() {
      return new Date(this.doDate);
    },
    isWarn() {
      var now = new Date();
      var beforeScheduled = new Date(this.doDateDate);
      beforeScheduled.setDate(beforeScheduled.getDate() - this.daysToWarn);
      return beforeScheduled < now && now < this.doDateDate;
    },
    isDelayed() {
      return new Date() > this.doDateDate;
    },
    ...mapGetters(["getLocale"]),
  },
};
</script>
