<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col">
          <button
            v-if="HR"
            class="btn btn-success my-2 mx-2"
            @click.prevent="addEvent()"
          >
            Add Event
          </button>
          <button
              v-if="!HR" 
              class="btn btn-success my-2 mx-2"
              type="button"
              @click.prevent="getConfirmEventVendor()"
          > My Confirmation
          </button>
          <button
              v-if="HR" 
              class="btn btn-success my-2 mx-2"
              type="button"
              @click.prevent="getConfirmEventHR()"
          > Confirmed Vendor
          </button>
          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <th scope="col-1">No</th>
                <th scope="col">Name</th>
                <th scope="col">Propose Date 1</th>
                <th scope="col">Propose Date 2</th>
                <th scope="col">Propose Date 3</th>
                <th scope="col">Location</th>
                <th scope="col">Status</th>
                <th scope="col">Date Created</th>
                <th scope="col-1">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(event, i) in events" :key="i">
                <td>{{ i + 1 }}</td>
                <td>{{ event.name }}</td>
                <td>{{ formatDate(event.date1) }}</td>
                <td>{{ formatDate(event.date2) }}</td>
                <td>{{ formatDate(event.date3) }}</td>
                <td>{{ event.location }}</td>
                <td>{{ event.eventStatus }}</td>
                <td>{{ formatDate(event.createdAt) }}</td>
                <td>
                  <button 
                      v-if="HR"
                      class="btn btn-success"
                      type="button"
                      @click.prevent="getEventByIdHR(event.id)"
                  > View
                  </button>
                  <button
                      v-if="!HR" 
                      class="btn btn-success"
                      type="button"
                      @click.prevent="getEventByIdVendor(event.id)"
                  > View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Content",
  data() {
    return {
      HR: false,
    };
  },
  methods: {
    addEvent() {
      this.$router.push({path: '/events/add'}) 
    },
    checkAdmin() {
      let data = localStorage.getItem("roles");
      if (data === "hr") {
        this.HR = true;
      }
    },
    getConfirmEventHR() {
      this.$store.dispatch("getConfirmEventHR", {
        router: this.$router
      });
    },
    getConfirmEventVendor() {
      this.$store.dispatch("getConfirmEventVendor", {
        router: this.$router
      });
    },
    getEventByIdHR(id) {
      this.$store.dispatch("getEventByIdHR", {
        id: id,
        router: this.$router,
      });
    },
    getEventByIdVendor(id) {
      this.$store.dispatch("getEventByIdVendor", {
        id: id,
        router: this.$router,
      });
    },
    formatDate(date) {
      let result = new Date(date).toDateString();
      // console.log(result)
      return result;
    },
    getEvents() {
      this.$store.dispatch("getEvents");
    },
  },
  mounted() {
    this.checkAdmin();
    this.getEvents();
  },
  computed: {
    events() {
      return this.$store.state.events;
    },
  },
};
</script>

<style>
</style>