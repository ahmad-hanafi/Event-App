<template>
<nav class="navbar sticky-top navbar-expand-lg navbar-light bg-light">
  <router-link class="navbar-brand" to="/">Dashboard</router-link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarText">
    <!-- <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <router-link class="mr-2" to="/">Home</router-link> 
      </li>
    </ul> -->
    <!-- <div v-if="HR">
    <router-link class="mr-2 btn btn-success" to="/events/add">Add Event</router-link>
    </div> -->
    <ul class="navbar-nav">
    <li class="nav-item active" >
    <router-link class="btn btn-success" to="/login" v-if="!login"
          >Login</router-link
        >
    </li>
    <li class="nav-item active">

    <button class="btn btn-danger" @click.prevent="logout" v-if="login">
          Logout
        </button>
    </li>
    </ul>
  </div>
</nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      login: false,
      HR: false
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("access_token");
      localStorage.removeItem("roles");
      this.$router.push("/login");
    },
    checkLogin () {
        if (localStorage.getItem('access_token')) {
            this.login = true
        }
    },
    checkHR () {
        let data = localStorage.getItem('roles')
        if (data === 'hr') {
            this.HR = true
        }
    }
  },
  mounted() {
    this.checkLogin();
    this.checkHR();
  },
};
</script>

<style>
</style>