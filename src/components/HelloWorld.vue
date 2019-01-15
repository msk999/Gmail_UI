<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h3>Essential Links</h3>
    <table>
      <tr v-for="item in messages" :key="item.id">
        <td>{{item.from | truncate }}</td>
        <!-- <td>{{item.from}}</td> -->
        <td>{{ item.subject }}</td>
        <td>{{item.date}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  computed: {
    ...mapGetters("messages", [
      "messages",
      "messageRetrievingError",
      "messageRetrievingErrorCode"
    ])
  },
  filters: {
    truncate: function(value) {
      if (!value) return "";
      // strip out any quotes
      value = value.toString().replace(/["']/g, "");
      // check for embedded email address.  We just want the nice name
      var indexChar = value.indexOf("<");
      if (indexChar < 0) return value;
      return value.substring(0, indexChar).trim();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  text-align: left;
  /* margin: 0 10px; */
}
a {
  color: #42b983;
}

table {
  border-collapse: collapse;
  font-family: "Roboto,RobotoDraft,sans-serif,Helvetica,Arial";
  width: 100%;
}

th,
td {
  text-align: left;
  padding: 8px;
  font-size: 0.875rem;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}
</style>
