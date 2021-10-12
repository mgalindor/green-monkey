<template>
  <v-container>
    <v-row>
      <v-col md="8">
        <v-select
          v-model="selectedTags"
          :items="availableTags"
          outlined
          clearable
          deletable-chips
          chips
          label="Tags"
          multiple
        ></v-select>
      </v-col>
      <v-col md="4" align="end">
        <v-btn color="success" class="white--text" x-large @click="add"
          >Agregar
          <v-icon right>mdi-plus</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row align="start">
      <v-col
        lg="4"
        md="6"
        sm="6"
        xs="12"
        v-for="item in filteredTasks"
        :key="item.id"
      >
        <Task
          :tittle="item.tittle"
          :doDate="item.doDate"
          :note="item.note"
          :tags="item.tags"
          :daysToWarn="item.daysToWarn"
          :actions="item.actions"
        ></Task>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Task from "../components/GM-Task";

export default {
  name: "Home",

  components: {
    Task,
  },
  data: () => ({
    availableTags: ["casa", "mascota", "mantenimiento", "cars"],
    selectedTags: [],
    tasks: [
      {
        id: "1234564654654645",
        tittle: "Bañar al Perro",
        doDate: new Date("2021-10-08T12:48:41Z"),
        note: "Contacto Puppy Wash 999-555-36",
        tags: ["casa", "mascota"],
        daysToWarn: 5,
        actions: [
          {
            message: `Sure, I'll see you later.`,
            done: new Date("2021-10-08T12:48:41Z"),
            color: "deep-purple lighten-1",
          },
          {
            message: "Yeah, sure. Does 1:00pm work?",
            done: new Date("2021-05-12T16:48:41Z"),
            color: "green",
          },
          {
            message: "Did you still want to grab lunch today?",
            done: new Date("2021-02-21T10:48:41Z"),
            color: "deep-purple lighten-1",
          },
        ],
      },
      {
        id: "1234564afsd645",
        tittle: "Lavar el auto",
        doDate: new Date("2021-10-13T12:48:41Z"),
        note: "Contacto Puppy Wash 999-555-36",
        tags: ["casa", "cars"],
        daysToWarn: 5,
      },
      {
        id: "123456fsdafa",
        tittle: "Poner Gas",
        doDate: new Date("2022-10-08T12:48:41Z"),
        note: "Contacto Puppy Wash 999-555-36",
        tags: ["casa", "mantenimiento"],
        daysToWarn: 5,
        actions: [
          {
            message: `Sure, I'll see you later.`,
            done: new Date("2021-10-08T12:48:41Z"),
            color: "deep-purple lighten-1",
          },
          {
            message: "Yeah, sure. Does 1:00pm work?",
            done: new Date("2021-05-12T16:48:41Z"),
            color: "green",
          },
        ],
      },
      {
        id: "s4658asd",
        tittle: "Impermeavilizar",
        doDate: new Date("2022-07-15T12:00:41Z"),
        note: "Contacto Puppy Wash 999-555-36",
        tags: ["casa", "mantenimiento", "cars"],
        daysToWarn: 5,
        actions: [
          {
            message: `Sure, I'll see you later.`,
            done: new Date("2021-10-08T12:48:41Z"),
            color: "deep-purple lighten-1",
          },
          {
            message: "Yeah, sure. Does 1:00pm work?",
            done: new Date("2021-05-12T16:48:41Z"),
            color: "green",
          },
        ],
      },
    ],
  }),
  computed: {
    filteredTasks() {
      let selected = this.selectedTags;
      if (selected.length == 0) {
        return this.tasks;
      } else {
        return this.tasks.filter((task) =>
          task.tags.some((tags) => selected.includes(tags))
        );
      }
    },
  },
  methods: {
    add() {
      this.tasks.push({
        id: "1234564afsd645",
        tittle: "Lavar el auto",
        doDate: new Date("2021-10-13T12:48:41Z"),
        note: "Contacto Puppy Wash 999-555-36",
        tags: ["casa"],
        daysToWarn: 5,
      });
    },
  },
};
</script>
