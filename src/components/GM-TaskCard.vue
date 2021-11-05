<template>
  <v-card outlined>
    <v-app-bar flat color="white" dense class="mt-3">
      <v-toolbar-title>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-chip color="error mr-2" outlined v-if="isDelayed">
              <v-icon>mdi-alert-octagram-outline</v-icon>
            </v-chip>
            <v-chip color="warning mr-2" outlined v-if="isWarn">
              <v-icon>mdi-car-brake-alert</v-icon>
            </v-chip>
            <span v-bind="attrs" v-on="on">{{ tittle }}</span>
          </template>
          <span> {{ tittle }}</span>
        </v-tooltip>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="$emit('markAsDone', id)">
            <v-list-item-title>
              <v-icon left>mdi-check</v-icon>
              Done
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click="$emit('edit', id)">
            <v-list-item-title>
              <v-icon left>mdi-pencil-outline</v-icon>
              Edit
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click="$emit('delete', id)">
            <v-list-item-title>
              <v-icon left>mdi-delete-outline</v-icon>
              Delete
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-card-subtitle v-if="this.doDate !== ''">
      <div class="text-subtitle-1">
        Next:
        {{
          doDateDate.toLocaleDateString(getLocale, {
            dateStyle: "full",
            timeZone: "UTC",
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
    <v-divider v-if="actions.length != 0"></v-divider>
    <v-card-actions v-if="actions.length != 0">
      <v-btn text block @click="control.showDetail = !control.showDetail">
        History
        <v-spacer></v-spacer>
        <v-icon>{{
          control.showDetail ? "mdi-chevron-up" : "mdi-chevron-down"
        }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="control.showDetail">
        <v-card-text>
          <v-timeline align-top dense>
            <v-timeline-item
              v-for="action in actions"
              :key="action.done"
              :color="action.color"
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
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "GM-TaskCard",
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
