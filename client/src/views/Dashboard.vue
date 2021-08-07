<template>
  <div>
    <Navbar />
    <Content />
  </div>
</template>

<script>
import Content from "@/components/Content.vue"
import Navbar from "@/components/Navbar.vue"

export default {
    name: "Home",
    components: {
        Content,
        Navbar
    }
}
</script>

<style>

</style>
