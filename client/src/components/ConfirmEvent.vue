<template>
<div>
    <Navbar />
    <div class="container">
    <table class="table table-bordered table-hover">
      <thead>
        <tr>
          <th scope="col-1">No</th>
          <th scope="col-3">Event</th>
          <th scope="col">Vendor</th>
          <th scope="col" colspan="2">Confirmation</th>
          <th scope="col">Confirm Date</th>
          <th scope="col">Date Created</th>
          <th v-if="!HR" scope="col-1">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(list, i) in confirmEvent" :key="i">
          <td>{{ i+1 }}</td>
          <td>{{ list.Event.name }}</td>
          <td>{{ list.User.username }}</td>
          <td scope="col" colspan="2">
              {{list.confirmStatus}},
              {{list.remark}}
          </td>
          <td>{{formatDate(list.confirmDate)}}</td>
          <td>{{formatDate(list.updatedAt)}}</td>
          <td>
          <button
          v-if="!HR"
            class="btn btn-danger mr-2 ml-2"
            @click.prevent="deleteConfirmEvent(list.id)"
          >
            Delete
          </button>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
  </div>
  
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name: "ConfirmEvent",
  components: {
    Navbar,
  },
  data() {
    return {
      HR: false
    }
  },
  methods: {
    checkAdmin () {
        let data = localStorage.getItem('roles')
        if (data === 'hr') {
            this.HR = true
    }
    },
    deleteConfirmEvent(id) {
      this.$store.dispatch("deleteConfirmEvent", {
        id: id,
        router: this.$router
      });
    },
    formatDate(date) {
        // console.log(date)
      let result = new Date(date).toDateString();
      // console.log(result)
      if (date !== '') {
        return result;
      } else {
        return "Reject"  
      }
    },
    listConfirmEvent() {
        if (this.HR) {
            this.$store.dispatch("getConfirmEventHR", {
                router: this.$router
            });
        } else {
            this.$store.dispatch("getConfirmEventVendor", {
                router: this.$router
            });
        }
    },
  },
  mounted() {
    this.checkAdmin()
    this.listConfirmEvent();
  },
  computed: {
    confirmEvent() {
      return this.$store.state.confirmEvent;
    }
  },
};
</script>

<style>
/* .table {
  color: aliceblue;
} */
</style>
