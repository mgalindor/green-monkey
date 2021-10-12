<template>
  <v-timeline align-top dense>
    <v-timeline-item
      v-for="action in actions"
      :key="action.done.toString()"
      :color="action.color"
      small
    >
      <div>
        <div class="font-weight-normal">
          {{ action.done.toLocaleString() }}
        </div>
        <div>{{ action.message }}</div>
      </div>
    </v-timeline-item>
  </v-timeline>
</template>

<script>
export default {
  props: {
    actions: {
      type: Array,
      default: () => []
    },
  }
};
</script>