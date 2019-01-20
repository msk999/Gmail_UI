<template>
  <div class="home">
    <HelloWorld msg="Matthew Mail"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  },
  created() {
    this.$store.dispatch("messages/retrieve");
  }
};
</script>
