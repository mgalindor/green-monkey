<template>
  <v-container>
    <v-row>
      <v-col md="8">
        <v-form>
          <v-select
            v-model="selectedTags"
            :items="availableTags"
            hide-selected
            chips
            deletable-chips
            multiple
            label="Tags"
            prepend-icon="mdi-tag-outline"
          ></v-select>
        </v-form>
      </v-col>
      <v-col md="4" align="end">
        <v-btn
          large
          color="success"
          class="white--text"
          @click="taskFormActions().open()"
        >
          Add
          <v-icon right>mdi-plus</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row align="start">
      <v-col
        lg="4"
        sm="6"
        cols="12"
        v-for="(item, key) in filteredTasks"
        :key="key"
      >
        <TaskCard
          :id="item.id"
          :tittle="item.tittle"
          :doDate="item.doDate"
          :note="item.note"
          :tags="item.tags"
          :daysToWarn="item.daysToWarn"
          :actions="item.actions"
          @markAsDone="alert('Mark as done:' + $event)"
          @edit="taskFormActions().edit(item)"
          @delete="deleteDialogActions().open(item)"
        ></TaskCard>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col>
        <v-dialog v-model="control.formDialog" persistent width="500">
          <TaskForm
            :task="taskForm"
            :existingTags="availableTags"
            @close="taskFormActions().close()"
            @save="taskFormActions().save($event)"
          ></TaskForm>
        </v-dialog>

        <Confirmation
          action="delete"
          :dialog="control.deleteTaskDialog"
          :reference="deleteTask.tittle"
          :id="deleteTask.id"
          @confirm="deleteDialogActions().confirm($event)"
          @close="deleteDialogActions().close()"
        ></Confirmation>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TaskCard from "../components/GM-TaskCard";
import TaskForm from "../components/GM-TaskForm";
import Confirmation from "../components/GM-Confirmation";
import json from "../data/tasks.json";

export default {
  name: "Home",
  components: {
    TaskCard,
    TaskForm,
    Confirmation,
  },
  data: () => ({
    selectedTags: [],
    control: {
      formDialog: false,
      deleteTaskDialog: false,
    },
    deleteTask: {
      tittle: "",
      id: "",
    },
    taskForm: {
      id: "",
      tittle: "",
      doDate: null,
      note: "",
      tags: [],
      daysToWarn: 0,
    },
    tasks: {},
  }),
  computed: {
    availableTags() {
      let tags = [];

      Object.keys(this.tasks).forEach((key) => {
        this.tasks[key].tags.forEach((t) => {
          if (!tags.includes(t)) {
            tags.push(t);
          }
        });
      });
      return tags;
    },
    filteredTasks() {
      let selected = this.selectedTags;
      if (selected.length == 0) {
        return this.tasks;
      } else {
        let toReturn = {};

        Object.entries(this.tasks)
          .filter(([key]) =>
            this.tasks[key].tags.some((tags) => selected.includes(tags))
          )
          .forEach(([k, t]) => (toReturn[k] = t));

        return toReturn;
      }
    },
  },
  methods: {
    taskFormActions() {
      let self = this;
      return {
        open() {
          self.control.formDialog = true;
        },
        close() {
          self.control.formDialog = false;
        },
        edit(item) {
          self.taskForm = Object.assign({}, item);
          self.taskFormActions().open();
        },
        save(receivedTask) {
          if (receivedTask.id === "") {
            // New Task
            let id = self.$uuid.v4();
            receivedTask["id"] = id;
            self.tasks[id] = receivedTask;
          } else {
            // Update Task
            self.tasks[receivedTask.id] = receivedTask;
          }
          self.taskFormActions().close();
        },
      };
    },
    deleteDialogActions() {
      let self = this;
      return {
        open(item) {
          self.deleteTask.tittle = item.tittle;
          self.deleteTask.id = item.id;
          self.control.deleteTaskDialog = true;
        },
        close() {
          self.control.deleteTaskDialog = false;
        },
        confirm(receivedId) {
          self.deleteDialogActions().close();
          console.log(receivedId);
          alert("To be deleted " + receivedId);
        },
      };
    },
  },
  // LC Hooks
  created() {
    json.tasks.forEach((t) => {
      this.tasks[t.id] = t;
    });
  },
};
</script>
