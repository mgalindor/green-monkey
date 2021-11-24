<template>
  <v-container>
    <v-row>
      <v-col md="8">
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
      </v-col>
      <v-col md="4" align="end">
        <v-btn large color="success" outlined @click="taskFormActions().open()">
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
          @markAsDone="doneDialogActions().open(item)"
          @edit="taskFormActions().edit(item)"
          @history="historyDialogActions().open(item)"
          @delete="deleteDialogActions().open(item)"
        ></TaskCard>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col>
        <TaskForm
          :dialog="control.formDialog"
          :task="taskForm"
          :existingTags="availableTags"
          @close="taskFormActions().close()"
          @save="taskFormActions().save($event)"
        ></TaskForm>

        <DoneForm
          :dialog="control.doneFormDialog"
          :id="doneTask.id"
          :tittle="doneTask.tittle"
          @close="doneDialogActions().close()"
          @save="doneDialogActions().save($event)"
        ></DoneForm>

        <Confirmation
          action="delete"
          :dialog="control.deleteTaskDialog"
          :reference="deleteTask.tittle"
          :id="deleteTask.id"
          @confirm="deleteDialogActions().confirm($event)"
          @close="deleteDialogActions().close()"
        ></Confirmation>

        <TaskHistory
          :dialog="control.historyDialog"
          :id="taskForm.id"
          :actions="taskForm.actions"
          @close="historyDialogActions().close()"
        >
        </TaskHistory>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TaskCard from "../components/GM-TaskCard";
import TaskHistory from "../components/GM-TaskHistory.vue";
import TaskForm from "../components/GM-TaskForm";
import DoneForm from "../components/GM-DoneForm";
import Confirmation from "../components/GM-Confirmation";
import json from "../data/tasks.json";

export default {
  name: "Home",
  components: {
    TaskCard,
    TaskHistory,
    TaskForm,
    DoneForm,
    Confirmation,
  },
  data: () => ({
    selectedTags: [],
    control: {
      formDialog: false,
      doneFormDialog: false,
      deleteTaskDialog: false,
      historyDialog: false,
    },
    deleteTask: {
      tittle: "",
      id: "",
    },
    doneTask: {
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
      actions: [],
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
    doneDialogActions() {
      let self = this;
      return {
        open(item) {
          self.doneTask.id = item.id;
          self.doneTask.tittle = item.tittle;
          self.control.doneFormDialog = true;
        },
        close() {
          self.doneTask.id = "";
          self.doneTask.tittle = "";
          self.control.doneFormDialog = false;
        },
        save(item) {
          self.tasks[item.taskId].doDate = item.next;

          if (self.tasks[item.taskId].actions === undefined) {
            self.tasks[item.taskId].actions = [];
          }

          self.tasks[item.taskId].actions.push({
            done: item.done,
            message: item.note,
          });

          self.doneDialogActions().close();
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
          delete self.tasks[receivedId];
          self.deleteDialogActions().close();
        },
      };
    },
    historyDialogActions() {
      let self = this;
      return {
        open(item) {
          self.taskForm = Object.assign({}, item);
          self.control.historyDialog = true;
        },
        close() {
          self.control.historyDialog = false;
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
