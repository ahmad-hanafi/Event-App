<template>
  <div>
    <Navbar />
    <div class="container mt-3">
      <form>
        <label for="name">Name of Event :</label><br />
        <div>
          <input
            type="text"
            class="form-control col-6"
            placeholder="Type name, example : Go to beach"
            required
            v-model="name"
          /><br />
        </div>

        <label for="date">Proposed Date 1 (yyyy-mm-dd) :</label><br />
        <div>
          <textarea
            class="form-control col-6"
            type="date"
            required
            v-model="date1"
            placeholder="Type date with format yyyy-mm-dd, example : 2021-09-23"
          /><br />
        </div>

        <label for="date">Proposed Date 2 (yyyy-mm-dd) :</label><br />
        <div>
          <textarea
            class="form-control col-6"
            type="date"
            required
            v-model="date2"
            placeholder="Type date with format yyyy-mm-dd, example : 2021-09-23"
          /><br />
        </div>

        <label for="date">Proposed Date 3 (yyyy-mm-dd) :</label><br />
        <div>
          <textarea
            class="form-control col-6"
            type="date"
            required
            v-model="date3"
            placeholder="Type date with format yyyy-mm-dd, example : 2021-09-23"
          /><br />
        </div>

        <label for="location">Location of Event</label><br />
        <div>
          <textarea
            class="form-control col-6"
            type="text"
            required
            v-model="location"
            placeholder="Type City. Example : Kuala Lumpur"
          /><br />
        </div>

        <hr />
        <button
          type="button"
          class="btn btn-primary btn-block form-control col-6"
          @click.prevent="addEvent()"
        >
          Create Event
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
export default {
  name: "AddPhoto",
  components: {
    Navbar,
  },
  data() {
    return {
      name: "",
      date1: "",
      date2: "",
      date3: "",
      location: "",
    };
  },
  methods: {
    addEvent() {
      this.$store.dispatch('addEvent', {
        name: this.name,
        date1: this.date1,
        date2: this.date2,
        date3: this.date3,
        location: this.location,
        router: this.$router,
      });
    }
  }
};
</script>

<style>
</style>